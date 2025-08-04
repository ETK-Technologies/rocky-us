import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import https from "https";
import axios from "axios";
import { uploadToS3 } from "@/utils/s3";

const crmApi = axios.create({
  baseURL: "https://crm.myrocky.com/api",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  timeout: 60000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

async function getEntrykey() {
  try {
    const cookieStore = cookies();
    const existingCookie = cookieStore.get("mh_entrykey");
    return existingCookie?.value || `mhq-${randomBytes(8).toString("hex")}`;
  } catch (error) {
    console.warn("Cookie reading error:", error);
    return `mhq-${randomBytes(8).toString("hex")}`;
  }
}

async function getUserId() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get("userId");
    return userId?.value ? parseInt(userId.value) : 887;
  } catch (error) {
    console.warn("Error getting user ID from cookies:", error);
    return 887;
  }
}

async function getUserDataFromCookies() {
  try {
    const cookieStore = cookies();
    const fName = cookieStore.get("displayName")?.value || "";
    const lName = cookieStore.get("lastName")?.value || "";
    const email = cookieStore.get("userEmail")?.value
      ? decodeURIComponent(cookieStore.get("userEmail").value)
      : "";
    const phone = cookieStore.get("phone")?.value || "";
    const dob = cookieStore.get("DOB")?.value || "";
    const province = cookieStore.get("province")?.value || "";

    return {
      fName,
      lName,
      email,
      phone,
      dob,
      province,
    };
  } catch (error) {
    console.warn("Error getting user data from cookies:", error);
    return {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      dob: "",
      province: "",
    };
  }
}

export async function GET() {
  const entrykey = await getEntrykey();

  const data = { message: "Success", entrykey };

  const response = NextResponse.json(data);
  response.cookies.set("mh_entrykey", entrykey, {
    domain: "myrocky.ca",
    path: "/",
    expires: new Date(Date.now() + 1800 * 1000),
    httpOnly: false,
    sameSite: "Lax",
  });

  return response;
}

export async function POST(req) {
  try {
    const entrykey = await getEntrykey();
    const userId = await getUserId();
    const userData = await getUserDataFromCookies();

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: true, msg: "File uploads should be handled via frontend S3 upload" },
        { status: 400 }
      );
    }

    const rawData = await req.json();

    if (Object.keys(rawData).length === 0) {
      return NextResponse.json(
        { error: true, msg: "Blank Data" },
        { status: 400 }
      );
    }

    const data = {
      form: {},
      entrykey: entrykey,
      timestamp: Math.floor(Date.now() / 1000),
      entry_saved: false,
      form_id: rawData.form_id || 5,
      error: false,
      id: rawData.id || "",
      token: rawData.token || "",
      stage: rawData.stage || "consultation-before-checkout",
      page_step: rawData.page_step || 1,
      completion_state: rawData.completion_state || "Partial",
      completion_percentage: rawData.completion_percentage || 10,
      source_site: rawData.source_site || "https://myrocky.ca",
      wp_user_id: userId,
      created_by: userId,
    };

    if (
      (data.stage === "consultation-before-checkout" ||
        data.stage === "consultation-after-checkout") &&
      !data.id &&
      !data.token
    ) {
      data.id = parseInt(Date.now().toString(16), 16).toString();
    }

    const excludedKeys = [
      "form_id",
      "action",
      "entrykey",
      "id",
      "token",
      "stage",
      "page_step",
      "completion_state",
      "source_site",
      "last-question-index",
      "navigationStack",
      "phq9_score",
      "gad7_score",
    ];

    if (rawData.phq9_score) {
      data.form.phq9_score = rawData.phq9_score;
    }

    if (rawData.gad7_score) {
      data.form.gad7_score = rawData.gad7_score;
    }

    for (const [key, value] of Object.entries(rawData)) {
      if (
        !excludedKeys.includes(key) &&
        value !== undefined &&
        value !== null
      ) {
        data.form[key] = value;
      }
    }

    if (userData.fName) data.form["130_3"] = userData.fName;
    if (userData.lName) data.form["130_6"] = userData.lName;
    if (userData.email) data.form[131] = userData.email;
    if (userData.phone) data.form[132] = userData.phone;
    if (userData.dob) data.form[158] = userData.dob;
    if (userData.province) data.form["161_4"] = userData.province;

    try {
      const crmResult = await postMentalHealthQuestionnaireDataToCRM(data);
      Object.assign(data, crmResult);
    } catch (crmError) {
      console.error("CRM Submission Error:", crmError);
      data.error = true;
      data.error_message = crmError.message || "CRM submission failed";
    }

    const response = NextResponse.json(data);
    response.cookies.set("mh_entrykey", entrykey, {
      domain: "myrocky.ca",
      path: "/",
      expires: new Date(Date.now() + 1800 * 1000),
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: true,
        msg: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function handleFileUpload(req, entrykey) {
  try {
    const formData = await req.formData();
    
    return NextResponse.json(
      {
        error: true,
        msg: "File uploads should now be handled via frontend S3 upload. Please use the uploadFileToS3WithProgress function from frontend-upload.js instead.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      {
        error: true,
        msg: "File upload failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function postMentalHealthQuestionnaireDataToCRM(data) {
  const crmUrlCreate = "/get-wp-gravity-forms-data";
  const crmUrlPartial = "/get-wp-gravity-forms-partial-entry-data";

  let apiEndpoint = crmUrlCreate;
  if (data.id && data.token) {
    apiEndpoint = crmUrlPartial;
  }

  const postData = {
    timestamp: Math.floor(Date.now() / 1000),
    entry_saved: false,
    form_id: data.form_id || 5,
    error: false,
    stage: data.stage || "consultation-before-checkout",
    page_step: parseInt(data.page_step) || 1,
    completion_state: data.completion_state || "Partial",
    completion_percentage: parseInt(data.completion_percentage) || 10,
    source_site: data.source_site || "https://myrocky.ca",
    wp_user_id: data.wp_user_id || (await getUserId()),
    created_by: data.created_by || (await getUserId()),
    entrykey: data.entrykey || "",
  };

  if (data.id) {
    postData.id = data.id;
  }

  if (data.id && data.token) {
    postData.token = data.token;
    postData.sync = "Partial";
  } else {
    postData.sync = "Create";
  }
  if (data.form) {
    for (const [key, value] of Object.entries(data.form)) {
      let transformedKey;
      if (key.includes("_l-") && key.includes("-textarea")) {
        continue;
      }
      else if (key.startsWith("l-") && key.includes("_") && key.includes("-")) {
        transformedKey = key.replace(/_/g, ".");
      } else {
        transformedKey = key.replace(/_/g, ".");
      }

      if (value !== undefined && value !== null && value !== "") {
        postData[transformedKey] = value;
      }
    }
  }

  try {
    console.log("CRM Submission Payload:", JSON.stringify(postData, null, 2));

    const response = await crmApi.post(apiEndpoint, postData, {
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    });

    console.log("CRM Response:", JSON.stringify(response.data, null, 2));

    if (response.data && response.data.success) {
      return {
        crm_db_id: response.data.data?.crm_db_id || null,
        entry_saved: true,
        id: response.data.data?.wp_entry_id || data.id || "",
        token: response.data.data?.token || data.token || "",
        entrykey: data.entrykey,
        crm_post_response_message:
          response.data.message || "Submission successful",
      };
    }

    throw new Error(response.data?.message || "Unknown CRM submission error");
  } catch (error) {
    console.error("CRM API fetch error:", {
      message: error.message,
      name: error.name,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    throw new Error(`CRM Submission Failed: ${error.message}`);
  }
}
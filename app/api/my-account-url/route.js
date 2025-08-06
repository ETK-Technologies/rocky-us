import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    console.log("API: Starting portal URL fetch process");

    // Check if user is logged in
    const cookieStore = cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      console.log("API: User not logged in, no userId found in cookies");
      return NextResponse.json(
        { success: false, error: "User not logged in" },
        { status: 401 }
      );
    }

    console.log("API: User is logged in with ID:", userId);

    // CRM and Portal URLs from environment variables
    const crmHostUrl = process.env.CRM_HOST  + "/api";
    const portalHostUrl = process.env.PORTAL_HOST;
    const apiUsername = process.env.CRM_API_USERNAME;
    const apiPasswordEncoded = process.env.CRM_API_PASSWORD;

    // Debug: Print environment variables (without exposing the full password)
    console.log("API: Environment variables check:", {
      crmHostUrl: crmHostUrl ? "✓ Set" : "✗ Missing",
      portalHostUrl: portalHostUrl ? "✓ Set" : "✗ Missing",
      apiUsername: apiUsername ? "✓ Set" : "✗ Missing",
      apiPasswordEncoded: apiPasswordEncoded ? "✓ Set" : "✗ Missing",
    });

    // If environment variables are not set, return an error
    if (!crmHostUrl || !portalHostUrl || !apiUsername || !apiPasswordEncoded) {
      const missingVars = [];
      if (!crmHostUrl) missingVars.push("CRM_HOST");
      if (!portalHostUrl) missingVars.push("PORTAL_HOST");
      if (!apiUsername) missingVars.push("CRM_API_USERNAME");
      if (!apiPasswordEncoded) missingVars.push("CRM_API_PASSWORD");

      const errorMsg = `Missing required environment variables: ${missingVars.join(
        ", "
      )}`;
      console.error("API:", errorMsg);
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 500 }
      );
    }

    // Decode the base64 encoded password
    let apiPassword;
    try {
      apiPassword = Buffer.from(apiPasswordEncoded, "base64").toString();
      console.log("API: Successfully decoded the base64 password");
    } catch (decodeError) {
      console.error("API: Failed to decode base64 password:", decodeError);
      return NextResponse.json(
        { success: false, error: "Failed to decode API password" },
        { status: 500 }
      );
    }

    // Extract query parameters
    const url = new URL(req.url);
    const redirectPage = url.searchParams.get("redirectPage") || "dashboard";
    console.log("API: Redirect page set to:", redirectPage);

    console.log("API: Attempting CRM authentication");
    console.log(`API: CRM endpoint: ${crmHostUrl}/api/login`);

    // Step 1: Authenticate with CRM API
    let loginResponse;
    try {
      loginResponse = await fetch(`${crmHostUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: apiUsername,
          password: apiPassword,
        }),
      });

      console.log("API: CRM auth response status:", loginResponse.status);

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        console.error("API: CRM authentication failed:", errorText);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to authenticate with CRM: ${loginResponse.status} ${loginResponse.statusText}`,
            details: errorText,
          },
          { status: 500 }
        );
      }
    } catch (fetchError) {
      console.error("API: CRM fetch error:", fetchError.message);
      return NextResponse.json(
        {
          success: false,
          error: `Error connecting to CRM: ${fetchError.message}`,
        },
        { status: 500 }
      );
    }

    let loginData;
    try {
      loginData = await loginResponse.json();
      console.log(
        "API: CRM authentication response received",
        loginData.success ? "successfully" : "with errors"
      );
    } catch (jsonError) {
      console.error("API: Failed to parse CRM response:", jsonError);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to parse CRM response: ${jsonError.message}`,
        },
        { status: 500 }
      );
    }

    if (!loginData.success || !loginData.data?.token) {
      console.error("API: CRM authentication token not found", loginData);
      return NextResponse.json(
        {
          success: false,
          error: "CRM authentication token not found",
          details: loginData,
        },
        { status: 500 }
      );
    }

    const token = loginData.data.token;
    console.log("API: Successfully obtained CRM auth token");

    // Step 2: Get auto-login link for the portal
    console.log("API: Requesting portal auto-login link");
    console.log(
      `API: Portal endpoint: ${portalHostUrl}/api/user/auto-login-link`
    );

    let portalResponse;
    try {
      // Construct query parameters for GET request
      const queryParams = new URLSearchParams({
        wp_user_id: userId,
        expiration_hour: 1,
        redirect: redirectPage,
      });

      portalResponse = await fetch(
        `${portalHostUrl}/api/user/auto-login-link?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API: Portal auth response status:", portalResponse.status);

      if (!portalResponse.ok) {
        const errorText = await portalResponse.text();
        console.error("API: Portal auto-login failed:", errorText);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to get portal auto-login link: ${portalResponse.status} ${portalResponse.statusText}`,
            details: errorText,
          },
          { status: 500 }
        );
      }
    } catch (fetchError) {
      console.error("API: Portal fetch error:", fetchError.message);
      return NextResponse.json(
        {
          success: false,
          error: `Error connecting to portal: ${fetchError.message}`,
        },
        { status: 500 }
      );
    }

    let portalData;
    try {
      portalData = await portalResponse.json();
      console.log(
        "API: Portal auto-login response received",
        portalData.success ? "successfully" : "with errors"
      );
    } catch (jsonError) {
      console.error("API: Failed to parse portal response:", jsonError);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to parse portal response: ${jsonError.message}`,
        },
        { status: 500 }
      );
    }

    if (!portalData.success || !portalData.data?.link) {
      console.error("API: Portal auto-login link not found", portalData);
      return NextResponse.json(
        {
          success: false,
          error: "Portal auto-login link not found",
          details: portalData,
        },
        { status: 500 }
      );
    }

    // Verify that the returned user ID matches the current user
    if (
      portalData.data.wp_user_id &&
      portalData.data.wp_user_id.toString() !== userId
    ) {
      console.error("API: User ID mismatch", {
        expected: userId,
        received: portalData.data.wp_user_id,
      });
      return NextResponse.json(
        {
          success: false,
          error: "User ID mismatch",
          details: {
            expected: userId,
            received: portalData.data.wp_user_id,
          },
        },
        { status: 500 }
      );
    }

    console.log("API: Successfully obtained portal auto-login URL");

    // Return the auto-login URL
    return NextResponse.json({
      success: true,
      url: portalData.data.link,
    });
  } catch (error) {
    console.error("API: Error in portal login API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

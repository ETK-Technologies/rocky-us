export async function uploadFileToS3(file, directory = "", questionnaire = "ed", onProgress = null) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG and PNG files are allowed");
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size exceeds 10MB limit");
    }

    const s3Response = await fetch("/api/s3/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        directory,
        questionnaire,
      }),
    });

    if (!s3Response.ok) {
      const errorData = await s3Response.json();
      throw new Error(errorData.error || "Failed to get S3 upload policy");
    }

    const { policy, fileUrl } = await s3Response.json();

    const formData = new FormData();

    Object.entries(policy.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    formData.append('file', file);

    const uploadResponse = await fetch(policy.url, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`S3 upload failed with status: ${uploadResponse.status}`);
    }

    return fileUrl;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw error;
  }
}

export async function uploadFileToS3WithProgress(file, directory = "", questionnaire = "ed", onProgress = null) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG and PNG files are allowed");
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size exceeds 10MB limit");
    }

    console.log("Requesting S3 upload policy...");
    const s3Response = await fetch("/api/s3/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        directory,
        questionnaire,
      }),
    });

    if (!s3Response.ok) {
      const errorData = await s3Response.json();
      throw new Error(errorData.error || "Failed to get S3 upload policy");
    }

    const { policy, fileUrl } = await s3Response.json();
    console.log("Received S3 upload policy, proceeding with upload...");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (onProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(Math.round(progress));
          }
        });
      }

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("File uploaded successfully to S3");
          resolve(fileUrl);
        } else {
          console.error(`S3 upload failed with status: ${xhr.status}, response: ${xhr.responseText}`);
          reject(new Error(`S3 upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", (e) => {
        console.error("XHR error during S3 upload:", e);
        
        if (xhr.status === 0) {
          reject(new Error("S3 upload failed due to CORS or network error. Please check S3 bucket CORS configuration."));
        } else {
          reject(new Error("S3 upload failed"));
        }
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("S3 upload was aborted"));
      });

      const formData = new FormData();
      
      Object.entries(policy.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      formData.append('file', file);
      xhr.open("POST", policy.url);
      console.log(`Starting S3 upload to ${directory} with content type ${file.type}`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error("S3 upload error:", error);
    throw error;
  }
}

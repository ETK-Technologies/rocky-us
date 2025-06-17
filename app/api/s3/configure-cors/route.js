import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(req) {
  try {
    const isAuthorized = process.env.NODE_ENV === "development" || 
                         req.headers.get("x-api-key") === process.env.ADMIN_API_KEY;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const corsConfig = {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "GET", "POST", "HEAD", "DELETE"],
          AllowedOrigins: [
            "http://localhost:3000",                 // For local development
            "http://127.0.0.1:3000",                 // Alternative local
            "https://myrocky.ca",                    // Production
            "https://www.myrocky.ca",                // Production with www
            process.env.NEXT_PUBLIC_SITE_URL || "*", // Dynamic URL
          ],
          ExposeHeaders: ["ETag", "Content-Length", "Content-Type", "Location"],
          MaxAgeSeconds: 3600
        }
      ]
    };

    // Apply CORS configuration to bucket
    await s3.putBucketCors({
      Bucket: process.env.S3_BUCKET_NAME,
      CORSConfiguration: corsConfig
    }).promise();

    return NextResponse.json({
      success: true,
      message: "S3 bucket CORS configuration updated successfully",
      config: corsConfig
    });
  } catch (error) {
    console.error("Error configuring S3 CORS:", error);
    return NextResponse.json(
      { error: "Failed to configure S3 CORS", details: error.message },
      { status: 500 }
    );
  }
}

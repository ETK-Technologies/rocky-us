import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { randomBytes } from "crypto";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function ensureS3CorsConfig() {
  try {
    const currentConfig = await s3
      .getBucketCors({
        Bucket: process.env.S3_BUCKET_NAME,
      })
      .promise()
      .catch(() => ({ CORSRules: [] }));
    const corsConfig = {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "GET", "POST", "HEAD"],
          AllowedOrigins: [
            "http://localhost:3000", // For local development
            "https://www.myrocky.ca", // Production
            "https://myrocky.ca", // Production without www
            process.env.NEXT_PUBLIC_SITE_URL || "*", // Dynamic URL from environment
          ],
          ExposeHeaders: ["ETag", "Location"],
          MaxAgeSeconds: 3600,
        },
      ],
    };

    const needsUpdate =
      !currentConfig.CORSRules ||
      currentConfig.CORSRules.length === 0 ||
      !currentConfig.CORSRules.some((rule) =>
        rule.AllowedOrigins.includes("http://localhost:3000")
      );

    if (needsUpdate) {
      console.log("Updating S3 bucket CORS configuration...");
      await s3
        .putBucketCors({
          Bucket: process.env.S3_BUCKET_NAME,
          CORSConfiguration: corsConfig,
        })
        .promise();
      console.log("S3 bucket CORS configuration updated successfully");
    }
  } catch (error) {
    console.error("Error configuring S3 CORS:", error);
  }
}

export async function POST(req) {
  try {
    await ensureS3CorsConfig();

    const { fileName, fileType, directory = "", questionnaire = "ed" } =
      await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "fileName and fileType are required" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { error: "Only JPEG and PNG files are allowed" },
        { status: 400 }
      );
    }

    const randomHash = randomBytes(16).toString("hex");
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const timestamp = Date.now();

    const baseDirectory = directory || `questionnaire/${questionnaire}-photo-ids`;
    const key = `${baseDirectory}/${randomHash}/${timestamp}.${fileExtension}`;
    const policy = await s3.createPresignedPost({
      Bucket: process.env.S3_BUCKET_NAME,
      Fields: {
        key,
        'Content-Type': fileType,
        'success_action_status': '201'
      },
      Conditions: [
        ['content-length-range', 0, 10 * 1024 * 1024],
        {'Content-Type': fileType},
        {'success_action_status': '201'}
      ],
      Expires: 300,
    });

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      policy,
      fileUrl,
      key,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}

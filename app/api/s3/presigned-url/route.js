import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { logger } from "@/utils/devLogger";
import { randomBytes } from "crypto";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(req) {
  try {
    const {
      fileName,
      fileType,
      directory = "",
      questionnaire = "ed",
    } = await req.json();

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName is required" },
        { status: 400 }
      );
    }

    const fileExt = fileName.toLowerCase().split(".").pop();

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedExtensions = ["jpg", "jpeg", "png"];

    const isSupportedMimeType = fileType && allowedMimeTypes.includes(fileType);
    const isSupportedExtension = allowedExtensions.includes(fileExt);

    if (!isSupportedMimeType && !isSupportedExtension) {
      return NextResponse.json(
        { error: "Only JPG, JPEG, and PNG files are allowed" },
        { status: 400 }
      );
    }

    let actualFileType = fileType;
    if (!fileType || fileType === "") {
      if (fileExt === "jpg") {
        actualFileType = "image/jpeg";
      } else if (fileExt === "jpeg") {
        actualFileType = "image/jpeg";
      } else if (fileExt === "png") {
        actualFileType = "image/png";
      }
    }

    const randomHash = randomBytes(16).toString("hex");
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const timestamp = Date.now();

    const baseDirectory =
      directory || `questionnaire/${questionnaire}-photo-ids`;
    const key = `${baseDirectory}/${randomHash}/${timestamp}.${fileExtension}`;
    const policy = await s3.createPresignedPost({
      Bucket: process.env.S3_BUCKET_NAME,
      Fields: {
        key,
        "Content-Type": actualFileType,
        success_action_status: "201",
      },
      Conditions: [
        ["content-length-range", 0, 20 * 1024 * 1024],
        { "Content-Type": actualFileType },
        { success_action_status: "201" },
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
    logger.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}

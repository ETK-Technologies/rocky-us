import AWS from "aws-sdk";
import { randomBytes } from "crypto";

// Initialize the S3 client once
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Uploads a file to Amazon S3 bucket with improved security and organization
 * @param {Buffer} fileBuffer - The buffer containing file data
 * @param {string} fileName - The original file name
 * @param {string} contentType - The MIME type of the file
 * @param {string} directory - Optional subdirectory within the bucket
 * @returns {Promise<string>} The URL of the uploaded file
 */
export async function uploadToS3(
  fileBuffer,
  fileName,
  contentType,
  directory = ""
) {
  const randomHash = randomBytes(16).toString("hex");

  const fileExtension = fileName.split(".").pop().toLowerCase();

  const timestamp = Date.now();

  const key = directory
    ? `${directory}/${randomHash}/${timestamp}.${fileExtension}`
    : `${randomHash}/${timestamp}.${fileExtension}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
}

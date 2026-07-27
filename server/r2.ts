import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const ACCOUNT_ID = "bc8ebcdb003b44c77d3d27dad9757f5d";
const BUCKET = "irondogstrength";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFARE_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(key: string, buffer: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return `/uploads/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));
}

export async function streamFromR2(key: string): Promise<{ body: Readable; contentType: string }> {
  const response = await r2.send(new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));
  return {
    body: response.Body as Readable,
    contentType: response.ContentType || "application/octet-stream",
  };
}

export async function listR2Files(): Promise<string[]> {
  const response = await r2.send(new ListObjectsV2Command({
    Bucket: BUCKET,
  }));
  return (response.Contents || [])
    .map(obj => obj.Key!)
    .filter(key => /\.(jpg|jpeg|png|gif|webp)$/i.test(key));
}

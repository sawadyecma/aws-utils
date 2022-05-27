import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

export async function listBuckets() {
  const client = new S3Client({ region: "ap-northeast-1" });
  const command = new ListBucketsCommand({});
  const ret = await client.send(command);
  console.log(ret);
  return;
}

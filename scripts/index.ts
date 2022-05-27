import { removeAllImages } from "./lib/ecr";
import { removeCnameRecord } from "./lib/route53";
import { listBuckets } from "./lib/s3";

async function cleanUp() {
  await listBuckets();
  await removeCnameRecord("");
  await removeAllImages("");
}

cleanUp();

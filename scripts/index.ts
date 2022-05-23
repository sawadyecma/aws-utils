import { removeAllImages } from "./lib/ecr";
import { removeCnameRecord } from "./lib/route53";

async function cleanUp() {
  await removeCnameRecord("api.sawada.sam.kronos-staging.net");
  await removeAllImages("nimaru-api");
}

cleanUp();

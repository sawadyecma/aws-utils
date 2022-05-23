import {
  ECRClient,
  BatchDeleteImageCommand,
  ListImagesCommand,
} from "@aws-sdk/client-ecr";

export async function removeAllImages(repositoryName: string) {
  const client = new ECRClient({ region: "ap-northeast-1" });
  const ListImagesOutput = await client.send(
    new ListImagesCommand({ repositoryName })
  );

  await client.send(
    new BatchDeleteImageCommand({
      repositoryName,
      imageIds: ListImagesOutput.imageIds,
    })
  );
}

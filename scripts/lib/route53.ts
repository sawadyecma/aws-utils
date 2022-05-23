import {
  Route53Client,
  ListHostedZonesByNameCommand,
  ChangeResourceRecordSetsCommand,
  ListResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";

export async function removeCnameRecord(serverDomain: string) {
  const client = new Route53Client({ region: "ap-northeast-1" });

  const listHostedZonesByNameOutput = await client.send(
    new ListHostedZonesByNameCommand({ DNSName: serverDomain })
  );

  const hostedZones = listHostedZonesByNameOutput.HostedZones;
  if (!hostedZones || hostedZones.length === 0) {
    console.log("ホストゾーンが見つからなかった");
    return;
  }

  const hostedZoneId = hostedZones[0].Id;

  const listResourceRecordSetOutput = await client.send(
    new ListResourceRecordSetsCommand({
      HostedZoneId: hostedZoneId,
    })
  );

  console.log(listResourceRecordSetOutput);
  if (!listResourceRecordSetOutput.ResourceRecordSets) {
    console.log("レコードが見つからなかった");
    return;
  }

  const cnameForDnsValidation =
    listResourceRecordSetOutput.ResourceRecordSets.find(
      (set) => set.Type === "CNAME"
    );

  if (!cnameForDnsValidation) {
    console.log("CNAMEレコードが見つからなかった");
    return;
  }

  await client.send(
    new ChangeResourceRecordSetsCommand({
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "DELETE",
            ResourceRecordSet: cnameForDnsValidation,
          },
        ],
      },
    })
  );

  return;
}

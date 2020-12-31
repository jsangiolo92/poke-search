import { S3 } from "aws-sdk";

export const getObject = async (key) => {
  console.log({ key });

  const s3 = new S3();

  const params = {
    Bucket: "poke-search-data",
    Key: key,
  };

  let responseBody: string;
  try {
    const objectData = await s3.getObject(params).promise();
    responseBody = objectData.Body.toString("utf-8");
  } catch (error) {
    console.error("ERROR", error);
    responseBody = JSON.stringify({ error });
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: responseBody,
  };
};

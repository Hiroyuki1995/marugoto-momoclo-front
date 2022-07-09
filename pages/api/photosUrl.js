import { apiUrl } from "../../src/const/const.url.js";

export async function getData(
  person = "all",
  exclusiveStartKey = null,
  refresh = false
) {
  console.log(
    `APIドメイン：${apiUrl}/photosUrl?person=${person}${
      exclusiveStartKey !== null
        ? `&exclusiveStartKey=${encodeURIComponent(exclusiveStartKey)}`
        : ``
    }`
  );
  const response = await fetch(
    `${apiUrl}/photosUrl?person=${person}${
      exclusiveStartKey !== null
        ? `&exclusiveStartKey=${encodeURIComponent(exclusiveStartKey)}`
        : ``
    }`,
    {
      headers: {
        "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
      },
    }
  );
  const jsonData = await response.json();
  return jsonData;
}

export default async function handler(req, res) {
  const jsonData = await getData(
    req.query.person,
    req.query.exclusiveStartKey,
    req.query.refresh
  );
  res.status(200).json(jsonData);
}

import { NextRequest, NextResponse } from "next/server";

import { client } from "@/db";
import { getNextSequenceValue, isValidUrl } from "@/utils";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const url = form.get("url")?.toString();
  const isValid = await isValidUrl(url);

  if (!isValid || !url) {
    return NextResponse.json({ error: "Invalid URL" });
  }

  const select = { original_url: true, short_url: true };

  const existingRecord = await client.shortUrl.findFirst({
    where: { original_url: url },
    select,
  });

  if (existingRecord) {
    return NextResponse.json(existingRecord);
  }

  const shortUrl = await getNextSequenceValue("ShortUrl");

  const newRecord = await client.shortUrl.create({
    data: { original_url: url, short_url: shortUrl },
    select,
  });

  return NextResponse.json(newRecord);
}

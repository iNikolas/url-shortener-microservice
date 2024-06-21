import { isValidUrl } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const url = form.get("url")?.toString();
  const isValid = await isValidUrl(url);

  if (!isValid) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  return NextResponse.json({ url });
}

import { client } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, context: { params: { id: String } }) {
  const id = Number(context.params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Wrong format" }, { status: 400 });
  }

  const record = await client.shortUrl.findFirst({
    where: { short_url: id },
  });

  if (!record) {
    return NextResponse.json(
      { error: "No short URL found for the given input" },
      { status: 404 }
    );
  }

  return NextResponse.redirect(record.original_url, 302);
}

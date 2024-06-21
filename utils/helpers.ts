import { client } from "@/db";

export async function isValidUrl(input?: string): Promise<boolean> {
  if (!input) {
    return false;
  }

  try {
    const url = new URL(input);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    return await isUrlExists(url.toString());
  } catch (error) {
    return false;
  }
}

export async function isUrlExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });

    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function getNextSequenceValue(modelName: string): Promise<number> {
  const counter = await client.counter.findUnique({
    where: { model: modelName },
  });

  if (counter) {
    const updatedCounter = await client.counter.update({
      where: { model: modelName },
      data: { count: { increment: 1 } },
    });
    return updatedCounter.count;
  } else {
    const newCounter = await client.counter.create({
      data: {
        model: modelName,
        count: 1,
      },
    });
    return newCounter.count;
  }
}

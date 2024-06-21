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

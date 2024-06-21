export async function isValidUrl(input?: string): Promise<boolean> {
  if (!input) {
    return false;
  }

  try {
    new URL(input);

    return await isUrlExists(input);
  } catch (error) {
    return false;
  }
}

export async function isUrlExists(url: string): Promise<boolean> {
  const response = await fetch(url, { method: "HEAD" });

  return response.ok;
}

export function isValidUrl(input?: string) {
  if (!input) {
    return false;
  }

  try {
    new URL(input);

    return true;
  } catch (error) {
    return false;
  }
}

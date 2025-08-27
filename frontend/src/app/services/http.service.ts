const API_BASE_URL = "http://localhost:4001/api/v1";

export async function http(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = new URL(path, API_BASE_URL).toString();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (response.status >= 500) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response;
}

import fetch from "node-fetch";

export async function post<T>(
  url: string,
  body: any,
  headers?: HeadersInit
) {
  const response = await fetch(url, {
    ...(body && { body: JSON.stringify(body) }),
    ...(headers && { headers }),
    method: "POST",
  });

  const json = (await response.json()) as T & { error?: ServerError };

  if (json.error)
    throw new Error(json.error.description, { message: json.error });

  return json as T;
}

type ServerError = {
  errorId: string;
  description: string;
  diagnosticsId: string;
  validationErrors: { model: string; errors: string[] }[];
};

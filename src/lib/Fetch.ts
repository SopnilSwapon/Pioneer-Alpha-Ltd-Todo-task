import { TokenService } from "./auth/token";
import { refreshAccessToken } from "./auth/refresh";
import { globalLogout } from "./auth/logout";

export type TFetchError = {
  detail?: string;
  message?: string;
  statusCode?: number;
  [key: string]: unknown;
};

interface IFetchProps {
  method: string;
  url: string;
  body?: unknown;
  multipart?: boolean;
  abortController?: AbortController;
  headers?: Record<string, string>;
}

export default async function Fetch<T>({
  method,
  url,
  body,
  multipart,
  abortController,
  headers: custom = {},
}: IFetchProps): Promise<T> {
  const access = TokenService.getAccess();
  const isAuthURL =
    url.includes("/auth/login") ||
    url.includes("/auth/refresh") ||
    url.includes("/users/signup");

  const headers: HeadersInit = { ...custom };

  // 🚨 Missing tokens
  if (!access && !isAuthURL) {
    globalLogout();
  }

  // Include access token
  if (access && !isAuthURL) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  // JSON
  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    signal: abortController?.signal,
    body: multipart
      ? (body as BodyInit)
      : body
      ? JSON.stringify(body)
      : undefined,
  };

  let response = await fetch(url, options);

  // 🚨 Access token expired → try refresh
  if (response.status === 401 && !isAuthURL) {
    const newAccess = await refreshAccessToken();

    if (!newAccess) {
      globalLogout();
    }

    headers["Authorization"] = `Bearer ${newAccess}`;
    response = await fetch(url, options);
  }

  const text = await response.text();
  let data: unknown;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const error: TFetchError = {
      ...(typeof data === "object" && data !== null ? data : {}),
      statusCode: response.status,
    };

    if (error.statusCode === 401) {
      globalLogout();
    }

    throw error;
  }

  return data as T;
}

// service/authService.ts
import { getEndpoints } from "./config";

interface GoogleAuthResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    name: string;
    authSource: string;
  };
  token?: string;
}

/**
 * Authenticate user with Google credential
 * @param credential - Google OAuth credential token
 * @returns Authentication response with user data
 */
export const authenticateWithGoogle = async (
  credential: string
): Promise<GoogleAuthResponse> => {
  const endpoints = await getEndpoints();
  const baseUrl = endpoints.todos.replace("todos/", "");
  const authUrl = `${baseUrl}auth/google`;

  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in the request
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Authentication failed");
  }

  return response.json();
};

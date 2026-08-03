const API_URL = import.meta.env.VITE_API_URL;

export async function register(user) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}

// TODO: maybe wrap fetchCurrentUser in useCallback
export async function fetchCurrentUser(token) {
  const userResponse = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!userResponse.ok) {
    throw new Error("Failed to get user");
  }
  // userResponse is a Response object that needs parsing
  const userData = await userResponse.json();
  // Save user
  return userData;
}

export async function loginUser(email, password) {
  // Send the request
  const loginResponse = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    credentials: "include", // For request that require refresh token
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  // loginResponse is a Response object that needs parsing
  const data = await loginResponse.json();
  if (!loginResponse.ok) {
    throw data;
  }
  return data;
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include", // For request that require refresh token
  });
  if (!response.ok) {
    throw new Error("Failed to log out");
  }
  return;
}

export async function refreshAccessToken() {
  // Check if refresh token exists (by trying POST /users/token)
  const tokenResponse = await fetch(`${API_URL}/users/token`, {
    method: "POST",
    credentials: "include", // For request that require refresh token
    headers: {
      "Content-Type": "application/json",
    },
  });
  // User not logged in
  if (tokenResponse.status === 401) {
    return null;
  }
  if (!tokenResponse.ok) {
    throw new Error("Failed to get refresh token");
  }
  // tokenResponse is a Response object that needs parsing
  const data = await tokenResponse.json();
  return data;
}

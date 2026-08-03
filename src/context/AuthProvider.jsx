import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import {
  register,
  loginUser,
  fetchCurrentUser,
  logoutUser,
  refreshAccessToken,
} from "../api/auth";

// Accept children to wrap app and return them later
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user; // converts Object to boolean

  async function login(email, password) {
    const data = await loginUser(email, password);
    // Read the JSON
    const accessToken = data.accessToken;
    // Save the access token
    setAccessToken(accessToken);
    // Fetch user
    const currentUser = await fetchCurrentUser(accessToken);

    setUser(currentUser);
    return currentUser;
  }

  async function logout() {
    await logoutUser();
    // Clear user
    setUser(null);
    // Clear accesToken
    setAccessToken(null);
    return;
  }

  useEffect(() => {
    async function restoreSession() {
      try {
        const tokenResponse = await refreshAccessToken();
        if (tokenResponse === null) {
          setUser(null);
          setAccessToken(null);
          return;
        }

        // Save token
        setAccessToken(tokenResponse.accessToken);
        // Call /users/me
        const currentUser = await fetchCurrentUser(tokenResponse.accessToken);
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        accessToken,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

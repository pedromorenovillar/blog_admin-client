import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Keeps non-authors out of the admin app
function AuthorRoute({ children }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

  if (user && isAuthenticated && user.isAuthor) {
    return children;
  }
  if (!isAuthenticated) {
    return <Navigate to="/users/login" />;
  }
  if (!user.isAuthor) {
    // go to public client (back won't return to the admin app)
    window.location.replace(CLIENT_URL);
    return null;
  }
}

export default AuthorRoute;

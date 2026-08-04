import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function NavigationBar() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/users/login");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.navBar}>
      <NavLink to="/">Dashboard</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/posts/new-post">New Post</NavLink>
          <a href={`${CLIENT_URL}/posts`}>View Blog</a>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/users/login">Login</NavLink>
          <a href={`${CLIENT_URL}/users/register`}>Register</a>
        </>
      )}
    </div>
  );
}

export default NavigationBar;

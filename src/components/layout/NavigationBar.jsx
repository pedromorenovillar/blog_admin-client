import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";

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
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/users/login">Login</NavLink>
          <NavLink to="/users/register">Register</NavLink>
        </>
      )}
    </div>
  );
}

export default NavigationBar;

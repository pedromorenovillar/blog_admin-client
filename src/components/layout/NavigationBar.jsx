import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";
import {
  Menu,
  House,
  UserStar,
  StickyNote,
  Eye,
  LogOut,
  UserPen,
  KeyRound,
} from "lucide-react";

function NavigationBar() {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  return (
    <>
      <button onClick={toggleMenu} className={styles.navMenu}>
        <Menu />
        Menu
      </button>
      <div className={`${styles.navBar} ${isMenuOpen && styles.menuOpen}`}>
        <NavLink to="/">
          <House />
          Home
        </NavLink>
        <a href={`${CLIENT_URL}/posts`}>
          <Eye />
          View Blog
        </a>
        {user?.isAuthor && (
          <NavLink to="/">
            <UserStar />
            Dashboard
          </NavLink>
        )}
        {isAuthenticated ? (
          <>
            <NavLink to="/posts/new-post">
              <StickyNote />
              New Post
            </NavLink>
            <button onClick={handleLogout}>
              <LogOut />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/users/login">
              <KeyRound />
              Login
            </NavLink>
            <a href={`${CLIENT_URL}/users/register`}>
              <UserPen />
              Register
            </a>
          </>
        )}
      </div>
    </>
  );
}

export default NavigationBar;

import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // use login from context
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Convert errors array to object
  const fieldErrors = Object.fromEntries(
    errors.map(({ path, msg }) => [path, msg]),
  );

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const loggedInUser = await login(email, password);
      if (location.state) {
        navigate(location.state);
      } else if (!loggedInUser.isAuthor) {
        window.location.href = CLIENT_URL;
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
    }
    return;
  }

  function handleEmail(event) {
    setEmail(event.target.value);

    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== "email");
    });
  }
  function handlePassword(event) {
    setPassword(event.target.value);

    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== "password");
    });
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />
        {fieldErrors.email && <p>{fieldErrors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        {fieldErrors.password && <p>{fieldErrors.password}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;

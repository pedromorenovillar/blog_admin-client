import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  // Convert errors array to object
  const fieldErrors = Object.fromEntries(
    errors.map(({ path, msg }) => [path, msg]),
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors([]); // Clear old errors
    try {
      await register(user);
      navigate("/users/login");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
    }
    return;
  }

  function handleUser(e) {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== name);
    });
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={handleUser}
        />
        {fieldErrors.firstName && <p>{fieldErrors.firstName}</p>}
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={handleUser}
        />
        {fieldErrors.lastName && <p>{fieldErrors.lastName}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleUser}
        />
        {fieldErrors.email && <p>{fieldErrors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleUser}
        />
        {fieldErrors.password && <p>{fieldErrors.password}</p>}
        <label htmlFor="passwordConfirm">Password confirmation</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={user.passwordConfirm}
          onChange={handleUser}
        />
        {fieldErrors.passwordConfirm && <p>{fieldErrors.passwordConfirm}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;

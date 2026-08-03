import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <h1>Hello, {user.firstname}, you are an author.</h1>
      ) : (
        <h1>Dashboard</h1>
      )}
    </>
  );
}

export default Dashboard;

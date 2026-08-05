import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NavigationBar from "../components/layout/NavigationBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function RootLayout() {
  const { loading } = useContext(AuthContext);

  return (
    <div className="app-container">
      <NavigationBar />

      <main>{loading ? <h1>Loading...</h1> : <Outlet />}</main>
      <Footer />
    </div>
  );
}
export default RootLayout;

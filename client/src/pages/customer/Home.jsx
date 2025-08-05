
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./homeSections/Footer";

export default function Home() {
 

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem", minHeight: "80vh", backgroundColor: "#f5f5f5" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
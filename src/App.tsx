import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footers";
import HomePage from "./layouts/homepage/HomePage";
import { useState } from "react";

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");
  return (
    <div>
      <Navbar
        tuKhoaTimKiem={tuKhoaTimKiem}
        setTuKhoaTimKiem={setTuKhoaTimKiem}
      />
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem} />
      <Footer />
    </div>
  );
}

export default App;

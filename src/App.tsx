import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footers";
import HomePage from "./layouts/homepage/HomePage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/product/ChiTietSanPham";

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        <Routes>
          {" "}
          <Route
            path="/"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route
            path="/:maTheLoai"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/sach/:maSach" element={<ChiTietSanPham />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from "react";
function DangKyNguoiDung() {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [email, setEmail] = useState("");

  const [hoDem, setHoDem] = useState("");

  const [ten, setTen] = useState("");

  const [soDienThoai, setSoDienThoai] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [matKhauLapLai, setMatKhauLapLai] = useState("");
  const [gioiTinh, setGioiTinh] = useState(1);
  const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {};
  const handleTenDangNhapChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    // cập nhật state
    setTenDangNhap(value);

    // reset lỗi
    setErrorTenDangNhap("");

    try {
      const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${value}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data === true) {
        setErrorTenDangNhap("Tên đăng nhập đã tồn tại");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1 className="mt-5 text-center">Đăng ký</h1>

      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="tenDangNhap" className="form-label">
              Tên đăng nhập
            </label>

            <input
              type="text"
              id="tenDangNhap"
              className="form-control"
              value={tenDangNhap}
              onChange={handleTenDangNhapChange}
            />

            <div style={{ color: "red" }}>{errorTenDangNhap}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default DangKyNguoiDung;

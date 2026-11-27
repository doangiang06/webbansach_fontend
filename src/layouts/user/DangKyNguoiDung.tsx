import React, { useState } from "react";

// ============================================================================
// [PHẦN 1: API & KIỂM TRA DỮ LIỆU TỪ SERVER] -> Sau này tách sang: nguoiDungApi.ts
// ============================================================================

const API_BASE_URL = "http://localhost:8080";

// Trả về true nếu tên đăng nhập HỢP LỆ (chưa tồn tại), false nếu đã tồn tại
const kiemTraTenDangNhapHopLe = async (
  tenDangNhap: string,
  setErrorTenDangNhap: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
  if (!tenDangNhap.trim()) {
    setErrorTenDangNhap("Vui lòng nhập tên đăng nhập.");
    return false;
  }

  try {
    const url = `${API_BASE_URL}/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${encodeURIComponent(tenDangNhap)}`;
    const response = await fetch(url);
    const daTonTai = await response.json();

    if (daTonTai === true) {
      setErrorTenDangNhap("Tên đăng nhập đã tồn tại");
      return false;
    }

    setErrorTenDangNhap("");
    return true;
  } catch (error) {
    console.error("Lỗi kiểm tra tên đăng nhập:", error);
    setErrorTenDangNhap("Không thể kiểm tra tên đăng nhập lúc này.");
    return false;
  }
};

// Trả về true nếu email HỢP LỆ (chưa tồn tại), false nếu đã tồn tại
const kiemTraEmailHopLe = async (
  email: string,
  setErrorEmail: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
  if (!email.trim()) {
    setErrorEmail("Vui lòng nhập email.");
    return false;
  }

  try {
    const url = `${API_BASE_URL}/nguoi-dung/search/existsByEmail?email=${encodeURIComponent(email)}`;
    const response = await fetch(url);
    const daTonTai = await response.json();

    if (daTonTai === true) {
      setErrorEmail("Email đã tồn tại");
      return false;
    }

    setErrorEmail("");
    return true;
  } catch (error) {
    console.error("Lỗi kiểm tra email:", error);
    setErrorEmail("Không thể kiểm tra email lúc này.");
    return false;
  }
};

// Gửi dữ liệu đăng ký lên backend
const guiYeuCauDangKy = async (payload: {
  tenDangNhap: string;
  email: string;
  matKhau: string;
  hoDem: string;
  ten: string;
  soDienThoai: string;
  gioiTinh: number;
}): Promise<{ ok: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tai-khoan/dang-ky`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        ok: true,
        message: "Đăng ký thành công, vui lòng kiểm tra email để kích hoạt.",
      };
    }

    return {
      ok: false,
      message: "Đã xảy ra lỗi trong quá trình đăng ký tài khoản.",
    };
  } catch (error) {
    console.error("Lỗi gửi form đăng ký:", error);
    return {
      ok: false,
      message: "Không thể kết nối tới máy chủ. Vui lòng thử lại sau.",
    };
  }
};

// ============================================================================
// [PHẦN 2: VALIDATE MẬT KHẨU] -> Sau này tách sang: matKhauValidator.ts
// ============================================================================

// Trả về true nếu mật khẩu HỢP LỆ, false nếu không hợp lệ
const kiemTraMatKhauHopLe = (
  matKhau: string,
  setErrorMatKhau: React.Dispatch<React.SetStateAction<string>>,
): boolean => {
  const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(matKhau)) {
    setErrorMatKhau(
      "Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)",
    );
    return false;
  }

  setErrorMatKhau("");
  return true;
};

// Trả về true nếu mật khẩu nhập lại TRÙNG KHỚP mật khẩu gốc, false nếu lệch
const kiemTraMatKhauLapLaiHopLe = (
  matKhauLapLai: string,
  matKhauGoc: string,
  setErrorMatKhauLapLai: React.Dispatch<React.SetStateAction<string>>,
): boolean => {
  if (matKhauLapLai !== matKhauGoc) {
    setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
    return false;
  }

  setErrorMatKhauLapLai("");
  return true;
};

// ============================================================================
// [PHẦN 3: COMPONENT GIAO DIỆN ĐĂNG KÝ] -> File chính: DangKyNguoiDung.tsx
// ============================================================================

function DangKyNguoiDung() {
  // --- 3.1. State dữ liệu form ---
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [email, setEmail] = useState("");
  const [hoDem, setHoDem] = useState("");
  const [ten, setTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [matKhauLapLai, setMatKhauLapLai] = useState("");
  const [gioiTinh, setGioiTinh] = useState(1);

  // --- 3.2. State thông báo lỗi & trạng thái gửi ---
  const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMatKhau, setErrorMatKhau] = useState("");
  const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
  const [thongBao, setThongBao] = useState("");

  // --- 3.3. Các hàm xử lý thay đổi từng ô input ---
  const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenDangNhap(value);
    kiemTraTenDangNhapHopLe(value, setErrorTenDangNhap);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    kiemTraEmailHopLe(value, setErrorEmail);
  };

  const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMatKhau(value);
    kiemTraMatKhauHopLe(value, setErrorMatKhau);

    // Đồng bộ lại ô nhập lại mật khẩu nếu người dùng đã nhập trước đó
    if (matKhauLapLai) {
      kiemTraMatKhauLapLaiHopLe(matKhauLapLai, value, setErrorMatKhauLapLai);
    }
  };

  const handleMatKhauLapLaiChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setMatKhauLapLai(value);
    kiemTraMatKhauLapLaiHopLe(value, matKhau, setErrorMatKhauLapLai);
  };

  // --- 3.4. Xử lý submit form ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setThongBao("");

    const isTenDangNhapValid = await kiemTraTenDangNhapHopLe(
      tenDangNhap,
      setErrorTenDangNhap,
    );
    const isEmailValid = await kiemTraEmailHopLe(email, setErrorEmail);
    const isMatKhauValid = kiemTraMatKhauHopLe(matKhau, setErrorMatKhau);
    const isMatKhauLapLaiValid = kiemTraMatKhauLapLaiHopLe(
      matKhauLapLai,
      matKhau,
      setErrorMatKhauLapLai,
    );

    if (
      !isTenDangNhapValid ||
      !isEmailValid ||
      !isMatKhauValid ||
      !isMatKhauLapLaiValid
    ) {
      return;
    }

    const result = await guiYeuCauDangKy({
      tenDangNhap,
      email,
      matKhau,
      hoDem,
      ten,
      soDienThoai,
      gioiTinh,
    });

    setThongBao(result.message);
  };

  // --- 3.5. Render giao diện (JSX) ---
  return (
    <div className="container">
      <h1 className="mt-5 text-center">Đăng ký</h1>

      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="form">
          {/* Ô Tên đăng nhập */}
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

          {/* Ô Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
            <div style={{ color: "red" }}>{errorEmail}</div>
          </div>

          {/* Ô Mật khẩu */}
          <div className="mb-3">
            <label htmlFor="matKhau" className="form-label">
              Mật Khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              className="form-control"
              value={matKhau}
              onChange={handleMatKhauChange}
            />
            <div style={{ color: "red" }}>{errorMatKhau}</div>
          </div>

          {/* Ô Nhập lại mật khẩu */}
          <div className="mb-3">
            <label htmlFor="matKhauLaplai" className="form-label">
              Nhập lại Mật Khẩu
            </label>
            <input
              type="password"
              id="matKhauLaplai"
              className="form-control"
              value={matKhauLapLai}
              onChange={handleMatKhauLapLaiChange}
            />
            <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>
          </div>

          {/* Ô Họ đệm */}
          <div className="mb-3">
            <label htmlFor="hoDem" className="form-label">
              Họ Đệm
            </label>
            <input
              type="text"
              id="hoDem"
              className="form-control"
              value={hoDem}
              onChange={(e) => setHoDem(e.target.value)}
            />
          </div>

          {/* Ô Tên */}
          <div className="mb-3">
            <label htmlFor="ten" className="form-label">
              Tên
            </label>
            <input
              type="text"
              id="ten"
              className="form-control"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
            />
          </div>

          {/* Ô Số điện thoại */}
          <div className="mb-3">
            <label htmlFor="soDienThoai" className="form-label">
              Số Điện Thoại
            </label>
            <input
              type="text"
              id="soDienThoai"
              className="form-control"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
            />
          </div>

          {/* Ô Giới tính */}
          <div className="mb-3">
            <label htmlFor="gioiTinh" className="form-label">
              Giới Tính
            </label>
            <select
              id="gioiTinh"
              className="form-control"
              value={gioiTinh}
              onChange={(e) => setGioiTinh(Number(e.target.value))}
            >
              <option value={1}>Nam</option>
              <option value={0}>Nữ</option>
            </select>
          </div>

          {/* Nút Submit & Thông báo kết quả */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Đăng Ký
            </button>
            <div style={{ color: "green" }}>{thongBao}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DangKyNguoiDung;

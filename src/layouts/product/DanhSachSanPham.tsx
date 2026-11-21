import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { error } from "console";
import { PhanTrang } from "../utils/PhanTrang";
interface DanhSanPhamProps {
  tuKhoaTimKiem: string;
  maTheLoai: number;
}
function DanhSachSanPham({ tuKhoaTimKiem, maTheLoai }: DanhSanPhamProps) {
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [tongSoSach, setTongSoSach] = useState(0);
  useEffect(() => {
    if (tuKhoaTimKiem === "" && maTheLoai == 0) {
      // nếu không có từ khóa tìm keiems và không có mã thể loại lấy toàn bọ scah
      layToanBoSach(trangHienTai - 1)
        .then((kq) => {
          if (!kq) {
            setDanhSachQuyenSach([]);
            setTongSoTrang(0);
            setDangTaiDuLieu(false);
            return;
          }
          setDanhSachQuyenSach(kq.ketQua ?? []);
          setTongSoTrang(kq.tongSoTrang ?? 0);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setBaoLoi(error.message);
          setDangTaiDuLieu(false);
        });
    } else {
      timKiemSach(tuKhoaTimKiem, maTheLoai)
        .then((kq) => {
          // console.log("Số sách nhận được:", kq.length);
          setDanhSachQuyenSach(kq.ketQua);
          setTongSoTrang(kq.tongSoTrang);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setBaoLoi(error.message);
          setDangTaiDuLieu(false);
        });
    }
  }, [trangHienTai, tuKhoaTimKiem, maTheLoai]); // trag hiện tại bị thay đổi sẽ gọi hàm này load lại toàn bộ trang
  const phanTrang = (trang: number) => {
    setTrangHienTai(trang); // khi người ta click chuọt truyền trang mới vào
  };
  if (dangTaiDuLieu) {
    return (
      <div>
        <h1>Đang tải dữ liệu</h1>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gặp lỗi : {baoLoi}</h1>
      </div>
    );
  }
  if (danhSachQuyenSach.length === 0) {
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-center">
          <h1>Hiện không tìm thấy sách nào theo yêu cầu</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        {danhSachQuyenSach.map((sach) => (
          <SachProps key={sach.maSach} sach={sach} />
        ))}
      </div>
      <PhanTrang
        trangHienTai={trangHienTai}
        tongSoTrang={tongSoTrang}
        phanTrang={phanTrang}
      />
    </div>
  );
}

export default DanhSachSanPham;

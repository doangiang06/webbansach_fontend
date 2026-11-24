import React, { useEffect, useState } from "react";

import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhanhAPI";
import { lay1DanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StarFill, Star } from "react-bootstrap-icons";
import SaoXepHang from "../../utils/SaoXepHang";
interface DanhGiaSanPhamProps {
  maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPhamProps> = ({ maSach }) => {
  const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState<string | null>(null);

  useEffect(() => {
    lay1DanhGiaCuaMotSach(maSach)
      .then((danhSach) => {
        setDanhSachDanhGia(danhSach);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, []);

  if (dangTaiDuLieu) {
    return <h5>Đang tải dữ liệu...</h5>;
  }

  if (baoLoi) {
    return <h5>Gặp lỗi: {baoLoi}</h5>;
  }
  console.log("Danh sách đánh giá:", danhSachDanhGia);
  return (
    <div className="container mt-2 mb-2">
      <h4>Dánh Giá Sản Phẩm</h4>
      {danhSachDanhGia.map((danhGia, index) => (
        <div className="row">
          <div className="col-4 text-end">
            {SaoXepHang(danhGia.diemXepHang ? danhGia.diemXepHang : 0)}
          </div>
          <div className="col-8">
            <p>{danhGia.nhanXet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DanhGiaSanPham;

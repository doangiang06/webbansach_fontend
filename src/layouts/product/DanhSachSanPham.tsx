import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach } from "../../api/SachAPI";
import { error } from "console";
import { PhanTrang } from "../utils/PhanTrang";

const DanhSachSanPham: React.FC = () => {
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  useEffect(() => {
    layToanBoSach()
      .then((sachData) => {
        console.log("Số sách nhận được:", sachData.length);
        setDanhSachQuyenSach(sachData);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, []);
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
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        {danhSachQuyenSach.map((sach) => (
          <SachProps key={sach.maSach} sach={sach} />
        ))}
      </div>
      <PhanTrang />
    </div>
  );
};

export default DanhSachSanPham;

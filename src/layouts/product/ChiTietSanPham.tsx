import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import { error } from "console";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import SaoXepHang from "../utils/SaoXepHang";
import dinhDangSo from "../utils/DinhDangSo";

const ChiTietSanPham: React.FC = () => {
  const { maSach } = useParams(); //lấy mã sách
  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) {
      maSachNumber = 0;
    }
  } catch (error) {
    maSachNumber = 0;
    console.error("Error", error);
  }
  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [soLuong, setSoLuong] = useState(1); // số lượng hàng ít nhát = 1

  const tangSoLuong = () => {
    const soLuongTonKho = sach && sach.soLuong ? sach.soLuong : 0;
    if (soLuong < soLuongTonKho) setSoLuong(soLuong + 1);
  };
  const giamSoLuong = () => {
    if (soLuong >= 2) {
      setSoLuong(soLuong - 1);
    }
  };
  const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const soLuongMoi = parseInt(event.target.value);
    const soLuongTonKho = sach && sach.soLuong ? sach.soLuong : 0;
    if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
      setSoLuong(soLuongMoi);
    }
  };

  useEffect(() => {
    laySachTheoMaSach(maSachNumber)
      .then((sach) => {
        setSach(sach);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [maSach]);
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
  if (!sach) {
    return (
      <div>
        <h1>Sách không tồn tại </h1>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4 mb-4 ">
        <div className="col-4">
          <HinhAnhSanPham maSach={maSachNumber} />
          {sach.maSach}
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{sach.tenSach}</h1>
              <h4>
                {SaoXepHang(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
              </h4>
              <h4>
                <div>
                  <span className="text-muted text-decoration-line-through me-2">
                    {dinhDangSo(sach.giaNiemYet)}đ
                  </span>

                  <span className="text-danger fw-bold fs-4">
                    {sach.giaBan?.toLocaleString()}đ
                  </span>
                </div>
              </h4>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: sach.moTa + "" }}></div>

              <hr />
            </div>
            <div className="col-4">
              <div>
                <div className="mb-2">Số lượng</div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn-outline-secondary me-2"
                    onClick={giamSoLuong}
                  >
                    -
                  </button>
                  <input
                    className="form-control text-center"
                    type="number"
                    value={soLuong}
                    min={1}
                    onChange={handleSoLuongChange} // hmaf xử lý khi nhập vao từ bàn phím
                  />
                  <button
                    className="btn-outline-secondary ms-2"
                    onClick={tangSoLuong}
                  >
                    +
                  </button>
                </div>
                {sach.giaBan && (
                  <div className=" mt-2" text-center>
                    Số tiền tạm tính <br />
                    <h4>{dinhDangSo(soLuong * sach.giaBan)} đ</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4 ">
        Phần Review
        <DanhGiaSanPham maSach={maSachNumber} />
      </div>
    </div>
  );
};

export default ChiTietSanPham;

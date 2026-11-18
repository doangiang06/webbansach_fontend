import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import Carouselitem from "./Carouselitem";

const Carousel: React.FC = () => {
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState<string | null>(null);

  useEffect(() => {
    lay3SachMoiNhat()
      .then((kq) => {
        // console.log("Dữ liệu sách:", sachData);
        setDanhSachQuyenSach(kq.ketQua);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, []); // THÊM [] VÀO ĐÂY

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
        <h1>Gặp lỗi: {baoLoi}</h1>
      </div>
    );
  }

  // Nếu chưa đủ 3 sách thì không render carousel
  if (danhSachQuyenSach.length < 3) {
    return (
      <div>
        <h1>Không đủ dữ liệu sách</h1>
      </div>
    );
  }

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-dark"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row align-items-center">
            <Carouselitem sach={danhSachQuyenSach[0]} />
          </div>
        </div>

        <div className="carousel-item">
          <div className="row align-items-center">
            <Carouselitem sach={danhSachQuyenSach[1]} />
          </div>
        </div>

        <div className="carousel-item">
          <div className="row align-items-center">
            <Carouselitem sach={danhSachQuyenSach[2]} />
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

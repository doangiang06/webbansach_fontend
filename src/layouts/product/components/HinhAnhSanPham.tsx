import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhanhAPI";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPhamProps {
  maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPhamProps> = ({ maSach }) => {
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState<string | null>(null);

  useEffect(() => {
    setDangTaiDuLieu(true);

    layToanBoAnhCuaMotSach(maSach)
      .then((danhSach) => {
        console.log("Danh sách ảnh:", danhSach);
        setDanhSachAnh(danhSach);

        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [maSach]);

  if (dangTaiDuLieu) {
    return <h5>Đang tải dữ liệu...</h5>;
  }

  if (baoLoi) {
    return <h5>Gặp lỗi: {baoLoi}</h5>;
  }

  return (
    <div className="row">
      {/* <div className="text-start mb-2">
        {hinhAnhDangChon && (
          <img
            src={`data:image/jpeg;base64,${hinhAnhDangChon.duLieuAnh}`}
            alt={hinhAnhDangChon.tenHinhAnh}
            style={{ width: "300px" }}
          />
        )}
      </div>
      <div
        className="d-flex"
        style={{
          gap: "10px",
          marginTop: "10px",
        }}
      ></div>
      <div className="row">
        {danhSachAnh.map((hinhAnh, index) => (
          <div className="col-auto" key={index}>
            <img
              onClick={() => chonAnh(hinhAnh)}
              src={`data:image/jpeg;base64,${hinhAnh.duLieuAnh}`}
              alt={hinhAnh.tenHinhAnh}
              style={{ width: "50px" }}
            />
          </div>
        ))}
      </div> */}
      <div className="col-12">
        <Carousel showArrows={true} showIndicators={true}>
          {danhSachAnh.map((hinhAnh, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${hinhAnh.duLieuAnh}`}
                alt={hinhAnh.tenHinhAnh}
                style={{ maxWidth: "250px" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HinhAnhSanPham;

import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import {
  lay1AnhCuaMotSach,
  layToanBoAnhCuaMotSach,
} from "../../../api/HinhanhAPI";
import Carousel from "./Carousel";
interface CarouselitemInterface {
  sach: SachModel;
}

const Carouselitem: React.FC<CarouselitemInterface> = (props) => {
  const maSach: number = props.sach.maSach;
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(() => {
    lay1AnhCuaMotSach(maSach)
      .then((hinhAnhData) => {
        setDanhSachAnh(hinhAnhData);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [maSach]); // Thêm [maSach] để tránh gọi API liên tục

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

  // console.log(danhSachAnh[0]);
  let duLieuAnh: string = "";
  // ✅ Đổi danhSachAnh[0] lên trước để kiểm tra xem nó có tồn tại không đã
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = "data:image/jpeg;base64," + danhSachAnh[0].duLieuAnh;
  }
  return (
    <div className="row align-items-center p-4">
      <div className="col-md-5 text-center">
        <img
          src={duLieuAnh}
          alt={props.sach.tenSach}
          className="img-fluid"
          style={{
            maxHeight: "300px",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="col-md-7">
        <h3>{props.sach.tenSach}</h3>
      </div>
    </div>
  );
};

export default Carouselitem;

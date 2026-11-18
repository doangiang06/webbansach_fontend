import React from "react";
import SachModel from "../models/SachModel";
import my_request from "../api/Request";

interface ketQuaInterface {
  ketQua: SachModel[];
  tongSoTrang: number;
  tongSoSach: number;
}

export async function laySach(duongDan: string): Promise<ketQuaInterface> {
  const ketQua: SachModel[] = [];

  try {
    // Gọi phương thức request
    const reponse = await my_request(duongDan);

    // 🛡️ Kiểm tra an toàn: Nếu response hoặc _embedded không có dữ liệu saches
    if (!reponse || !reponse._embedded || !reponse._embedded.saches) {
      return {
        ketQua: ketQua,
        tongSoTrang: 0,
        tongSoSach: 0,
      }; // Trả về mảng rỗng [] để không bị lỗi vòng lặp bên dưới
    }

    // Lấy ra json sach
    const responseData = reponse._embedded.saches;

    //lấy thông tin trang
    const tongSoTrang: number = reponse.page.totalPages;
    const tongSoSach: number = reponse.page.totalElements;

    for (const key in responseData) {
      ketQua.push({
        maSach: responseData[key].maSach,
        tenSach: responseData[key].tenSach,
        giaBan: responseData[key].giaBan,
        giaNiemYet: responseData[key].giaNiemYet,
        moTa: responseData[key].moTa,
        soLuong: responseData[key].soLuong,
        tenTacGia: responseData[key].tenTacGia,
        trungBinhXepHang: responseData[key].trungBinhXepHang,
      });
    }

    return {
      ketQua: ketQua,
      tongSoTrang: tongSoTrang,
      tongSoSach: tongSoSach,
    };
  } catch (error) {
    console.error("Lỗi khi tải danh sách sách:", error);

    return {
      ketQua: [],
      tongSoTrang: 0,
      tongSoSach: 0,
    };
  }
}

export async function layToanBoSach(
  trangHienTai: number,
): Promise<ketQuaInterface> {
  // Xác định endpoint
  const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;

  // xắp xếp sách theo thứ tự sách mới nhất->sách cũ
  return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<ketQuaInterface> {
  // Xác định endpoint
  const duongDan: string =
    "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";

  // xắp xếp sách theo thứ tự sách mới nhất->sách cũ và
  return laySach(duongDan);
}
export async function timKiemSach(
  tuKhoaTimKiem: string,
): Promise<ketQuaInterface> {
  // Xác định endpoint
  let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

  if (tuKhoaTimKiem != "") {
    duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`;
  }

  return laySach(duongDan);
}

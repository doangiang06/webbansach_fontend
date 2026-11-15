import React from "react";
import SachModel from "../models/SachModel";
import my_request from "../api/Request";

export async function layToanBoSach(): Promise<SachModel[]> {
  const ketQua: SachModel[] = [];

  try {
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach`;

    // Gọi phương thức request
    const reponse = await my_request(duongDan);

    // 🛡️ Kiểm tra an toàn: Nếu response hoặc _embedded không có dữ liệu saches
    if (!reponse || !reponse._embedded || !reponse._embedded.saches) {
      return ketQua; // Trả về mảng rỗng [] để không bị lỗi vòng lặp bên dưới
    }

    // Lấy ra json sach
    const responseData = reponse._embedded.saches;

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
  } catch (error) {
    console.error("Lỗi khi tải danh sách sách:", error);
  }

  return ketQua;
}

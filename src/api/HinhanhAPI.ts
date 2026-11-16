import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import my_request from "../api/Request";
async function layAnhCuaMotsach(duongDan: string): Promise<HinhAnhModel[]> {
  const ketQua: HinhAnhModel[] = [];
  // Xác định endpoint

  // Gọi phương thức request
  const reponse = await my_request(duongDan);

  // 🛡️ KIỂM TRA AN TOÀN: Nếu sách chưa có ảnh, _embedded hoặc hinhAnhs sẽ không tồn tại
  if (!reponse || !reponse._embedded || !reponse._embedded.hinhAnhs) {
    return ketQua; // Trả về mảng rỗng [] ngay lập tức
  }

  // Lấy ra danh sách hình ảnh
  const responseData = reponse._embedded.hinhAnhs;

  for (const key in responseData) {
    ketQua.push({
      maHinhAnh: responseData[key].maHinhAnh,
      tenHinhAnh: responseData[key].tenHinhAnh,
      laIcon: responseData[key].laIcon,
      duongDan: responseData[key].duongDan,
      duLieuAnh: responseData[key].duLieuAnh,
    });
  }

  return ketQua;
}
export async function layToanBoAnhCuaMotSach(
  maSach: number,
): Promise<HinhAnhModel[]> {
  const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
  return layAnhCuaMotsach(duongDan);
}
export async function lay1AnhCuaMotSach(
  maSach: number,
): Promise<HinhAnhModel[]> {
  const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
  return layAnhCuaMotsach(duongDan);
}

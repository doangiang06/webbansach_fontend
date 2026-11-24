import React from "react";

import my_request from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";
async function layDanhGiaCuaMotsach(duongDan: string): Promise<DanhGiaModel[]> {
  const ketQua: DanhGiaModel[] = [];
  // Xác định endpoint

  // Gọi phương thức request
  const reponse = await my_request(duongDan);
  console.log("Response gốc:", reponse);
  // 🛡️ KIỂM TRA AN TOÀN: Nếu sách chưa có ảnh, _embedded hoặc hinhAnhs sẽ không tồn tại
  if (!reponse || !reponse._embedded || !reponse._embedded.suDanhGias) {
    return ketQua; // Trả về mảng rỗng [] ngay lập tức
  }

  // Lấy ra danh sách hình ảnh

  const responseData = reponse._embedded.suDanhGias;

  console.log("responseData =", responseData);
  console.log("length =", responseData.length);

  for (const key in responseData) {
    console.log("item =", responseData[key]);
    ketQua.push({
      maDanhGia: responseData[key].maDanhGia,
      diemXepHang: responseData[key].diemXepHang,
      nhanXet: responseData[key].nhanXet,
    });
  }
  console.log("ketQua =", ketQua);

  return ketQua;
}
export async function layToanBoDanhGiaCuaMotSach(
  maSach: number,
): Promise<DanhGiaModel[]> {
  const duongDan: string = `http://localhost:8080/su-danh-gia/search/findBySach_MaSach?maSach=${maSach}`;
  console.log("Đường dẫn API:", duongDan);
  return layDanhGiaCuaMotsach(duongDan);
}
export async function lay1DanhGiaCuaMotSach(
  maSach: number,
): Promise<DanhGiaModel[]> {
  const duongDan: string = `http://localhost:8080/su-danh-gia/search/findBySach_MaSach?maSach=${maSach}&page=0&size=1`;
  return layDanhGiaCuaMotsach(duongDan);
}

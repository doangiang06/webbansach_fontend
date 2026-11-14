import React from "react";
import SachModel from "../models/SachModel";
async function request(duongDan: string) {
  const response = await fetch(duongDan);
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${duongDan}`);
  }
  return response.json();
}
export async function layToanBoSach(): Promise<SachModel[]> {
  const ketQua: SachModel[] = [];
  //xác địn endpoint
  const duongDan: string = `http://localhost:8080/sach`;
  //gọi phương thức request
  const reponse = await request(duongDan);
  //lấy ra json sach
  const responseData = reponse._embedded.saches;
  console.log(responseData[0]);
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

  return ketQua;
}

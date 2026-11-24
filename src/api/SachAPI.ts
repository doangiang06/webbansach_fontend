import React from "react";
import SachModel from "../models/SachModel";
import my_request from "../api/Request";
import { error } from "console";

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
      const item = responseData[key];
      const selfHref: string = item?._links?.self?.href || "";
      const idMatch = selfHref.match(/\/(\d+)$/);
      const maSach = item?.maSach ?? (idMatch ? Number(idMatch[1]) : undefined);

      ketQua.push({
        maSach: maSach,
        tenSach: item?.tenSach,
        giaBan: item?.giaBan,
        giaNiemYet: item?.giaNiemYet,
        moTa: item?.moTa,
        soLuong: item?.soLuong,
        tenTacGia: item?.tenTacGia,
        trungBinhXepHang: item?.trungBinhXepHang,
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
  maTheLoai: number,
): Promise<ketQuaInterface> {
  // Xác định endpoint
  let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

  if (tuKhoaTimKiem !== "" && maTheLoai == 0) {
    duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`;
  } else if (tuKhoaTimKiem === "" && maTheLoai > 0) {
    duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoai}`;
  } else if (tuKhoaTimKiem !== "" && maTheLoai > 0) {
    duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}`;
  }

  return laySach(duongDan);
}
export async function laySachTheoMaSach(
  maSach: number,
): Promise<SachModel | null> {
  const duongDan = `http://localhost:8080/sach/${maSach}`;

  let ketQua: SachModel;

  try {
    const response = await fetch(duongDan);
    if (!response.ok) {
      throw new Error("gặp lỗi trong quá trinhfgoij API lấy sách");
    }
    const sachData = await response.json();
    if (sachData) {
      return {
        maSach: sachData.maSach,
        tenSach: sachData.tenSach,
        giaBan: sachData.giaBan,
        giaNiemYet: sachData.giaNiemYet,
        moTa: sachData.moTa,
        soLuong: sachData.soLuong,
        tenTacGia: sachData.tenTacGia,
        trungBinhXepHang: sachData.trungBinhXepHang,
      };
    } else {
      throw new Error("sách khoog tồn tại");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

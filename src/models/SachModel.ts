class SachModel {
  maSach: number;
  tenSach?: String; //có thẻ bị null
  giaBan?: number;
  giaNiemYet?: number;
  moTa?: String;
  soLuong?: number;
  tenTacGia?: String;
  trungBinhXepHang?: number;
  constructor(
    maSach: number,
    tenSach?: string, //có thẻ bị null
    giaBan?: number,
    giaNiemYet?: number,
    moTa?: string,
    soLuong?: number,
    tenTacGia?: string,
    trungBinhXepHang?: number,
  ) {
    this.maSach = maSach;
    this.tenSach = tenSach;
    this.giaBan = giaBan;
    this.giaNiemYet = giaNiemYet;
    this.moTa = moTa;
    this.soLuong = soLuong;
    this.tenTacGia = tenTacGia;
    this.trungBinhXepHang = trungBinhXepHang;
  }
}

export default SachModel;

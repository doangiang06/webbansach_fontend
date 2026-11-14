class HinhAnhModel {
  maHinhAnh: number;
  tenHinhAnh?: string;
  laIcon?: boolean;
  duongDan?: string;
  duLIeuAnh?: string;
  constructor(
    maHinhAnh: number,
    tenHinhAnh: string,
    laIcon: boolean,
    duongDan: string,
    duLIeuAnh: string,
  ) {
    this.maHinhAnh = maHinhAnh;
    this.tenHinhAnh = tenHinhAnh;
    this.laIcon = laIcon;
    this.duongDan = duongDan;
    this.duLIeuAnh = duLIeuAnh;
  }
}
export default HinhAnhModel;

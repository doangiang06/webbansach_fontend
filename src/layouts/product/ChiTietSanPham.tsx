import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

const ChiTietSanPham: React.FC = () => {
  const { maSach } = useParams(); //lấy mã sách
  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) {
      maSachNumber = 0;
    }
  } catch (error) {
    maSachNumber = 0;
    console.error("Error", error);
  }
  return <div></div>;
};

export default ChiTietSanPham;

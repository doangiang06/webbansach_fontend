import React, { useEffect, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StarFill, Star } from "react-bootstrap-icons";
const SaoXepHang = (diem: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= diem) {
      stars.push(<StarFill className="text-warning" />);
    } else {
      stars.push(<Star className="text-secondary" />);
    }
  }

  return stars;
};
export default SaoXepHang;

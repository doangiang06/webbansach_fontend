import React from "react";
function Banner() {
  return (
    <div className="p-3 mb-4 bg-black">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
          <h2 className="display-5 fw-bold">
            Đọc sách là hộ chiếu <br />
            cho vô số cuộc phiêu lưu
          </h2>
          <p>Mary Pope Osborne</p>
          <button className="btn btn-primary btn-lg text-white float-end">
            khám phá sách tại giang.kma
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;

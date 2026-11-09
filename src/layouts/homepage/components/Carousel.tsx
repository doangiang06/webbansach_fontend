import React from "react";

function Carousel() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-dark"
      data-bs-ride="carousel"
    >
      {/* 1. Các nút chỉ số (Indicators) */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* 2. Khối chứa tất cả các Slide (Chỉ duy nhất 1 thẻ carousel-inner) */}
      <div className="carousel-inner">
        {/* Slide 1 - Duy nhất slide đầu tiên có class "active" */}
        <div className="carousel-item active">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src={require("./../../../images/books/1.jpg")}
                className="float-end"
                style={{ width: "150px" }}
                alt="Book 1"
              />
            </div>
            <div className="col-7">
              <h5>Đọc sách là hộ chiếu</h5>
              <p>Cho vô số cuộc phiêu lưu tuyệt vời nhất.</p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src={require("./../../../images/books/2.jpg")}
                className="float-end"
                style={{ width: "150px" }}
                alt="Book 2"
              />
            </div>
            <div className="col-7">
              <h5>Khám phá tri thức mới</h5>
              <p>Mỗi cuốn sách đại diện cho một thế giới riêng.</p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src={require("./../../../images/books/3.jpg")}
                className="float-end"
                style={{ width: "150px" }}
                alt="Book 3"
              />
            </div>
            <div className="col-7">
              <h5>Nâng tầm giá trị bản thân</h5>
              <p>Duy trì thói quen đọc sách mỗi ngày.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Nút Điều hướng Prev / Next */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;

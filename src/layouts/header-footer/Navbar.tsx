import React from "react";
function Navbar() {
  return (
    <nav>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
          <div className="contianer-fluid">
            <a className="navbar-brand" href="#">
              giangkma
            </a>
          </div>
          {/* nút nhấn khi sử dụng điện thoại */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportContent"
            aria-controls="navbarSupportContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportContent">
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thể loại sách
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Thể loại 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Thể loại 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Thể loại 3
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Quy định bán hàng
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Quy định 3
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {/* Biểu tượng giỏ hàng */}
            <ul className="navbar-nav me-1">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-shopping-cart"></i>
                </a>
              </li>
            </ul>

            {/* Biểu tượng đăng nhập */}
            <ul className="navbar-nav me-1">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* //thích nghi với nhiều giao diện */}
        </nav>
      </div>
      {/* <div className="bg-primary text-white p-3">BOOKSTORE PROJECT</div>

      <div className="container mt-5">
        <h1>Web bán sách</h1>

        <button className="btn btn-primary">Test Bootstrap</button>
      </div> */}
    </nav>
  );
}
export default Navbar;

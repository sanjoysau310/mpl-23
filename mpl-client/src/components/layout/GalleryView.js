// import React, { useEffect, useState } from "react";
// import axios from "axios";

export default function GalleryView() {
  // const [gallery, setGallery] = useState([]);

  // useEffect(() => {
  //   loadGallery();
  // }, []);

  // const loadGallery = async () => {
  //   const result = await axios.get("http://localhost:8080/galleryimages");
  //   setGallery(result.data);
  // };

  return (
    <div>
      <div>
        <div className="row mt-2">
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1fAQ5a0deZQQDkV-scl0ydZ2MjTiLSsPo"
              className="d-block w-100 img-fluid"
              alt="p1"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1gt3HiGYZVo3yTlaJ9PpJZ4YKrhUoz85T"
              className="d-block w-100 img-fluid"
              alt="p2"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1pWuz4EOhjmfklKQMm-Wj57bMmT6cAZKt"
              className="d-block w-100 img-fluid"
              alt="p3"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1teBsaDWJ1Xnr9xGBdyEvaPNrJiXB-Gmg"
              className="d-block w-100 img-fluid"
              alt="p4"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1SLW6LUtKzeATD8wkz2zqIf4h4ZqMrPwW"
              className="d-block w-100 img-fluid"
              alt="p5"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1gF9qE8-Lw9J-buOvNIcnBEany0qUngHV"
              className="d-block w-100 img-fluid"
              alt="p6"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1Wteu-0cxfZWxAOQLfQpNmzwoNb3y4KKF"
              className="d-block w-100 img-fluid"
              alt="p7"
            />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1HM510bonQ4CcNVk2XVi-Py28aQGHOEgr"
              className="d-block w-100 img-fluid"
              alt="p8"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 mb-1 g-2">
            <img
              src="https://drive.google.com/uc?export=view&id=1SRnaK01ZUcmMEZDN274QnV1c5F4zRovv"
              className="d-block w-100 img-fluid"
              alt="p9"
            />
          </div>
          {/* <div className="col-sm-3 mb-1 g-2">
            <img src="" className="d-block w-100 img-fluid" alt="p10" />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img src="" className="d-block w-100 img-fluid" alt="p11" />
          </div>
          <div className="col-sm-3 mb-1 g-2">
            <img src="" className="d-block w-100 img-fluid" alt="p12" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

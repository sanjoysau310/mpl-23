import React, { useState } from "react";
import CropEasy from "./CropEasy";

export default function Upload() {
  const [pImage, setpImage] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const handleChange = (e) => {
    setpImage(e.target.files[0]);
    setPhotoURL(URL.createObjectURL(pImage));
    setOpenCrop(true);
  };
  return (
    <div className="container">
      openCrop?(
      <div className="mt-2">
        <label htmlFor="pimage" className="form-label">
          Profile Image
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="form-control"
          id="pimage"
          name="pImage"
          onChange={handleChange}
          required
        />
      </div>
      ):(
      <CropEasy {...{ photoURL, setOpenCrop }} />)
    </div>
  );
}

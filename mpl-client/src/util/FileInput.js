import React, { useState } from "react";

function FileInput({ onImageSelected }) {
  const [pImage, setpImage] = useState("");
  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        //console.log(reader.result);
        onImageSelected(reader.result);
      };
      setpImage(event.target.files[0]);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        name="pImage"
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default FileInput;

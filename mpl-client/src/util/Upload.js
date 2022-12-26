import React, { useState } from "react";
import CropImage from "./CropImage";
import FileInput from "./FileInput";

function Upload({ setpImage }) {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg) => {
    //console.log(selectedImg);
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };
  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = () => {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURL = canvasEle.toDataURL("image/jpeg");
      //test
      // var base64str = dataURL.substr(23);
      // var decoded = atob(base64str);
      // console.log("Crop FileS " + decoded);
      //
      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");

      //change base64 to file
      base64ToFile(dataURL);
    };
  };

  const base64ToFile = (pImage) => {
    fetch(pImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "mpl2023", { type: "image/*" });
        //pass prop to registration
        setpImage(file);
      });
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="">
      {currentPage === "choose-img" ? (
        <FileInput setImage={setImage} onImageSelected={onImageSelected} />
      ) : currentPage === "crop-img" ? (
        <CropImage
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div className="">
          <button
            onClick={() => {
              setCurrentPage("choose-img");
              setImage("");
            }}
            className="d-inline btn btn-outline-primary mb-2 mx-2"
          >
            Choose other File again
          </button>
          <div className="d-inline">
            <img
              src={imgAfterCrop}
              className="cropped-img"
              width="160px"
              height="200px"
              alt="Player Profile Pic"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;

import React, { useState } from "react";
import Cropper from "react-easy-crop";

function CropImage({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 5);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="backdrop">
      <div className="crop-container">
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              width: "60%",
              height: "60%",
              backgroundColor: "#636b7b",
            },
          }}
        />
        <div className="controls">
          <div className="button-area">
            <button
              className="btn btn-outline-danger mx-3"
              onClick={onCropCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                onCropDone(croppedArea);
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropImage;

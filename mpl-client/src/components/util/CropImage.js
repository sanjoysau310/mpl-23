import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";

const CropImage = ({ classes }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className={classes.controls}>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  );
};

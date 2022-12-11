// import React, { useState } from "react";
// import Cropper from "react-easy-crop";
// import { useAuth } from "../../context/AuthContext";
// import getCroppedImg from "./utils/cropImage";

// const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
//   const { setAlert, setLoading } = useAuth();
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const cropComplete = (croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const cropImage = async () => {
//     setLoading(true);
//     try {
//       const { file, url } = await getCroppedImg(
//         photoURL,
//         croppedAreaPixels,
//         rotation
//       );
//       setPhotoURL(url);
//       setFile(file);
//       setOpenCrop(false);
//     } catch (error) {
//       setAlert({
//         isAlert: true,
//         severity: "error",
//         message: error.message,
//         timeout: 5000,
//         location: "modal",
//       });
//       console.log(error);
//     }

//     setLoading(false);
//   };
//   return (
//     <>
//       <DialogContent
//         dividers
//         sx={{
//           background: "#333",
//           position: "relative",
//           height: 400,
//           width: "auto",
//           minWidth: { sm: 500 },
//         }}
//       >
//         <Cropper
//           image={photoURL}
//           crop={crop}
//           zoom={zoom}
//           rotation={rotation}
//           aspect={1}
//           onZoomChange={setZoom}
//           onRotationChange={setRotation}
//           onCropChange={setCrop}
//           onCropComplete={cropComplete}
//         />
//       </DialogContent>
//       <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>

//           <Button
//             variant="outlined"
//             startIcon={<Cancel />}
//             onClick={() => setOpenCrop(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<CropIcon />}
//             onClick={cropImage}
//           >
//             Crop
//           </Button>
//         </Box>
//       </DialogActions>
//     </>
//   );
// };

// export default CropEasy;

// const zoomPercent = (value) => {
//   return `${Math.round(value * 100)}%`;
// };

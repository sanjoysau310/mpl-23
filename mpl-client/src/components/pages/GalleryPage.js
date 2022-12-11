import React from "react";
import GalleryCarousel from "../layout/GalleryCarousel";
import GalleryView from "../layout/GalleryView";

export default function GalleryPage() {
  return (
    <div className="container p-5">
      <h1 className="text-center p-5">Gallery</h1>
      <div className="row justify-content-center">
        <div className="col-sm-9 mb-2">
          <GalleryCarousel />
        </div>
      </div>
      <div>
        <GalleryView />
      </div>
    </div>
  );
}

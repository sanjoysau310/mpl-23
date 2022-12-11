import React from "react";

export default function GalleryCarousel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="2000">
          <img
            src="https://drive.google.com/uc?export=view&id=1Z4RtEhLZu-nuyqVjKqyt2fkmo2FnTse5"
            className="d-block w-100 img-fluid"
            alt="c1"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://drive.google.com/uc?export=view&id=1FbWdCrP66XFJylDgYHcmWVymrHVTeTCh"
            className="d-block w-100 img-fluid"
            alt="c2"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://drive.google.com/uc?export=view&id=1VUHcqTMIDPefbntDTENIJIFsaMaAl6E7"
            className="d-block w-100 img-fluid"
            alt="c3"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

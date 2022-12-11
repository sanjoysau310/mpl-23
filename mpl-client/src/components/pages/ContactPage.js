import React from "react";

export default function ContactPage() {
  return (
    <div className="container p-5">
      <div className="mt-5">
        <h1 className="h1-responsive font-weight-bold text-center mt-5">
          Contact us
        </h1>
        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>
        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-3">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="md-form mb-3">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-3">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-5">
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      className="form-control md-textarea"
                      placeholder="Type you concern here...."
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="text-center text-md-left">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
            <div className="status" />
          </div>
          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="https://goo.gl/maps/EF42HDYenoQnzdiTA"
                  className="text-info"
                >
                  <i className="fas fa-map-marker-alt fa-2x" />
                </a>
                <p>Katjunagar Play Ground, Jadavpur, Kolkata</p>
              </li>
              <li>
                <a href="tel:+916289674153" className="text-info">
                  <i className="fas fa-phone mt-4 fa-2x" />
                </a>
                <p>Call us for more details</p>
              </li>
              <li>
                <a
                  href="mailto:musketeerspremierleague@gmail.com"
                  className="text-info"
                >
                  <i className="fas fa-envelope mt-4 fa-2x" />
                </a>
                <p>musketeerspremierleague@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

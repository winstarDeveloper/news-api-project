import React from "react";

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="copywrite-area">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6">
              <p className="copywrite-text">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script> All
                rights reserved | This template is made with{" "}
                <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                <a
                  href="https://colorlib.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Colorlib
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

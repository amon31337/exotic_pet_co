import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto text-center">
      <div className="container">
        <p className="mb-1">© 2025 ExoticPetOo, Inc. All rights reserved.</p>
        <p className="small mb-0">
          <a href="/about" className="text-decoration-none text-light me-3">About Us</a>
          <a href="/contactUs" className="text-decoration-none text-light me-3">Contact Us</a>
          <a href="/legal" className="text-decoration-none text-light">Legal</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

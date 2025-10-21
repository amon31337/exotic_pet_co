import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto text-center">
      <div className="container">
        <p className="mb-1">© 2025 ExoticPetCo, Inc. All rights reserved.</p>
        <p className="small mb-0">
          <a href="/purchase" className="text-decoration-none text-light me-3">Browse Collection</a>
          <a href="/about" className="text-decoration-none text-light me-3">About Us</a>
          <a href="/legal" className="text-decoration-none text-light me-3">Legal</a>
          <a href="/contactUs" className="text-decoration-none text-light">Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(/images/exotic_wallpaper.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* overlay for better text readability */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}
      ></div>
      
      {/* main content */}
      <div className="container text-center text-white" style={{ zIndex: 2, position: 'relative' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-1 fw-bold mb-4 text-shadow">
              Exotic Pet Co.
            </h1>
            <p className="lead fs-3 mb-4 text-shadow">
              Your Gateway to Extraordinary Companions
            </p>
            <p className="fs-5 mb-5 text-shadow">
              Discover the world's most unique and fascinating exotic pets
            </p>
             <div className="d-flex justify-content-center gap-3 flex-wrap">
               <Link to="/purchase" className="btn btn-primary btn-lg px-4 py-3 text-decoration-none">
                 Explore Our Collection
               </Link>
               <Link 
                 to="/about" 
                 className="btn btn-lg px-4 py-3 learn-more-btn text-decoration-none" 
                 style={{ 
                   backgroundColor: '#6c757d', 
                   borderColor: '#6c757d', 
                   color: 'white' 
                 }}
               >
                 Learn More
               </Link>
             </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        .learn-more-btn:hover {
          background-color: #5a6268 !important;
          border-color: #5a6268 !important;
        }
      `}</style>
    </div>
  );
};

export default Home;

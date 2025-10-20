import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">

      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">About Exotic Pet Co.</h1>
          <p className="lead">
            Exotic Pet Co. combines expert veterinary care, responsible sourcing, 
            and innovative technology to deliver healthy, ethically-raised exotic 
            pets. Our strategy focuses on sustainable growth, exceptional customer 
            experiences, and ongoing education to promote responsible pet ownership.
          </p>
          <p className="lead">
            We strive to be the leading trusted source for rare and exotic pets, setting the 
            standard for animal welfare, sustainability, and owner education worldwide.
          </p>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
           <h2 className="display-5 mb-1">Meet the Team</h2>
        </div>
      </div>

      <div className="row align-items-center justify-content-center mb-4">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="images/Ronald.jpg"
            className="img-fluid rounded shadow"
            style={{ width: "325px" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="display-5 mb-4">Ronald - CEO</h2>
          <p className="lead">
            Ronald is the visionary behind Exotic Pet Co., leading the company with a 
            deep commitment to ethical animal care and sustainable sourcing. With years 
            of experience in the exotic pet industry, he ensures every business decision 
            aligns with the company’s mission to connect people and rare species responsibly.
          </p>
        </div>
      </div>

      <div className="row align-items-center justify-content-center mb-4">
        <div className="col-md-6">
          <h2 className="display-5 mb-4">Jackson - CTO</h2>
          <p className="lead">
             Jackson is the driving force behind the technology that powers Exotic Pet Co.’s
             operations. From advanced tracking systems to digital adoption platforms, he 
             builds the tools that make responsible exotic pet ownership easier and safer 
             for everyone. His innovative mindset keeps the company at the cutting edge of 
             animal care technology.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="images/Jackson.jpg"
            className="img-fluid rounded shadow"
            style={{ width: "325px" }}
          />
        </div>
      </div>

      <div className="row align-items-center justify-content-center mb-4">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="images/Benton.png"
            className="img-fluid rounded shadow"
            style={{ width: "325px" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="display-5 mb-4">Benton - CMO</h2>
          <p className="lead">
            Benton brings the stories of our animals and caretakers to life. With a 
            background in wildlife conservation marketing, he ensures that every 
            campaign reflects compassion, education, and respect for nature. His creative 
            approach has helped Exotic Pet Co. reach new audiences while inspiring 
            awareness about responsible pet stewardship.
          </p>
        </div>
      </div>

      <div className="row align-items-center justify-content-center mb-4">
        <div className="col-md-6">
          <h2 className="display-5 mb-4">Christian - Head Veterinarian</h2>
          <p className="lead">
            Christian leads the veterinary team with unparalleled dedication and 
            expertise in exotic animal health. From reptiles to rare mammals, his 
            compassionate care ensures each animal thrives before and after finding 
            a new home. He’s passionate about educating pet owners on proper care 
            and creating long, healthy lives for every creature under Exotic Pet Co.’s roof.
          </p>
        </div>

        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="images/Christian.jpg"
            className="img-fluid rounded shadow"
            style={{ width: "325px", height: "500px" }}
          />
        </div>
      </div>

    </div>
  );
};

export default About;
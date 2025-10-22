import React from 'react';

const Legal = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="display-4 mb-4 text-center">Legal Information</h1>
          
          {/* Company Commitment */}
          <div className="card mb-5">
            <div className="card-body">
              <h3 className="card-title text-primary mb-3">Our Commitment to Animal Welfare</h3>
              <p className="card-text lead">
                At Exotic Pet Co., we are deeply committed to the safe, responsible, and humane handling of all animals in our care. 
                We believe that exotic pets deserve the highest standards of care, respect, and protection. Our team consists of 
                certified animal care specialists and veterinarians who ensure that every animal receives proper nutrition, medical 
                attention, and enrichment activities that support their natural behaviors. We maintain strict protocols for animal 
                welfare, including regular health checkups, appropriate housing that mimics their natural habitats, and ongoing 
                education for our staff. We are proud to partner with reputable breeders and rescue organizations who share our 
                values, and we are committed to transparency in all our practices. Our ultimate goal is to ensure that every 
                animal finds a loving, knowledgeable home where they can thrive for their entire lives.
              </p>
            </div>
          </div>

          {/* Combined Legal Document */}
          <div className="card">
            <div className="card-body" id="agreement-content">
              <h3 className="card-title text-primary mb-4">Customer Agreement</h3>
              
              <div className="alert alert-warning mb-4">
                <strong>IMPORTANT:</strong> By accessing our website, purchasing animals, or using our services, you agree to be bound by all terms and conditions outlined in this comprehensive legal document. Please read carefully.
              </div>

              <h5 className="mt-4">1. Terms of Service</h5>
              <p>
                By accessing and using Exotic Pet Co.'s website and services, you agree to be bound by these Terms of Service. 
                We reserve the right to modify these terms at any time, and continued use of our services constitutes acceptance 
                of any changes.
              </p>
              <ul>
                <li>All sales are final unless otherwise specified in writing</li>
                <li>Customers must be 18 years or older to purchase animals</li>
                <li>We reserve the right to refuse service to anyone</li>
                <li>All animals are sold "as is" with health guarantees as specified in individual purchase agreements</li>
                <li>Customers are responsible for compliance with all applicable laws and regulations</li>
              </ul>

              <h5 className="mt-4">2. Privacy Policy</h5>
              <p>
                Exotic Pet Co. is committed to protecting your privacy and personal information. This policy outlines how we 
                collect, use, and safeguard your data.
              </p>
              <ul>
                <li><strong>Information Collection:</strong> We collect personal information necessary for animal sales, including name, address, phone number, email, and payment information</li>
                <li><strong>Information Use:</strong> Your information is used to process orders, provide customer service, conduct welfare checks, and comply with legal requirements</li>
                <li><strong>Information Sharing:</strong> We do not sell or share your personal information with third parties except as required by law or for animal welfare purposes</li>
                <li><strong>Data Security:</strong> We implement appropriate security measures to protect your personal information</li>
                <li><strong>Your Rights:</strong> You may request access to, correction of, or deletion of your personal information at any time</li>
              </ul>

              <h5 className="mt-4">3. Animal Care Agreement</h5>
              <p className="text-danger">
                <strong>CRITICAL:</strong> This section must be accepted before any animal purchase is completed. By purchasing an animal from Exotic Pet Co., you agree to the following terms and conditions:
              </p>

              <h6 className="mt-3">3.1 Animal Welfare and Care Standards</h6>
              <p>
                You agree to provide humane, respectful, and safe treatment of your purchased animal at all times. 
                This includes but is not limited to:
              </p>
              <ul>
                <li>Providing appropriate nutrition and clean water daily</li>
                <li>Maintaining proper temperature, humidity, and lighting conditions specific to the species</li>
                <li>Ensuring adequate space and enrichment activities that support natural behaviors</li>
                <li>Providing regular veterinary care from qualified exotic animal veterinarians</li>
                <li>Never subjecting the animal to abuse, neglect, or harmful conditions</li>
              </ul>

              <h6 className="mt-3">3.2 Habitat and Environmental Requirements</h6>
              <p>
                You must maintain an environment conducive to the animal's natural habitat and behavioral needs:
              </p>
              <ul>
                <li>Enclosure size must meet or exceed minimum space requirements for the species</li>
                <li>Environmental conditions (temperature, humidity, lighting) must be species-appropriate</li>
                <li>Substrate, furnishings, and hiding places must be safe and species-appropriate</li>
                <li>Regular cleaning and sanitization of the animal's living space</li>
                <li>Protection from predators, extreme weather, and other environmental hazards</li>
              </ul>

              <h6 className="mt-3">3.3 Inspection and Monitoring Rights</h6>
              <p>
                Exotic Pet Co. reserves the right to conduct random, unannounced inspections of your animal's living conditions 
                and overall welfare. These inspections may include:
              </p>
              <ul>
                <li>Visual assessment of the animal's health and living conditions</li>
                <li>Review of veterinary records and care documentation</li>
                <li>Inspection of enclosure setup and environmental parameters</li>
                <li>Interview with household members about care practices</li>
              </ul>

              <h6 className="mt-3">3.4 Animal Reclamation Rights</h6>
              <p>
                Exotic Pet Co. reserves the right to immediately reclaim any animal if:
              </p>
              <ul>
                <li>There are credible reports of abuse, neglect, or mistreatment</li>
                <li>Inspection reveals inadequate care or unsafe living conditions</li>
                <li>The animal's health is at risk due to improper care</li>
                <li>You fail to comply with the terms of this agreement</li>
                <li>You are unable to provide proper care due to changed circumstances</li>
              </ul>
              <p>
                In such cases, you agree to surrender the animal immediately without compensation and may be subject to 
                legal action for breach of contract.
              </p>

              <h6 className="mt-3">3.5 Legal Compliance</h6>
              <p>
                You are responsible for ensuring compliance with all local, state, and federal laws regarding exotic pet 
                ownership, including permits, licenses, and registration requirements.
              </p>

              <h5 className="mt-4">4. Animal Welfare Disclaimers</h5>
              <p>
                Exotic Pet Co. operates under strict ethical guidelines and legal requirements:
              </p>
              <ul>
                <li>All animals are sourced from reputable, licensed breeders and rescue organizations</li>
                <li>We maintain detailed records of all animal transactions and care history</li>
                <li>Our facility is regularly inspected by appropriate authorities</li>
                <li>We provide ongoing support and education to customers regarding proper animal care</li>
                <li>We maintain relationships with qualified veterinarians specializing in exotic species</li>
              </ul>

              <h5 className="mt-4">5. Liability and Risk Disclaimers</h5>
              <p>
                Exotic animals can pose unique risks and challenges. By purchasing from Exotic Pet Co., you acknowledge and accept:
              </p>
              <ul>
                <li>Exotic animals may carry zoonotic diseases and require special handling precautions</li>
                <li>Some species may be dangerous and require experienced handlers</li>
                <li>Exotic pets may have specific dietary, environmental, and behavioral requirements</li>
                <li>Ownership of certain species may be restricted or prohibited in your area</li>
                <li>Exotic Pet Co. is not liable for injuries, damages, or legal issues arising from animal ownership</li>
              </ul>

              <div className="alert alert-success mt-4">
                <strong>Agreement Acceptance:</strong> By purchasing an animal from Exotic Pet Co., you acknowledge that you have read, understood, 
                and agree to be bound by all terms and conditions outlined in this comprehensive legal document.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Legal

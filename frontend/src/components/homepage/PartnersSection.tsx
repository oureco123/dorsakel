"use client";
import React from 'react';

const PartnersSection = () => {
  const partners = [
    "Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5", 
    "Partner 6", "Partner 7", "Partner 8", "Partner 9", "Partner 10"
  ];

  return (
    <section className="py-12" style={{ backgroundColor: 'rgb(3, 4, 94)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-white text-lg font-medium">Trusted by Leading Dental Institutions</h3>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-medium text-sm border border-white/20"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
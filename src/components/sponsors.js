// src/components/Sponsors.js
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const SponsorImages = ({ sponsorImages = [] }) => {
  return (
    <div className="sponsorImage"
    >
      {sponsorImages.map((src, index) => (
        <Image
          key={index}
          src={src}
          width={120}
          height={120}
          alt={`Sponsor ${index}`}
        />
      ))}
    </div>
  );
};

// Dynamically import SponsorImages with client-side rendering only
const DynamicSponsorImages = dynamic(() => Promise.resolve(SponsorImages), {
  ssr: false,
});

const Sponsors = ({
  sponsorImages = [
    "/sponsor10.jpg",
    "/sponsor2.jpg",
    "/sponsor11.png",
    "/sponsor4.jpg",
    "/sponsor5.jpg",
    "/sponsor6.jpg",
    "/sponsor7.jpg",
    "/sponsor8.jpg",
  ],
}) => {
  return (
    <div>
      <DynamicSponsorImages sponsorImages={sponsorImages} />
    </div>
  );
};

export default Sponsors;

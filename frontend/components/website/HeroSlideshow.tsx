'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=85',
    alt: 'Technician working on electronics repair',
  },
  {
    src: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=85',
    alt: 'Smart LED TV screen calibration',
  },
  {
    src: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&q=85',
    alt: 'Premium speakers and audio systems',
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
    alt: 'Home theater surround sound installation',
  },
];

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}

import React from 'react'
import Image from 'next/image'

export default function GallerySection() {
  const images = ['/fashion1.avif', '/fashion2.avif', '/fashion3.avif']

  return (
    <section id="gallery" className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Galerie Fashion Center
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div key={idx} className="relative h-48 w-full">
            <Image
              src={src}
              alt={`Showroom Fashion Center ${idx + 1}`}
              fill
              className="rounded-lg shadow-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

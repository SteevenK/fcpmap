'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function GallerySection() {
  const images = ['/fashion1.avif', '/fashion2.avif', '/fashion3.avif']

  return (
    <section id="gallery" className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 border-l-4 border-indigo-500 pl-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        Galerie Fashion Center
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative h-64 w-full group overflow-hidden rounded-xl border border-gray-800"
          >
            <Image
              src={src}
              alt={`Showroom Fashion Center ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

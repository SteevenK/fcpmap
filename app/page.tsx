import React from 'react'
import NavBar from '@/app/components/NavBar'
import HeroSection from '@/app/components/HeroSection'
import GallerySection from '@/app/components/GallerySection'
import InfoSection from '@/app/components/InfoSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <NavBar />
      <HeroSection />
      <GallerySection />
      <InfoSection />
      <Footer />
    </div>
  )
}

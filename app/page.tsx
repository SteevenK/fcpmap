import React from 'react'
import Image from 'next/image'
import {
  MdMap,
  MdArrowForwardIos,
  MdLocationOn,
  MdAccessTime,
} from 'react-icons/md'

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span className="flex items-center text-2xl font-bold text-indigo-600">
            <MdMap className="mr-2 w-6 h-6" />
            Fashion Map
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="accueil"
        className="container mx-auto px-6 py-24 text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Explorez Fashion Center
        </h1>
        <p className="text-xl sm:text-2xl mb-10 text-gray-600">
          Fashion Center est le plus grand centre commercial de vente en gros
          d’Europe.
        </p>
        <a
          href="/floor1"
          className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500
                     hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl
                     shadow-lg font-semibold transition-transform transform hover:scale-105"
        >
          Accéder à la carte interactive
          <MdArrowForwardIos className="ml-2 w-5 h-5" />
        </a>
      </section>

      {/* Galerie Section */}
      <section id="gallery" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Galerie Fashion Center
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['/fashion1.avif', '/fashion2.avif', '/fashion3.avif'].map(
            (src, idx) => (
              <div key={idx} className="relative h-48 w-full">
                <Image
                  src={src}
                  alt={`Showroom Fashion Center ${idx + 1}`}
                  fill
                  className="rounded-lg shadow-2xl"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* Adresse et Horaires */}
      <section id="informations" className="container mx-auto px-6 py-20">
        <div className="mt-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <MdLocationOn className="w-6 h-6 text-indigo-600" />
            <h3 className="text-2xl font-bold">Adresse</h3>
          </div>
          <p>70 avenue Victor Hugo, 93300 Aubervilliers, France</p>

          <div className="flex items-center justify-center space-x-2 mt-6">
            <MdAccessTime className="w-6 h-6 text-indigo-600" />
            <h3 className="text-2xl font-bold">Horaires</h3>
          </div>
          <p>Lundi – Vendredi : 9h00 – 19h00</p>
          <p>Samedi : 14h00 – 19h00</p>
          <p>Dimanche : Fermé</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-12 mt-auto">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">À propos</h3>
            <p>
              Fashion Center est le plus grand centre commercial de vente en
              gros d’Europe.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Adresse</h3>
            <p>70 avenue Victor Hugo, 93300 Aubervilliers</p>
            <p>France</p>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          <p>© 2025 FashionCenterParis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

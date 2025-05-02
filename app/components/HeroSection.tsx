// components/HeroSection.jsx
import { MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="accueil" className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
        Explorez Fashion Center
      </h1>
      <p className="text-xl sm:text-2xl mb-10 text-gray-600">
        Fashion Center est le plus grand centre commercial de vente en gros
        d’Europe.
      </p>
      <Link href="/floor1" passHref>
        <span
          className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500
                      hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl
                      shadow-lg font-semibold transition-transform transform hover:scale-105"
        >
          Accéder à la carte interactive
          <MdArrowForwardIos className="ml-2 w-5 h-5" />
        </span>
      </Link>
    </section>
  )
}

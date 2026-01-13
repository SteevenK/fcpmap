'use client'
import { MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section id="accueil" className="relative container mx-auto px-6 py-32 text-center flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
          Explorez <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Fashion Center</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Le plus grand centre commercial de vente en gros d’Europe, repensé pour vous.
        </p>

        <Link href="/floor1" passHref>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-full
                       shadow-xl shadow-indigo-500/30 font-semibold cursor-pointer border border-indigo-500/50 backdrop-blur-sm"
          >
            Accéder à la carte
            <MdArrowForwardIos className="ml-2 w-5 h-5" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  )
}

'use client'
import { MdMap } from 'react-icons/md'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="flex items-center text-2xl font-bold tracking-widest uppercase">
          <MdMap className="mr-2 w-6 h-6 text-indigo-400" />
          <Link href={'/'} className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all"> Fashion Map </Link>
        </span>
      </div>
    </motion.nav>
  )
}

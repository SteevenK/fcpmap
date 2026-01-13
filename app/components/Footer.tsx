import React from 'react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-indigo-500/20 glass text-gray-300 py-16 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-bold mb-4 tracking-wide uppercase bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Fashion Center</h3>
          <p className="text-sm leading-relaxed max-w-sm text-gray-400">
            Le plus grand centre commercial de vente en gros d’Europe.
            Une destination unique pour les professionnels de la mode.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 tracking-wide uppercase bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Contact</h3>
          <p className="text-sm text-gray-400">70 avenue Victor Hugo, 93300 Aubervilliers</p>
          <p className="text-sm text-gray-400">France</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        <p>© 2025 FashionCenterParis. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

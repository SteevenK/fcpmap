import React from 'react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">À propos</h3>
          <p>
            Fashion Center est le plus grand centre commercial de vente en gros
            d’Europe.
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
  )
}

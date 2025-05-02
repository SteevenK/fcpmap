import React from 'react'
import { MdLocationOn, MdAccessTime } from 'react-icons/md'

export default function InfoSection() {
  return (
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
  )
}

'use client'
import React from 'react'
import { MdLocationOn, MdAccessTime } from 'react-icons/md'
import { motion } from 'framer-motion'

export default function InfoSection() {
  return (
    <section id="informations" className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-colors"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-full">
              <MdLocationOn className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Adresse</h3>
          </div>
          <p className="text-gray-400 text-lg ml-14">70 avenue Victor Hugo,<br /> 93300 Aubervilliers, France</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-colors"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-full">
              <MdAccessTime className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Horaires</h3>
          </div>
          <div className="space-y-2 text-gray-400 ml-14">
            <p><span className="text-white font-medium">Lundi – Vendredi :</span> 9h00 – 19h00</p>
            <p><span className="text-white font-medium">Samedi :</span> 14h00 – 19h00</p>
            <p><span className="text-red-400">Dimanche : Fermé</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

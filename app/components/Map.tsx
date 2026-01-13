'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import ModernModal from './Modal'
import StorePolygon from './StorePolygon'
import {
  StoreType,
  stores0to20,
  stores21to40,
  stores41to60,
  stores61to80,
  stores81to100,
} from '@/app/components/stores'
import { getPolygonCenter } from '@/utils/getPolygonCenter'
import { CopyableField } from '@/app/components/CopyableField'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MdZoomIn, MdZoomOut } from 'react-icons/md'
import FloorSwitcher from './FloorSwitcher'


interface MapProps {
  imageSrc?: string
  stores?: StoreType[]
}

const Map: React.FC<MapProps> = ({
  imageSrc = '/FashionEtage1.png',
  stores = [
    ...stores0to20,
    ...stores21to40,
    ...stores41to60,
    ...stores61to80,
    ...stores81to100,
  ]
}) => {
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null)
  const [hoveredStore, setHoveredStore] = useState<StoreType | null>(null)
  const [scale, setScale] = useState(0.8)

  // Ref for the SVG container
  const containerRef = useRef<HTMLDivElement>(null)

  const svgWidth = 800
  const svgHeight = 1200

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.4))

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex flex-col items-center justify-center">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-40">
        <FloorSwitcher />
      </div>

      <div className="absolute top-4 right-4 z-30 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
        >
          <MdZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
        >
          <MdZoomOut className="w-6 h-6" />
        </button>
      </div>

      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{ left: -svgWidth, right: svgWidth, top: -svgHeight, bottom: svgHeight }}
        dragElastic={0.1}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="cursor-move"
      >
        <div className="relative" style={{ width: svgWidth, height: svgHeight }}>
          <Image
            src={imageSrc}
            alt="Fashion Center Map"
            width={svgWidth}
            height={svgHeight}
            style={{ objectFit: 'contain' }}
            draggable={false}
          />

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* Stores */}
            {stores.map((store) => (
              <StorePolygon
                key={store.id}
                store={store}
                onMouseEnter={(s) => setHoveredStore(s)}
                onMouseLeave={() => setHoveredStore(null)}
                onClick={setSelectedStore}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Hover Tooltip - Floating fixed at bottom or following mouse (simplified to fixed for performance) */}
      {hoveredStore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/10 z-30 pointer-events-none"
        >
          <span className="font-bold text-lg">{hoveredStore.name}</span>
        </motion.div>
      )}

      {selectedStore && (
        <ModernModal
          isOpen={true}
          onClose={() => setSelectedStore(null)}
          title={selectedStore.name}
        >
          {selectedStore.lot && (
            <div className="py-1">
              <span className="font-bold font-mono text-indigo-400">Lot</span> : {selectedStore.lot}
            </div>
          )}
          {selectedStore.tel && (
            <CopyableField label="Tél" value={selectedStore.tel} />
          )}
          {selectedStore.fax && (
            <CopyableField label="Fax" value={selectedStore.fax} />
          )}
          {selectedStore.whatsapp && (
            <CopyableField label="Whatsapp" value={selectedStore.whatsapp} />
          )}
          {selectedStore.email && (
            <CopyableField label="Email" value={selectedStore.email} />
          )}
          {selectedStore.microStore && (
            <CopyableField
              label="MicroStore"
              value={selectedStore.microStore}
            />
          )}
          {selectedStore.website && (
            <div className="py-1">
              <span className="font-bold font-mono text-indigo-400">Site web</span> :{' '}
              <Link
                href={selectedStore.website}
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                {selectedStore.website}
              </Link>
            </div>
          )}
          {selectedStore.description && (
            <p className="py-1 mt-2 text-gray-300">
              {selectedStore.description}
            </p>
          )}
        </ModernModal>
      )}
    </div>
  )
}

export default Map

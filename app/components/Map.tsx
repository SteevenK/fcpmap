'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import ModernModal from './Modal'
import StorePolygon from './StorePolygon'
import {
  StoreType,
  stores0to25,
  stores26to50,
  stores51to75,
  stores76to100,
} from '@/app/components/stores'
import { getPolygonCenter } from '@/utils/getPolygonCenter'
import { CopyableField } from '@/app/components/CopyableField'

const Map: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null)
  const [hoveredStore, setHoveredStore] = useState<StoreType | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const svgWidth = 800
  const svgHeight = 1200
  const stores: StoreType[] = [
    ...stores0to25,
    ...stores26to50,
    ...stores51to75,
    ...stores76to100,
  ]

  const handleMouseEnter = (store: StoreType) => {
    setHoveredStore(store)
    const center = getPolygonCenter(store.points)
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      const scale = rect.width / svgWidth
      setTooltipPos({
        x: rect.left + center.x * scale,
        y: rect.top + center.y * scale,
      })
    }
  }

  const handleMouseLeave = () => {
    setHoveredStore(null)
  }

  return (
    <div className="text-gray-800 min-h-screen flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-4">
        Carte interactive de FashionCenter
      </h1>

      <div className="relative w-[full] max-w-[1000px]">
        <Image
          src="/FashionEtage1.png"
          alt="Fashion Etage 1"
          width={svgWidth}
          height={svgHeight}
          style={{ objectFit: 'cover' }}
        />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="absolute top-0 left-0"
        >
          {/* Stores */}
          {stores.map((store) => (
            <StorePolygon
              key={store.id}
              store={store}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={setSelectedStore}
            />
          ))}
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredStore && (
        <div
          className="fixed bg-gray-800 text-white text-xs px-2 py-1 rounded-sm pointer-events-none"
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        >
          {hoveredStore.name}
        </div>
      )}

      {selectedStore && (
        <ModernModal
          isOpen={true}
          onClose={() => setSelectedStore(null)}
          title={selectedStore.name}
        >
          {selectedStore.lot && (
            <p className="py-1">
              <span className="font-bold">Lot</span> : {selectedStore.lot}
            </p>
          )}
          {selectedStore.tel && (
            <p>
              <CopyableField label="Tél" value={selectedStore.tel} />
            </p>
          )}
          {selectedStore.fax && (
            <p>
              <CopyableField label="Fax" value={selectedStore.fax} />
            </p>
          )}
          {selectedStore.email && (
            <CopyableField label="Email" value={selectedStore.email} />
          )}
          {selectedStore.microStore && (
            <p>
              <CopyableField
                label="MicroStore"
                value={selectedStore.microStore}
              />
            </p>
          )}
          {selectedStore.description && (
            <p className="py-1">
              <span className="font-bold">Type</span> :{' '}
              {selectedStore.description}
            </p>
          )}
        </ModernModal>
      )}
    </div>
  )
}

export default Map

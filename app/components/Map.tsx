'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ModernModal from './Modal'
import StorePolygon from './StorePolygon'
import { Store, stores } from '@/app/components/stores'
import { getPolygonCenter } from '@/utils/getPolygonCenter'

const Map: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [hoveredStore, setHoveredStore] = useState<Store | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  // Mode de sélection et points cliqués
  const [selectionMode, setSelectionMode] = useState(false)
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])

  // Dimensions et espacement
  const svgWidth = 800
  const svgHeight = 1200
  const gridSpacing = 5

  const handleMouseEnter = (store: Store) => {
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

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = svgWidth / rect.width
    const scaleY = svgHeight / rect.height
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    if (selectionMode) {
      setPoints((prev) => [...prev, { x, y }])
    } else {
      console.log(`Coordonnées cliquées : ${x},${y}`)
    }
  }

  // Dès que points atteint 4, on log et on vide
  useEffect(() => {
    if (points.length === 4) {
      const formatted = points.map((p) => `${p.x},${p.y}`).join(' ')
      console.log(formatted)
      setPoints([])
    }
  }, [points])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {/* Toggle mode sélection */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectionMode}
            onChange={(e) => {
              setSelectionMode(e.target.checked)
              setPoints([])
            }}
          />
          <span>Mode sélection des points (4 par 4)</span>
        </label>
      </div>

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
          onClick={handleClick}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="absolute top-0 left-0"
        >
          {/* Quadrillage vertical */}
          {Array.from({ length: Math.floor(svgWidth / gridSpacing) + 1 }).map(
            (_, i) => {
              const x = i * gridSpacing
              const isMajor = x % 25 === 0
              return (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={svgHeight}
                  stroke={isMajor ? 'green' : 'lightgray'}
                  strokeWidth={isMajor ? 0.75 : 0.25}
                />
              )
            }
          )}
          {/* Quadrillage horizontal */}
          {Array.from({ length: Math.floor(svgHeight / gridSpacing) + 1 }).map(
            (_, i) => {
              const y = i * gridSpacing
              const isMajor = y % 25 === 0
              return (
                <line
                  key={`h-${y}`}
                  x1={0}
                  y1={y}
                  x2={svgWidth}
                  y2={y}
                  stroke={isMajor ? 'green' : 'lightgray'}
                  strokeWidth={isMajor ? 0.75 : 0.25}
                />
              )
            }
          )}
          {/* Graduations */}
          {Array.from({ length: Math.floor(svgWidth / gridSpacing) + 1 }).map(
            (_, i) => {
              const x = i * gridSpacing
              return x % 25 === 0 ? (
                <text
                  key={`v-text-${x}`}
                  x={x + 1}
                  y={10}
                  fill="green"
                  fontSize="6"
                >
                  {x}
                </text>
              ) : null
            }
          )}
          {Array.from({ length: Math.floor(svgHeight / gridSpacing) + 1 }).map(
            (_, i) => {
              const y = i * gridSpacing
              return y % 25 === 0 ? (
                <text
                  key={`h-text-${y}`}
                  x={1}
                  y={y - 1 > 6 ? y - 1 : 6}
                  fill="green"
                  fontSize="6"
                >
                  {y}
                </text>
              ) : null
            }
          )}

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

      {/* Modal pour afficher les détails au clic */}
      {/*TODO remettre la modale une fois que l'on a placé tout les magasins*/}
      {/*{selectedStore && (*/}
      {/*  <ModernModal*/}
      {/*    isOpen={true}*/}
      {/*    onClose={() => setSelectedStore(null)}*/}
      {/*    title={selectedStore.name}*/}
      {/*  >*/}
      {/*    <p>{selectedStore.description}</p>*/}
      {/*  </ModernModal>*/}
      {/*)}*/}
    </div>
  )
}

export default Map

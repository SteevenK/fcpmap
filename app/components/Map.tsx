'use client'
import React, { useState, useRef } from 'react'
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

  // Nouvelle state pour le mode de sélection et pour stocker les points
  const [selectionMode, setSelectionMode] = useState(false)
  // On n'utilise pas selectedPoints, seul le setter est nécessaire pour la mise à jour
  const [, setSelectedPoints] = useState<{ x: number; y: number }[]>([])
  // Ref pour éviter le double log
  const isLoggingRef = useRef(false)

  // Dimensions du viewBox utilisées dans le SVG
  const svgWidth = 800
  const svgHeight = 1200
  const gridSpacing = 5

  const handleMouseEnter = (store: Store) => {
    setHoveredStore(store)
    const center = getPolygonCenter(store.points)
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      const scale = rect.width / svgWidth
      const tooltipX = rect.left + center.x * scale
      const tooltipY = rect.top + center.y * scale
      setTooltipPos({ x: tooltipX, y: tooltipY })
    }
  }

  const handleMouseLeave = () => {
    setHoveredStore(null)
  }

  // Fonction pour récupérer les coordonnées du clic dans le SVG
  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    // Calculer le facteur d'échelle
    const scaleX = svgWidth / rect.width
    const scaleY = svgHeight / rect.height
    // Calculer les coordonnées dans le viewBox
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    if (selectionMode) {
      setSelectedPoints((prevPoints) => {
        const newPoints = [...prevPoints, { x, y }]
        if (newPoints.length === 4 && !isLoggingRef.current) {
          isLoggingRef.current = true
          const formatted = newPoints
            .map((point) => `${point.x},${point.y}`)
            .join(' ')
          console.log(formatted)
          // Réinitialiser immédiatement les points
          // et réinitialiser le verrou après la mise à jour
          setTimeout(() => {
            isLoggingRef.current = false
          }, 0)
          return [] // Réinitialisation des points
        }
        return newPoints
      })
    } else {
      // Fonctionnalité par défaut si le mode sélection n'est pas actif
      console.log(`Coordonnées cliquées : ${x},${y}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {/* Switch pour activer/désactiver le mode de sélection */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectionMode}
            onChange={(e) => {
              setSelectionMode(e.target.checked)
              // Réinitialiser les points quand on active/désactive le mode
              setSelectedPoints([])
            }}
          />
          <span>Mode sélection des points (4 par 4)</span>
        </label>
      </div>

      {/* Titre de la carte */}
      <h1 className="text-2xl font-bold mb-4">
        Carte interactive de FashionCenter
      </h1>

      {/* Conteneur relatif pour la superposition */}
      <div className="relative w-[full] max-w-[1000px]">
        {/* Image de fond via Next Image */}
        <Image
          src="/FashionEtage1.png"
          alt="Fashion Etage 1"
          width={svgWidth}
          height={svgHeight}
          style={{ objectFit: 'cover' }}
        />

        {/* SVG superposé avec le quadrillage et les stores */}
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
              const strokeColor = x % 25 === 0 ? 'green' : 'lightgray'
              const strokeWidth = x % 25 === 0 ? 0.75 : 0.25
              return (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={svgHeight}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              )
            }
          )}
          {/* Quadrillage horizontal */}
          {Array.from({ length: Math.floor(svgHeight / gridSpacing) + 1 }).map(
            (_, i) => {
              const y = i * gridSpacing
              const strokeColor = y % 25 === 0 ? 'green' : 'lightgray'
              const strokeWidth = y % 25 === 0 ? 0.75 : 0.25
              return (
                <line
                  key={`h-${y}`}
                  x1={0}
                  y1={y}
                  x2={svgWidth}
                  y2={y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              )
            }
          )}
          {/* Affichage des graduations */}
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

          {/* Utilisation du composant StorePolygon pour chaque store */}
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

      {/* Tooltip affiché en position fixe */}
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

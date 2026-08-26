'use client'
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdZoomIn, MdZoomOut, MdSearch, MdClose, MdLocationOn } from 'react-icons/md'
import { StoreType } from '@/app/components/stores'
import { categoryConfig, getStoreCategory, type StoreCategory } from './buildingData'
import { getPolygonCenter } from '@/utils/getPolygonCenter'
import ModernModal from './Modal'
import { CopyableField } from './CopyableField'
import Link from 'next/link'
import FloorSwitcher from './FloorSwitcher'

interface SchematicMapProps {
  stores: StoreType[]
}

const SVG_W = 800
const SVG_H = 1200

export default function SchematicMap({ stores }: SchematicMapProps) {
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null)
  const [hoveredStore, setHoveredStore] = useState<StoreType | null>(null)
  const [highlightedStoreId, setHighlightedStoreId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<StoreCategory | null>(null)
  const [scale, setScale] = useState(0.8)

  const matchingStoreIds = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase().trim()
    return new Set(
      stores
        .filter((s) => s.name.toLowerCase().includes(q) || s.lot.toLowerCase().includes(q))
        .map((s) => s.id)
    )
  }, [searchQuery, stores])

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 4))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.4))

  const handleSearchSelect = (store: StoreType) => {
    setHighlightedStoreId(store.id)
    setSearchQuery('')
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #faf8f5 0%, #f5f0ea 100%)',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      }}
    >
      {/* Top bar */}
      <div className="relative z-40 flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl border-b border-[#e0d8cc]/60" style={{ boxShadow: '0 1px 8px rgba(160, 140, 110, 0.08)' }}>
        {/* Branding */}
        <a href="/" className="flex items-center gap-2 shrink-0 mr-2 group">
          <span className="text-lg font-semibold tracking-[0.15em] text-[#b8965a] group-hover:text-[#9a7a48] transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>
            FASHION MAP
          </span>
        </a>
        <div className="w-px h-6 bg-[#e0d8cc]/50 shrink-0" />
        <FloorSwitcher />
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} stores={stores} onSelect={handleSearchSelect} />
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={handleZoomOut} className="p-2 rounded-lg bg-[#f0ece6] hover:bg-[#e8e0d4] text-[#1a1a2e]/40 hover:text-[#1a1a2e]/70 transition-all">
            <MdZoomOut className="w-5 h-5" />
          </button>
          <span className="text-xs text-[#1a1a2e]/25 font-mono min-w-[3ch] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="p-2 rounded-lg bg-[#f0ece6] hover:bg-[#e8e0d4] text-[#1a1a2e]/40 hover:text-[#1a1a2e]/70 transition-all">
            <MdZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Legend */}
      <div className="relative z-30 flex items-center gap-4 px-5 py-2.5 bg-white/40 border-b border-[#e0d8cc]/30 overflow-x-auto">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a2e]/20 shrink-0" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          Categories
        </span>
        {(Object.entries(categoryConfig) as [StoreCategory, (typeof categoryConfig)[StoreCategory]][]).map(
          ([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory((prev) => (prev === key ? null : key))}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-all shrink-0 border ${
                activeCategory === key
                  ? cat.pillActiveClass
                  : activeCategory === null
                    ? cat.pillClass
                    : 'border-[#e0d8cc]/30 text-[#1a1a2e]/15'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.dotClass}`} style={{ opacity: activeCategory === null || activeCategory === key ? 1 : 0.2 }} />
              {cat.label}
            </button>
          )
        )}
      </div>

      {/* SVG Map area */}
      <div className="flex-1 overflow-auto flex items-start justify-center">
        <motion.div
          drag
          dragConstraints={{ left: -SVG_W, right: SVG_W, top: -SVG_H, bottom: SVG_H }}
          dragElastic={0.1}
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="cursor-move my-6"
        >
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width={SVG_W} height={SVG_H} xmlns="http://www.w3.org/2000/svg" className="select-none">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Subtle paper texture */}
              <filter id="paper">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="textured" />
                <feComponentTransfer in="textured">
                  <feFuncA type="linear" slope="0.03" />
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="textured" operator="over" />
              </filter>
            </defs>

            {/* Background */}
            <rect width={SVG_W} height={SVG_H} fill="#f0ece6" rx="8" />
            {/* Subtle grain overlay */}
            <rect width={SVG_W} height={SVG_H} filter="url(#paper)" fill="#f0ece6" rx="8" opacity="0.5" />

            {/* Building structure */}
            <BuildingStructure />

            {/* Store polygons */}
            {stores.map((store) => {
              const category = getStoreCategory(store.id)
              const config = categoryConfig[category]
              const center = getPolygonCenter(store.points)
              const isMatch = matchingStoreIds ? matchingStoreIds.has(store.id) : null
              const isDimmed = isMatch === false || (activeCategory !== null && activeCategory !== category)
              const isHighlighted = highlightedStoreId === store.id
              const isHovered = hoveredStore?.id === store.id

              return (
                <g
                  key={store.id}
                  className="cursor-pointer"
                  onClick={() => { setSelectedStore(store); setHighlightedStoreId(null) }}
                  onMouseEnter={() => setHoveredStore(store)}
                  onMouseLeave={() => setHoveredStore(null)}
                  opacity={isDimmed ? 0.12 : 1}
                  filter={isHighlighted ? 'url(#glow)' : undefined}
                >
                  <polygon
                    points={store.points}
                    fill={
                      isHighlighted ? config.fillHover
                        : isHovered ? config.fillHover
                          : config.fill
                    }
                    stroke={
                      isHighlighted ? config.strokeHover
                        : isHovered ? config.strokeHover
                          : config.stroke
                    }
                    strokeWidth={isHighlighted ? 2 : isHovered ? 1.5 : 0.8}
                    style={{ transition: 'fill 0.25s, stroke 0.25s, stroke-width 0.25s' }}
                  />
                  {/* Lot number */}
                  <text
                    x={center.x} y={center.y - 5}
                    textAnchor="middle"
                    fill={isHovered || isHighlighted ? '#1a1a2e' : '#1a1a2eaa'}
                    fontSize="7" fontFamily="var(--font-geist-mono), monospace" fontWeight="400"
                    style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                  >
                    {store.lot}
                  </text>
                  {/* Store name */}
                  <text
                    x={center.x} y={center.y + 5}
                    textAnchor="middle"
                    fill={isHovered || isHighlighted ? '#1a1a2e' : '#1a1a2e99'}
                    fontSize="6.5" fontWeight="600"
                    fontFamily="var(--font-dm-sans), sans-serif"
                    style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                  >
                    {truncateName(store.name, store.points)}
                  </text>
                </g>
              )
            })}

            {/* Entry markers */}
            <EntryMarker x={400} y={18} label="ENTREE NORD" />
            <EntryMarker x={400} y={930} label="ENTREE SUD" />

            {/* Title block */}
            <text
              x={400} y={968} textAnchor="middle"
              fill="#b8965a" fontSize="16" fontWeight="600"
              letterSpacing="5"
              fontFamily="var(--font-cormorant), Georgia, serif"
            >
              FASHION CENTER
            </text>
            <text x={400} y={985} textAnchor="middle" fill="#1a1a2e55" fontSize="8" letterSpacing="3" fontFamily="var(--font-dm-sans), sans-serif">
              1er ETAGE
            </text>
            <line x1={320} y1={993} x2={480} y2={993} stroke="#b8965a" strokeWidth="0.5" opacity="0.4" />
            <text x={400} y={1005} textAnchor="middle" fill="#1a1a2e33" fontSize="7" letterSpacing="1" fontFamily="var(--font-dm-sans), sans-serif">
              70 avenue Victor Hugo, 93300 Aubervilliers
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Hover tooltip */}
      {hoveredStore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full z-30 pointer-events-none"
          style={{
            boxShadow: '0 4px 24px rgba(26, 26, 46, 0.10), 0 1px 4px rgba(26, 26, 46, 0.06)',
            border: '1px solid rgba(224, 216, 204, 0.6)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          <span className="font-semibold text-[#1a1a2e]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', letterSpacing: '1px' }}>
            {hoveredStore.name}
          </span>
          <span className="text-[#1a1a2e]/30 ml-3 text-sm font-mono">Lot {hoveredStore.lot}</span>
        </motion.div>
      )}

      {/* Store detail modal */}
      {selectedStore && (
        <ModernModal isOpen={true} onClose={() => setSelectedStore(null)} title={selectedStore.name}>
          {selectedStore.lot && (
            <div className="py-1">
              <span className="font-bold font-mono text-indigo-400">Lot</span> : {selectedStore.lot}
            </div>
          )}
          {selectedStore.tel && <CopyableField label="Tel" value={selectedStore.tel} />}
          {selectedStore.fax && <CopyableField label="Fax" value={selectedStore.fax} />}
          {selectedStore.whatsapp && <CopyableField label="Whatsapp" value={selectedStore.whatsapp} />}
          {selectedStore.email && <CopyableField label="Email" value={selectedStore.email} />}
          {selectedStore.microStore && <CopyableField label="MicroStore" value={selectedStore.microStore} />}
          {selectedStore.website && (
            <div className="py-1">
              <span className="font-bold font-mono text-indigo-400">Site web</span> :{' '}
              <Link href={selectedStore.website} className="text-indigo-400 underline hover:text-indigo-300">{selectedStore.website}</Link>
            </div>
          )}
          {selectedStore.description && <p className="py-1 mt-2 text-gray-300">{selectedStore.description}</p>}
        </ModernModal>
      )}
    </div>
  )
}

// ─── Truncate name to fit polygon width ─────────────────────────────────────

function truncateName(name: string, points: string): string {
  const coords = points.trim().split(' ').map((p) => p.split(',').map(Number))
  const xs = coords.map(([x]) => x)
  const width = Math.max(...xs) - Math.min(...xs)
  const maxChars = Math.max(3, Math.floor(width / 6))
  return name.length > maxChars ? name.slice(0, maxChars - 1) + '..' : name
}

// ─── Building Structure ─────────────────────────────────────────────────────

function BuildingStructure() {
  const lineColor = '#c4b8a8'
  const labelColor = '#a09080'
  const labelFont = 'var(--font-cormorant), Georgia, serif'

  return (
    <g>
      {/* Outer building walls - clean thin lines */}
      {/* Left wing */}
      <rect x="20" y="80" width="160" height="830" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Top corridor */}
      <rect x="220" y="15" width="250" height="90" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Central block upper */}
      <rect x="220" y="140" width="250" height="260" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Central block lower */}
      <rect x="225" y="475" width="245" height="330" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Right wing upper */}
      <rect x="515" y="115" width="280" height="170" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Right wing center */}
      <rect x="515" y="330" width="225" height="240" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Right wing lower */}
      <rect x="515" y="605" width="200" height="310" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />
      {/* Bottom corridor */}
      <rect x="230" y="835" width="245" height="75" rx="2" fill="none" stroke={lineColor} strokeWidth="0.8" />

      {/* Corridor fills - slightly lighter to distinguish walkways */}
      <rect x="178" y="80" width="44" height="830" fill="#f8f4ee" opacity="0.6" />
      <rect x="465" y="140" width="52" height="770" fill="#f8f4ee" opacity="0.6" />

      {/* Section labels - elegant serif */}
      <text x="95" y="76" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Aile Gauche
      </text>
      <text x="345" y="12" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Allee Nord
      </text>
      <text x="345" y="137" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Bloc Central
      </text>
      <text x="345" y="470" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Bloc Central Bas
      </text>
      <text x="655" y="112" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Aile Droite Nord
      </text>
      <text x="625" y="327" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Aile Droite Centre
      </text>
      <text x="615" y="602" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Aile Droite Sud
      </text>
      <text x="345" y="832" textAnchor="middle" fill={labelColor} fontSize="7" fontWeight="600" letterSpacing="2.5" fontFamily={labelFont} fontStyle="italic">
        Allee Sud
      </text>

      {/* Decorative corner marks */}
      <line x1="15" y1="5" x2="35" y2="5" stroke="#b8965a" strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="5" x2="15" y2="25" stroke="#b8965a" strokeWidth="0.5" opacity="0.4" />
      <line x1={SVG_W - 15} y1="5" x2={SVG_W - 35} y2="5" stroke="#b8965a" strokeWidth="0.5" opacity="0.4" />
      <line x1={SVG_W - 15} y1="5" x2={SVG_W - 15} y2="25" stroke="#b8965a" strokeWidth="0.5" opacity="0.4" />
    </g>
  )
}

// ─── Entry Marker ───────────────────────────────────────────────────────────

function EntryMarker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="3.5" fill="#b8965a" opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r="7" fill="none" stroke="#b8965a" strokeWidth="0.4" opacity="0.3">
        <animate attributeName="r" values="5;10;5" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text
        x={x} y={y - 10} textAnchor="middle"
        fill="#b8965a" fontSize="6.5" fontWeight="600" letterSpacing="2.5"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontStyle="italic"
      >
        {label}
      </text>
    </g>
  )
}

// ─── Search Bar ─────────────────────────────────────────────────────────────

function SearchBar({
  query, onQueryChange, stores, onSelect,
}: {
  query: string
  onQueryChange: (q: string) => void
  stores: StoreType[]
  onSelect: (store: StoreType) => void
}) {
  const [isFocused, setIsFocused] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return stores.filter((s) => s.name.toLowerCase().includes(q) || s.lot.toLowerCase().includes(q)).slice(0, 8)
  }, [query, stores])

  return (
    <div className="relative flex-1 max-w-sm">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
          isFocused ? 'bg-white border-[#b8965a]/40 shadow-sm' : 'bg-[#f5f1ec] border-[#e0d8cc]/60'
        }`}
      >
        <MdSearch className="w-4 h-4 text-[#1a1a2e]/25 shrink-0" />
        <input
          type="text"
          placeholder="Rechercher un magasin ou lot..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="bg-transparent text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/25 outline-none w-full"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        />
        {query && (
          <button onClick={() => onQueryChange('')} className="text-[#1a1a2e]/25 hover:text-[#1a1a2e]/50">
            <MdClose className="w-4 h-4" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white/98 backdrop-blur-xl rounded-lg border border-[#e0d8cc]/60 overflow-hidden z-50"
            style={{ boxShadow: '0 8px 32px rgba(26, 26, 46, 0.08)' }}
          >
            {results.map((store) => {
              const cat = getStoreCategory(store.id)
              const config = categoryConfig[cat]
              return (
                <button
                  key={store.id}
                  onMouseDown={() => onSelect(store)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#f5f1ec] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: config.color }} />
                  <div className="min-w-0">
                    <div className="text-sm text-[#1a1a2e] truncate" style={{ fontFamily: 'var(--font-dm-sans)' }}>{store.name}</div>
                    <div className="text-[10px] text-[#1a1a2e]/30 font-mono">Lot {store.lot}</div>
                  </div>
                  <MdLocationOn className="w-4 h-4 text-[#b8965a]/40 ml-auto shrink-0" />
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

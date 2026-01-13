import React, { MouseEvent } from 'react'
import { StoreType } from '@/app/components/stores'
import { motion } from 'framer-motion'

interface StorePolygonProps {
  store: StoreType
  onMouseEnter: (store: StoreType, event: MouseEvent<SVGPolygonElement>) => void
  onMouseLeave: () => void
  onClick: (store: StoreType) => void
}

const StorePolygon: React.FC<StorePolygonProps> = ({
  store,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <motion.polygon
      points={store.points}
      initial={{ fill: "rgba(99, 102, 241, 0.1)", stroke: "rgba(99, 102, 241, 0.3)", strokeWidth: 1 }}
      whileHover={{
        fill: "rgba(99, 102, 241, 0.4)",
        stroke: "rgba(99, 102, 241, 0.8)",
        strokeWidth: 2
      }}
      transition={{ duration: 0.2 }}
      style={{ cursor: 'pointer' }}
      onMouseEnter={(e: any) => onMouseEnter(store, e)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(store)}
    />
  )
}

export default StorePolygon

import React, { MouseEvent } from 'react'
import { StoreType } from '@/app/components/stores'

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
    <>
      <polygon
        points={store.points}
        fill="rgba(255, 0, 0, 0.1)" // fond rouge semi-transparent
        stroke="red"
        strokeWidth={0.5}
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e: MouseEvent<SVGPolygonElement>) =>
          onMouseEnter(store, e)
        }
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(store)}
      />
    </>
  )
}

export default StorePolygon

import React, { MouseEvent } from 'react';
import {Store} from "@/app/components/stores";

interface StorePolygonProps {
  store: Store;
  onMouseEnter: (store: Store, event: MouseEvent<SVGPolygonElement>) => void;
  onMouseLeave: () => void;
  onClick: (store: Store) => void;
}

// Fonction helper pour calculer le centre d'un polygone
function getPolygonCenter(points: string): { x: number; y: number } {
  const coords = points
    .trim()
    .split(' ')
    .map(point => point.split(',').map(Number));
  const total = coords.reduce(
    (acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }),
    { x: 0, y: 0 }
  );
  return { x: total.x / coords.length, y: total.y / coords.length };
}

const StorePolygon: React.FC<StorePolygonProps> = ({ store, onMouseEnter, onMouseLeave, onClick }) => {
  const center = getPolygonCenter(store.points);

  return (
    <>
      <polygon
        points={store.points}
        fill="rgba(255, 0, 0, 0.2)"  // fond rouge semi-transparent
        stroke="red"
        strokeWidth={0.5}
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e: MouseEvent<SVGPolygonElement>) => onMouseEnter(store, e)}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(store)}
      />
      {/* Texte centré dans le polygone */}
      <text
        x={center.x}
        y={center.y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
        fontSize="6"
        pointerEvents="none" // Permet de laisser passer les événements sur le polygone
      >
        {store.name}
      </text>
    </>
  );
};

export default StorePolygon;

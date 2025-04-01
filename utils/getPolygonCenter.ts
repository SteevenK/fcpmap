export function getPolygonCenter(points: string): { x: number; y: number } {
  const coords = points
    .trim()
    .split(' ')
    .map((point) => point.split(',').map(Number))
  const total = coords.reduce(
    (acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }),
    { x: 0, y: 0 }
  )
  return { x: total.x / coords.length, y: total.y / coords.length }
}

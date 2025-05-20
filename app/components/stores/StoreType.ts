export type StoreType = {
  id: number
  name: string
  lot: string
  tel?: string
  whatsapp?: string
  fax?: string
  email?: string
  microStore?: string
  website?: string
  description?: string
  // Points pour le polygone au format "x1,y1 x2,y2 x3,y3 ..."
  points: string
}

// Building layout data for Fashion Center Floor 1

export type StoreCategory = 'mode-feminine' | 'jeans' | 'bijoux'

export const categoryConfig: Record<
  StoreCategory,
  { label: string; color: string; fill: string; fillHover: string; stroke: string; strokeHover: string; dotClass: string; pillClass: string; pillActiveClass: string }
> = {
  'mode-feminine': {
    label: 'Pret-a-porter Feminin',
    color: '#1a1a2e',
    fill: 'rgba(26, 26, 46, 0.07)',
    fillHover: 'rgba(26, 26, 46, 0.18)',
    stroke: 'rgba(26, 26, 46, 0.25)',
    strokeHover: 'rgba(26, 26, 46, 0.6)',
    dotClass: 'bg-[#1a1a2e]',
    pillClass: 'border-[#1a1a2e]/20 text-[#1a1a2e]/60 hover:border-[#1a1a2e]/40',
    pillActiveClass: 'border-[#1a1a2e] bg-[#1a1a2e]/8 text-[#1a1a2e]',
  },
  jeans: {
    label: 'Specialiste Jeans',
    color: '#b07030',
    fill: 'rgba(176, 112, 48, 0.08)',
    fillHover: 'rgba(176, 112, 48, 0.20)',
    stroke: 'rgba(176, 112, 48, 0.30)',
    strokeHover: 'rgba(176, 112, 48, 0.7)',
    dotClass: 'bg-[#b07030]',
    pillClass: 'border-[#b07030]/20 text-[#b07030]/60 hover:border-[#b07030]/40',
    pillActiveClass: 'border-[#b07030] bg-[#b07030]/8 text-[#b07030]',
  },
  bijoux: {
    label: 'Bijoux & Accessoires',
    color: '#9c4f6b',
    fill: 'rgba(156, 79, 107, 0.08)',
    fillHover: 'rgba(156, 79, 107, 0.20)',
    stroke: 'rgba(156, 79, 107, 0.30)',
    strokeHover: 'rgba(156, 79, 107, 0.7)',
    dotClass: 'bg-[#9c4f6b]',
    pillClass: 'border-[#9c4f6b]/20 text-[#9c4f6b]/60 hover:border-[#9c4f6b]/40',
    pillActiveClass: 'border-[#9c4f6b] bg-[#9c4f6b]/8 text-[#9c4f6b]',
  },
}

// Map store IDs to categories
export const storeCategoryMap: Record<number, StoreCategory> = {
  17: 'bijoux', // ORIENT EXPRESS
  29: 'jeans', // KUMQUART
  57: 'jeans', // INEX-H
  82: 'jeans', // MISS BON
}

export function getStoreCategory(storeId: number): StoreCategory {
  return storeCategoryMap[storeId] || 'mode-feminine'
}

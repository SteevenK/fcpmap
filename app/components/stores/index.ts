export type Store = {
  id: number
  name: string
  description: string
  // Points pour le polygone au format "x1,y1 x2,y2 x3,y3 ..."
  points: string
}

export const stores: Store[] = [
  {
    id: 17,
    name: 'ORIENT EXPRESS',
    description: 'Description de la Boutique B',
    points:
      '215.5,189 288.5,189.5 289,203.75 243.5,221 221.5,221 221.5,218 214.5,217.5',
  },
  {
    id: 18,
    name: 'CHIC JEUNE',
    description: 'Description de la Boutique B',
    points: '216.5,174.5 288,175 288.5,189.5 215.5,189',
  },
  {
    id: 19,
    name: 'MOD FOR LIFE',
    description: 'Description de la Boutique B',
    points: '217.5,160.75 288,160.75 288,175 216.5,174.5',
  },
  {
    id: 20,
    name: 'MYBEL',
    description: 'Description de la Boutique B',
    points: '218.5,146 287.75,146 288,160.75 217.5,160.75',
  },
  {
    id: 21,
    name: 'TIMELY',
    description: 'Description de la Boutique B',
    points: '219.5,131.5 287.75,131.5 287.75,146 218.5,146',
  },
  {
    id: 22,
    name: 'FRIME',
    description: 'Description de la Boutique B',
    points: '220.55,117.25 287.5,117.25 287.75,131.5 219.5,131.5',
  },
  {
    id: 23,
    name: 'QUEEN HEARTS',
    description: 'Description de la Boutique B',
    points: '221,102 287,102.5 287.5,117.25 220.5,117.25',
  },
  {
    id: 24,
    name: 'ALL DENIM',
    description: 'Description de la Boutique B',
    points: '222,88 287,87.5 287,102.5 221,102',
  },
  {
    id: 25,
    name: 'STYLANGE',
    description: 'Description de la Boutique B',
    points: '223,73 286.5,73 287,87.5 222,88',
  },
  {
    id: 26,
    name: 'LULUMARY',
    description: 'Description de la Boutique B',
    points: '224,59 286,59 286.5,73 223,73',
  },
  {
    id: 27,
    name: 'BELLAVIE',
    description: 'Description de la Boutique Bellavie',
    points: '44,91 168,90 169,119 42,120',
  },
  {
    id: 200,
    name: 'test',
    description: '',
    points: '525.5 844.34, 672.5 842.34, 669.5 863.25, 569.5 904.25, 525.5 904.25',
  },
  {
    id: 201,
    name: 'test',
    description: '',
    points: '524.5 814.34, 676.5 814.34, 672.5 842.34, 525.5 844.34',
  },
  {
    id: 202,
    name: 'test',
    description: '',
    points: '524.5 788.29, 680.5 787.29, 676.5 814.34, 524.5 814.34',
  },
  {
    id: 203,
    name: 'BELLLAVIE texte test',
    description: '',
    points: '523.5 758.83, 641.5 756.83, 640.5 731.83, 688.5 731.83, 680.5 787.29, 524.5 788.29',
  },
]

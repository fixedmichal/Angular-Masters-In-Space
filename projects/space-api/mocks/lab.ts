import { Lab } from '../types';

export const mockedLabs: Lab[] = [
  {
    id: 1,
    details: {
      name: 'YaoNet Lab',
      autonomous: false,
      enableTags: true,
      moonId: 20
    },
    equipments: [
      {name: 'Zenbook', tag: 'ZEN321', description: 'Komputer osobisty'},
      {name: 'Detektor promieniowania', tag: 'PROM567', description: 'zepsuty'}
    ]
  },
  {
    id: 2,
    details: {
      name: 'SpaceX Lab',
      autonomous: false,
      enableTags: false,
      moonId: 1
    },
    equipments: [
      {name: 'Macbook Pro', tag: '', description: 'Komputer firmy'},
      {name: 'Detektor podczerwieni', tag: '', description: 'Obudowa w kolorze zielonym'}
    ]
  },
  {
    id: 3,
    details: {
      name: 'Blueorigin Lab',
      autonomous: true,
      enableTags: false,
      moonId: 15
    },
    equipments: [
    ]
  }
];

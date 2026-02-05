import { CesiumTacticalSignTypeEnum } from '../enums';
import type { CesiumTacticalSignType } from '../types';

export const RECTANGLE_MOCK: CesiumTacticalSignType = {
  id: '52426ef5-fd55-49ad-9e9b-460456b24b26',
  geo: [
    {
      lat: 48.225807,
      lon: 31.010937,
      alt: 0,
    },
    {
      lat: 44.049458,
      lon: 43.43743,
      alt: 0,
    },
  ],
  style: {
    color: '#FF000033',
    fillColor: '',
    lineStyle: 'Solid',
    lineWidth: 1,
    fontSize: 0,
  },
  externalIds: [],
  type: CesiumTacticalSignTypeEnum.Rectangle,
  isDeleted: false,
  layerId: '',
  name: 'test',
  description: '',
  direction: 0,
  colorRadius: '#FF0000FF',
  styleId: '',
  boardId: '',
  sourceLayerId: '00000000-0000-0000-0000-000000000001',
  targetCoordinates: [],
};

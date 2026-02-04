import { CesiumTacticalSignTypeEnum } from '../enums';
import type { CesiumTacticalSignType } from '../types';

const getRandomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const TACTICAL_SIGN_MOCK: CesiumTacticalSignType = {
  id: '69f54c1d-3de4-4544-a29b-b1f81571ff8c',
  geo: [{ 
    lat: getRandomInRange(-90, 90), 
    lon: getRandomInRange(-180, 180), 
    alt: getRandomInRange(0, 1000) 
  }],
  externalIds: [],
  type: CesiumTacticalSignTypeEnum.TacticalSign,
  isDeleted: false,
  layerId: '',
  name: 'wqd',
  description: '',
  direction: 0,
  colorRadius: getRandomColor(),
  icon: {
    id: '20158e91-d191-42b5-9334-7c80d850dfd7',
    name: 'Самолёт ГА',
    apiPath: '/cesium/icons/tsign_icon.svg',
    labelTooltip: { radius: 'labelTooltip_radius', speed: 'labelTooltip_speed' },
  },
  styleId: '20158e91-d191-42b5-9334-7c80d850dfd7',
  boardId: '',
  sourceLayerId: '00000000-0000-0000-0000-000000000001',
  style: { color: getRandomColor(), fillColor: '', lineStyle: 'Solid', lineWidth: 1, fontSize: 18 },
};

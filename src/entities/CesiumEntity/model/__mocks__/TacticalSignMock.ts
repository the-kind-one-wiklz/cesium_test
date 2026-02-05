import { CesiumTacticalSignTypeEnum } from '../enums';
import type { CesiumTacticalSignType } from '../types';

export const TACTICAL_SIGN_MOCK: CesiumTacticalSignType = {
  id: '69f54c1d-3de4-4544-a29b-b1f81571ff8c',
  geo: [{ lat: 53.402634, lon: 51.06378, alt: 150 }],
  externalIds: [],
  type: CesiumTacticalSignTypeEnum.TacticalSign,
  isDeleted: false,
  layerId: '',
  name: 'wqd',
  description: '',
  direction: 0,
  colorRadius: '#FF0000FF',
  icon: {
    id: '20158e91-d191-42b5-9334-7c80d850dfd7',
    name: 'Самолёт ГА',
    apiPath: '/api/images/tacticalsigns/icons/СВОД/Тактические/007b8f8d-2874-41b0-84f2-682018a5feaf.svg',
    labelTooltip: { radius: 'labelTooltip_radius', speed: 'labelTooltip_speed' },
  },
  styleId: '20158e91-d191-42b5-9334-7c80d850dfd7',
  boardId: '',
  sourceLayerId: '00000000-0000-0000-0000-000000000001',
  style: { color: '#FF000033', fillColor: '', lineStyle: 'Solid', lineWidth: 1, fontSize: 18 },
};

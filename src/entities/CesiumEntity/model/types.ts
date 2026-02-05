import type { CesiumTacticalSignTypeEnum } from './enums';

interface Coordinates {
  lon: number;
  lat: number;
  alt: number;
}

type CesiumTacticalSignLineStyles =
  | 'Solid'
  | 'Dash'
  | 'Dot'
  | 'DashDot'
  | 'FrequentDash'
  | 'FrequentDot'
  | 'FrequentDashDot'
  | 'SolidStrokeMiddle'
  | 'SolidStrokeUp'
  | 'SolidArrow'
  | 'SolidStrokeDown'
  | 'SolidDot';

export interface CesiumTacticalSignType {
  name: string;
  description?: string;
  radius?: number;
  colorRadius?: string;
  styleId?: string;
  createTime?: Date;
  resetTime?: Date;
  boardId?: string;
  editTime?: number;
  id: string;
  type: CesiumTacticalSignTypeEnum;
  geo: Coordinates[];
  direction?: number;
  sourceLayerId: string;
  externalIds?: string[];
  isDeleted: boolean;
  layerId: string;
  targetCoordinates?: Coordinates[];
  style?: {
    color: string;
    fillColor?: string;
    lineStyle?: CesiumTacticalSignLineStyles;
    lineWidth?: number;
    fontSize?: number;
  };
  icon?: {
    id: string;
    apiPath: string;
    name: string;
    labelTooltip: { radius?: string; speed?: string } | string;
  };
}

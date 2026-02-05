import { CesiumTacticalSignTypeEnum } from "../enums";
import type { CesiumTacticalSignType } from "../types";

export const RECTANGLE_MOCK: CesiumTacticalSignType = {
  id: "52426ef5-fd55-49ad-9e9b-460456b24b26",
  geo: [
    {
      lat: 45.751545,
      lon: 68.32855,
      alt: 0,
    },
    {
      lat: 28.752169,
      lon: 23.236498,
      alt: 150,
    },
    {
      lat: -35.5372,
      lon: 72.174904,
      alt: 575,
    },
    {
      lat: -17.015713,
      lon: 145.1733,
      alt: 10,
    },
    {
      lat: 44.53921,
      lon: 149.75616,
      alt: 1100,
    },
    {
      lat: 45.751545,
      lon: 68.32855,
      alt: 700,
    },
  ],
  style: {
    color: "#FF0000FF",
    fillColor: "#FF000033",
    lineStyle: "Solid",
    lineWidth: 3,
    fontSize: 12,
  },
  externalIds: [],
  type: CesiumTacticalSignTypeEnum.Rectangle,
  isDeleted: false,
  layerId: "",
  name: "Тестовый полигон",
  description: "Демонстрационный полигон для тестирования",
  direction: 0,
  colorRadius: "#FF0000FF",
  styleId: "",
  boardId: "",
  sourceLayerId: "00000000-0000-0000-0000-000000000001",
  targetCoordinates: [],
};

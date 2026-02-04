import { useCallback, useMemo, useRef, useEffect } from "react";
import {
  CustomHeightmapTerrainProvider,
  Viewer,
  UrlTemplateImageryProvider,
  WebMercatorTilingScheme,
  Cartesian3,
  Entity,
  PointGraphics,
  Color,
  PolylineGraphics,
  PolylineDashMaterialProperty,
  Math as CesiumMath,
  BoundingSphere,
  HeadingPitchRange,
  LabelGraphics,
  VerticalOrigin,
  HorizontalOrigin,
} from "cesium";

import { CESIUM_BASE_URL } from "../consts";
import type { UseCesiumMapHookType } from "../types";
import { TACTICAL_SIGN_MOCK } from "@/entities/CesiumEntity/model/__mocks__/TacticalSignMock";
import { CesiumTacticalSignType } from "@/entities/CesiumEntity/model/types";

// OpenStreetMap Provider для подложки
const osmProvider = new UrlTemplateImageryProvider({
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  subdomains: ["a", "b", "c"],
});

// Тестовый terrain провайдер для локальных файлов рельефа
const terrainProvider = new CustomHeightmapTerrainProvider({
  width: 256,
  height: 256,
  tilingScheme: new WebMercatorTilingScheme(),
  callback: async function (x, y, level) {
    // Для демонстрации используем первый доступный terrain файл на уровне 12
    try {
      // Формируем URL для локального terrain файла
      const terrainUrl = `/cesium/terrain/${level}/${x}/${y}.terrain`;

      console.log("Loading terrain file:", terrainUrl);

      const response = await fetch(terrainUrl);
      if (!response.ok) {
        // Если файл не найден, используем простой рельеф для тестирования
        throw new Error("Terrain file not found");
      }

      // Читаем бинарные данные
      const arrayBuffer = await response.arrayBuffer();

      // Создаем простой рельеф для тестирования
      const terrainData = new Float32Array(256 * 256);
      for (let i = 0; i < terrainData.length; i++) {
        // Создаем имитацию рельефа
        const row = Math.floor(i / 256);
        const col = i % 256;
        terrainData[i] = Math.sin(row * 0.1) * Math.cos(col * 0.1) * 1000; // Амплитуда 100 метров
      }

      return terrainData;
    } catch (error) {
      console.log(
        "Using fallback terrain:",
        error instanceof Error ? error.message : "Unknown error",
      );
      // Fallback - плоская поверхность
      return new Float32Array(256 * 256).fill(0);
    }
  },
});

export const useCesiumMap: UseCesiumMapHookType = () => {
  const viewerRef = useRef<Viewer | null>(null);

  // Устанавливаем CESIUM_BASE_URL только на клиенте
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).CESIUM_BASE_URL = CESIUM_BASE_URL;
    }
  }, []);

  const addTacticalSign = useCallback((tSign: CesiumTacticalSignType) => {
    if (!viewerRef.current) return;

    const { geo, name, style, colorRadius } = tSign;

    if (geo.length > 0) {
      const coordinate = geo[0];

      // Реальная точка с высотой
      const position = Cartesian3.fromDegrees(
        coordinate.lon,
        coordinate.lat,
        coordinate.alt,
      );

      // Проекция точки на плоскость (высота = 0)
      const projectionPosition = Cartesian3.fromDegrees(
        coordinate.lon,
        coordinate.lat,
        0,
      );

      // Реальная точка тактического знака
      const tacticalSignEntity = new Entity({
        name: name || "Тактический знак",
        position,
        point: new PointGraphics({
          color: Color.fromCssColorString(style?.color ?? "#FFFFFFFF"),
          pixelSize: 10,
          outlineColor: Color.fromCssColorString(colorRadius ?? "#FFFFFFFF"),
          outlineWidth: 2,
        }),
      });

      // Проекционная точка (такой же стиль, но без обводки)
      const projectionEntity = new Entity({
        name: "Проекция тактического знака",
        position: projectionPosition,
        point: new PointGraphics({
          color: Color.fromCssColorString(colorRadius ?? "#FFFFFFFF"),
          pixelSize: 8,
          outlineColor: Color.TRANSPARENT,
          outlineWidth: 0,
        }),
      });

      // Пунктирная линия между реальной точкой и проекцией
      const projectionLineEntity = new Entity({
        name: "Проекционная линия",
        polyline: new PolylineGraphics({
          positions: [position, projectionPosition],
          width: 2,
          material: new PolylineDashMaterialProperty({
            color: Color.fromCssColorString(colorRadius ?? "#FFFFFFFF"),
            dashLength: 8.0,
            dashPattern: 255, // Паттерн для пунктира
          }),
        }),
      });

      // Плашка с координатами для реальной точки
      const coordinatesLabelEntity = new Entity({
        name: "Координаты точки",
        position: position, // Используем ту же позицию, что и у точки
        label: new LabelGraphics({
          text: `Широта: ${coordinate.lat.toFixed(6)}°\nДолгота: ${coordinate.lon.toFixed(6)}°\nВысота: ${coordinate.alt.toFixed(2)}м`,
          font: "14px Arial",
          fillColor: Color.WHITE,
          backgroundColor: Color.BLACK.withAlpha(0.7),
          backgroundPadding: new Cartesian3(5, 5, 5),
          pixelOffset: new Cartesian3(25, 0), // Смещение в пикселях для позиционирования справа
          horizontalOrigin: HorizontalOrigin.LEFT, // Привязка к левому краю метки
          verticalOrigin: VerticalOrigin.CENTER, // Центрирование по вертикали относительно точки
          showBackground: true,
        }),
      });

      // Добавляем все сущности на карту
      viewerRef.current.entities.add(tacticalSignEntity);
      viewerRef.current.entities.add(projectionEntity);
      viewerRef.current.entities.add(projectionLineEntity);
      viewerRef.current.entities.add(coordinatesLabelEntity);

      // Используем точный метод для обеспечения видимости всех объектов
      // Создаем bounding sphere, который включает обе точки и линию между ними
      const combinedPositions = [position, projectionPosition];

      // Создаем BoundingSphere, который содержит обе точки
      const boundingSphere = new BoundingSphere();
      BoundingSphere.fromPoints(combinedPositions, boundingSphere);

      // Плавный переход к точке
      viewerRef.current.camera.flyToBoundingSphere(boundingSphere, {
        offset: new HeadingPitchRange(
          0,
          CesiumMath.toRadians(-20),
          boundingSphere.radius * 20,
        ), // +30% дальше
        duration: 2.0,
      });
    }
  }, []);

  const initCesium = useCallback((containerId: string) => {
    viewerRef.current = new Viewer(containerId, {
      baseLayerPicker: false,
      vrButton: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      animation: false,
      // terrainProvider
    });

    // Добавляем подложку OpenStreetMap
    viewerRef.current.imageryLayers.addImageryProvider(osmProvider);
  }, []);

  return useMemo(
    () => ({
      initCesium,
      addTacticalSign,
      cesiumViewer: viewerRef.current,
    }),
    [initCesium, addTacticalSign],
  );
};

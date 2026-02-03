import { useCallback, useMemo, useRef } from "react";
import {
  CustomHeightmapTerrainProvider,
  Viewer,
  WebMapServiceImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";

import { CESIUM_BASE_URL, WMS_SERVER_TILES_URL } from "../consts";
import type { UseCesiumMapHookType } from "../types";

window.CESIUM_BASE_URL = CESIUM_BASE_URL;

// TMS Terrain Provider для рельефа
const tmsTerrainProvider = new CustomHeightmapTerrainProvider({
  width: 32,
  height: 32,
  tilingScheme: new WebMercatorTilingScheme(),
  callback: async function (x, y, level) {
    try {
      // Формируем URL для TMS тайла
      const tmsUrl = `https://geoserver.4z1x.dev/geoserver/gwc/service/tms/1.0.0/ne%3AElevation400@WebMercatorQuad@png/${level}/${x}/${y}.png`;

      console.log("Fetching TMS tile:", tmsUrl);

      const response = await fetch(tmsUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Создаем Image для чтения пикселей
      const blob = await response.blob();
      const img = new Image();

      return new Promise<Float32Array>((resolve) => {
        img.onload = function () {
          // Создаем canvas для чтения данных
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);

          // Читаем данные изображения
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Конвертируем RGBA в высоты (предполагаем что это 16-bit данные высот)
          const heights = new Float32Array(canvas.width * canvas.height);

          for (let i = 0; i < heights.length; i++) {
            // Преобразуем RGBA в значение высоты
            // Если это 16-bit: (R << 8) | G
            const r = data[i * 4];
            const g = data[i * 4 + 1];
            const heightValue = (r << 8) | g;

            heights[i] = heightValue;
          }

          console.log(
            "TMS heights range:",
            Math.min(...heights),
            "to",
            Math.max(...heights),
          );
          resolve(heights);
        };

        img.src = URL.createObjectURL(blob);
      });
    } catch (error) {
      console.error("TMS terrain error:", error);
      // Fallback - плоская поверхность
      return new Float32Array(256 * 256).fill(0);
    }
  },
});

// WMS Provider для подложки
const wmsProvider = new WebMapServiceImageryProvider({
  url: WMS_SERVER_TILES_URL,
  layers: "ne:Elevation400",
  parameters: {
    service: "WMS",
    version: "1.3.0",
    request: "GetMap",
    srs: "EPSG:3857",
    format: "image/png",
    transparent: false,
    width: 256,
    height: 256,
    tiled: true,
  },
  tilingScheme: new WebMercatorTilingScheme(),
});

export const useCesiumMap: UseCesiumMapHookType = () => {
  const viewerRef = useRef<Viewer | null>(null);

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
      terrainProvider: tmsTerrainProvider, // Подключаем рельеф!
    });

    // Добавляем подложку
    viewerRef.current.imageryLayers.addImageryProvider(wmsProvider);

    // Устанавливаем камеру
    // setTimeout(() => {
    //   viewerRef.current?.camera.setView({
    //     destination: Cartesian3.fromDegrees(30, 50, 10000),
    //     orientation: { pitch: -0.8 },
    //   });
    // }, 1000);
  }, []);

  return useMemo(
    () => ({
      initCesium,
      cesiumViewer: viewerRef.current,
    }),
    [initCesium],
  );
};

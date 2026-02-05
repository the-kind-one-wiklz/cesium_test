"use client";
import { useCallback, useMemo, useState } from "react";
import {
  CustomHeightmapTerrainProvider,
  UrlTemplateImageryProvider,
  Viewer,
  WebMapServiceImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";

import {
  CESIUM_BASE_URL,
  WMS_PARAMETERS,
  WMS_SERVER_TILES_URL,
} from "../consts";
import type { UseCesiumMapHookType } from "../types";
import { terrainProvaiderCallback } from "../utils/terrainProvaiderCallback";

window.CESIUM_BASE_URL = CESIUM_BASE_URL;

const terrainProvider = new CustomHeightmapTerrainProvider({
  width: 256,
  height: 256,
  tilingScheme: new WebMercatorTilingScheme(),
  callback: terrainProvaiderCallback,
});

const osmProvider = new UrlTemplateImageryProvider({
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
});

// WMS Provider для подложки
const wmsProvider = new WebMapServiceImageryProvider({
  url: WMS_SERVER_TILES_URL,
  layers: "ne:Elevation400",
  parameters: WMS_PARAMETERS,
  tilingScheme: new WebMercatorTilingScheme(),
});

export const useCesiumMap: UseCesiumMapHookType = () => {
  const [cesiumViewer, setCesiumViewer] = useState<Viewer | null>(null);

  const initCesium = useCallback(async (containerId: string) => {
    const viewer = new Viewer(containerId, {
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
      terrainProvider,
    });

    // Добавляем подложку
    viewer.imageryLayers.addImageryProvider(osmProvider);
    // viewer.imageryLayers.addImageryProvider(wmsProvider);
    // viewer.terrainProvider = await terrainProvider;
    setCesiumViewer(viewer);
  }, []);

  return useMemo(
    () => ({
      initCesium,
      cesiumViewer,
    }),
    [cesiumViewer, initCesium],
  );
};

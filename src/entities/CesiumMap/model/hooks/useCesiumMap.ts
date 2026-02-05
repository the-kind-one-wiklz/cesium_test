"use client";
import { useCallback, useMemo, useState, useRef } from "react";
import { Viewer, Ion } from "cesium";

import { CESIUM_BASE_URL, TOKEN } from "../consts";
import type { UseCesiumMapHookType } from "../types";

export const useCesiumMap: UseCesiumMapHookType = () => {
  const [cesiumViewer, setCesiumViewer] = useState<Viewer | null>(null);
  const cesiumViewerRef = useRef<Viewer | null>(null);

  const initCesium = useCallback(async (containerId: string) => {
    Ion.defaultAccessToken = TOKEN;
    const viewer = new Viewer(containerId, {
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
    });

    // Задержка для установки CESIUM_BASE_URL в window
    setTimeout(() => {
      (window as Window).CESIUM_BASE_URL = CESIUM_BASE_URL;
    }, 100);

    cesiumViewerRef.current = viewer;
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

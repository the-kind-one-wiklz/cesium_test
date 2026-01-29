"use client";
import { useCallback, useRef } from "react";
import { Ion, Terrain, Viewer } from "cesium";
import { UseCesiumMapHookType } from "../types";

export const useCesiumMap: UseCesiumMapHookType = () => {
  const viewerRef = useRef<Viewer | null>(null);

  const initCesium = useCallback((containerId: string, token: string) => {
    if (typeof window !== "undefined") {
      Ion.defaultAccessToken = token;
      viewerRef.current = new Viewer(containerId, {
        terrain: Terrain.fromWorldTerrain(),
      });
    }
  }, []);

  return { cesiumViewer: viewerRef.current, initCesium };
};

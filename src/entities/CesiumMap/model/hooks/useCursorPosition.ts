"use client";
import { useCallback, useEffect, useState } from "react";
import { Cartesian2, Cartesian3, Viewer } from "cesium";

export interface CursorPosition {
  lat?: number;
  lng?: number;
  height?: number;
  cartesian?: Cartesian3;
}

export const useCursorPosition = (viewer: Viewer | null) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({});

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!viewer) return;

    const mousePosition = new Cartesian2(event.clientX, event.clientY);
    const scene = viewer.scene;
    const pickPosition = scene.pickPosition(mousePosition);

    if (pickPosition) {
      const cartographic = scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
      const lat = Number((cartographic.latitude * (180 / Math.PI)).toFixed(6));
      const lng = Number((cartographic.longitude * (180 / Math.PI)).toFixed(6));
      const height = Number(cartographic.height.toFixed(1));

      setCursorPosition({
        lat,
        lng,
        height,
        cartesian: pickPosition
      });
    } else {
      setCursorPosition({});
    }
  }, [viewer]);

  useEffect(() => {
    if (!viewer) return;

    const canvas = viewer.canvas;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [viewer, handleMouseMove]);

  return cursorPosition;
};
"use client";
import { FC, useLayoutEffect } from "react";
import {
  CESIUM_BASE_URL,
  CESIUM_CONTAINER_ID,
} from "../model/consts";
import { useCesiumMap } from "@/entities/CesiumMap/model/hooks/useCesiumMap";

interface CesiumMapWidgetPropsType {}

export const CesiumMapWidget: FC<CesiumMapWidgetPropsType> = () => {
  const { cesiumViewer, initCesium } = useCesiumMap();

  useLayoutEffect(() => {
    // The URL on your server where CesiumJS's static files are hosted.
    window.CESIUM_BASE_URL = CESIUM_BASE_URL;
    initCesium(CESIUM_CONTAINER_ID);

    return () => {
      if (cesiumViewer) {
        cesiumViewer.destroy();
      }
    };
  }, []);

  return (
    <div
      id={CESIUM_CONTAINER_ID}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

"use client";
import { FC, useLayoutEffect } from "react";
import { CESIUM_BASE_URL, CESIUM_CONTAINER_ID } from "../model/consts";
import { useCesiumMap } from "@/entities/CesiumMap/model/hooks/useCesiumMap";

interface CesiumMapWidgetPropsType {}

export const CesiumMapWidget: FC<CesiumMapWidgetPropsType> = () => {
  const { cesiumViewer, initCesium, addTacticalSign } = useCesiumMap();

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
    <>
      <button
        onClick={addTacticalSign}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Добавить тактический знак
      </button>
      <div
        id={CESIUM_CONTAINER_ID}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </>
  );
};

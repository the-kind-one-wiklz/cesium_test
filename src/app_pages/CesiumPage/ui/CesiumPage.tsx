"use client";
import "cesium/Build/Cesium/Widgets/widgets.css";

import { type FC, useLayoutEffect } from "react";

import { useCesiumMap } from "@/entities/CesiumMap";

import { Header } from "./Header";
import { CESIUM_CONTAINER_ID } from "../model/consts";

import styles from "./styles.module.css";
import { CESIUM_BASE_URL } from "@/entities/CesiumMap/model/consts";

export const CesiumPage: FC = () => {
  const { initCesium, cesiumViewer } = useCesiumMap();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.CESIUM_BASE_URL = CESIUM_BASE_URL;
    }
    initCesium(CESIUM_CONTAINER_ID);
  }, []);

  return (
    <section className={styles.section}>
      {cesiumViewer && <Header cesiumViewer={cesiumViewer} />}
      <div id={CESIUM_CONTAINER_ID} className={styles.mapContainer} />
    </section>
  );
};

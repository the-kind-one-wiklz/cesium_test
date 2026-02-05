"use client";
import { type FC, useState } from "react";
import { Cartesian3, type Viewer } from "cesium";

import { RECTANGLE_MOCK, TACTICAL_SIGN_MOCK } from "@/entities/CesiumEntity";

import { addTacticalSign } from "../model/utils/addTacticalSign";
import { removeAllEntities } from "../model/utils/removeAllEntities";

import styles from "./styles.module.css";
import { addPolygon } from "../model/utils/addPolygon";

interface EntitiesManagerProps {
  cesiumViewer: Viewer;
}

export const EntitiesManager: FC<EntitiesManagerProps> = ({ cesiumViewer }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleAddTacticalSign = () => {
    addTacticalSign(cesiumViewer, {
      ...TACTICAL_SIGN_MOCK,
      geo: [
        {
          lat: Math.random() * (90 - -90) - 90,
          lon: Math.random() * (180 - -180) - 180,
          alt: Math.random() * 1000,
        },
      ],
    });
    close();
  };

  const handleAddPolygon = () => {
    addPolygon(cesiumViewer, RECTANGLE_MOCK);
    close();
  }

  const handleRemoveAll = () => {
    removeAllEntities(cesiumViewer);
    close();
  };

const goToCoords = () => {
    cesiumViewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(44.385171, 34.001632, 1),
      duration: 2,
    });
  }

  return (
    <div className={styles.Container}>
      <button onClick={() => setOpen(!open)}>Объекты карты</button>
      {open && (
        <div className={styles.Buttons}>
          <button onClick={goToCoords}>
            Перейти к координатам
          </button>
          <button onClick={handleAddTacticalSign}>
            Добавить знак
          </button>
          <button onClick={handleAddPolygon}>
            Добавить полигон
          </button>
          <button onClick={handleRemoveAll}>
            Удалить все
          </button>
        </div>
      )}
    </div>
  );
};

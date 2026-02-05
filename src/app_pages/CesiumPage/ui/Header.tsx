import type { FC } from "react";
import type { Viewer } from "cesium";

import { EntitiesManager } from "@/features/CesiumActions";

import styles from "./styles.module.css";

interface HeaderProps {
  cesiumViewer: Viewer;
}

export const Header: FC<HeaderProps> = ({ cesiumViewer }) => {
  const goHome = () => cesiumViewer.camera.flyHome(2);
  return (
    <header className={styles.header}>
      <button onClick={goHome}>ДОМОЙ</button>
      <EntitiesManager cesiumViewer={cesiumViewer} />
    </header>
  );
};

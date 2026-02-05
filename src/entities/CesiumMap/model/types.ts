import type { Viewer } from "cesium";

export type UseCesiumMapHookType = () => {
  initCesium: (containerId: string) => void;
  cesiumViewer: Viewer | null;
};

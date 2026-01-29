import { Viewer } from "cesium";

export type UseCesiumMapHookType = () => {
  cesiumViewer: Viewer | null;
  initCesium: (containerId: string, token: string) => void;
};

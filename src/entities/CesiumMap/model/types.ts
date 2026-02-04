import { CesiumTacticalSignType } from "@/entities/CesiumEntity/model/types";
import { Viewer } from "cesium";

export type UseCesiumMapHookType = () => {
  cesiumViewer: Viewer | null;
  initCesium: (containerId: string) => void;
  addTacticalSign: (tSign: CesiumTacticalSignType) => void;
};

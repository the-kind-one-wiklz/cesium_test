import { type Viewer } from 'cesium';

export const removeAllEntities = (cesiumViewer: Viewer) => {
  cesiumViewer.entities.removeAll();
  cesiumViewer.camera.flyHome();
};

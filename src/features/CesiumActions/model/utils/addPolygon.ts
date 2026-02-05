import {
  BoundingSphere,
  Cartesian2,
  Cartesian3,
  Color,
  Entity,
  HeadingPitchRange,
  HorizontalOrigin,
  LabelGraphics,
  Math as CesiumMath,
  NearFarScalar,
  PointGraphics,
  PolygonGraphics,
  VerticalOrigin,
  type Viewer,
} from 'cesium';

import type { CesiumTacticalSignType } from '@/entities/CesiumEntity';

export const addPolygon = (cesiumViewer: Viewer, polygon: CesiumTacticalSignType) => {
  const { geo, name, style } = polygon;

  if (geo.length > 0) {
    // Преобразуем координаты в позиции для Cesium
    const positions = geo.map(coordinate => 
      Cartesian3.fromDegrees(coordinate.lon, coordinate.lat, coordinate.alt)
    );

    // Создаем полигон с надежной фиксацией к рельефу
    // Простой полигон, который корректно работает в 2D и 3D режимах
    const polygonEntity = new Entity({
      name: name || 'Полигон',
      polygon: new PolygonGraphics({
        hierarchy: positions,
        material: Color.fromCssColorString(style?.fillColor || '#FF000080'),
        outline: true,
        outlineColor: Color.fromCssColorString(style?.color || '#FF0000FF'),
        outlineWidth: style?.lineWidth || 3,
        height: 5, // Минимальная высота для предотвращения ухода под текстуры в 2D
        fill: true,
      }),
    });

    // Создаем точки (такой же стиль как в addTacticalSign, но без проекции)
    const pointEntities = geo.map((coordinate, index) => {
      const position = Cartesian3.fromDegrees(coordinate.lon, coordinate.lat, coordinate.alt);
      
      return new Entity({
        name: `Точка ${index + 1}`,
        position,
        point: new PointGraphics({
          color: Color.fromCssColorString(style?.color ?? '#FFFFFFFF'),
          pixelSize: 10,
          outlineColor: Color.fromCssColorString(style?.color ?? '#FFFFFFFF'),
          outlineWidth: 2,
        }),
        label: new LabelGraphics({
          text: `Точка ${index + 1}\n${coordinate.lat.toFixed(6)}°, ${coordinate.lon.toFixed(6)}°\n${coordinate.alt.toFixed(2)}м`,
          font: '12px Arial',
          fillColor: Color.WHITE,
          backgroundColor: Color.BLACK.withAlpha(0.7),
          backgroundPadding: new Cartesian3(5, 5, 5),
          pixelOffset: new Cartesian3(25, 0),
          horizontalOrigin: HorizontalOrigin.LEFT,
          verticalOrigin: VerticalOrigin.CENTER,
          showBackground: true,
        }),
      });
    });

    // Добавляем все сущности на карту
    cesiumViewer.entities.add(polygonEntity);
    pointEntities.forEach(entity => cesiumViewer.entities.add(entity));

    // Перемещаем камеру на полигон (по аналогии с addTacticalSign)
    const boundingSphere = new BoundingSphere();
    BoundingSphere.fromPoints(positions, boundingSphere);

    // Плавный переход к полигону
    cesiumViewer.camera.flyToBoundingSphere(boundingSphere, {
      offset: new HeadingPitchRange(0, CesiumMath.toRadians(-20), boundingSphere.radius * 20),
      duration: 2.0,
    });
  }
};

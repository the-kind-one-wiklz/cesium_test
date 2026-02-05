import {
  BoundingSphere,
  Cartesian3,
  Color,
  Entity,
  HeadingPitchRange,
  HorizontalOrigin,
  LabelGraphics,
  Math as CesiumMath,
  PointGraphics,
  PolylineDashMaterialProperty,
  PolylineGraphics,
  VerticalOrigin,
  type Viewer,
} from 'cesium';

import type { CesiumTacticalSignType } from '@/entities/CesiumEntity';

export const addTacticalSign = (cesiumViewer: Viewer, tSign: CesiumTacticalSignType) => {
  const { geo, name, style, colorRadius } = tSign;

  if (geo.length > 0) {
    const coordinate = geo[0];

    // Реальная точка с высотой
    const position = Cartesian3.fromDegrees(coordinate.lon, coordinate.lat, coordinate.alt);

    // Проекция точки на плоскость (высота = 0)
    const projectionPosition = Cartesian3.fromDegrees(coordinate.lon, coordinate.lat, 0);

    // Реальная точка тактического знака
    const tacticalSignEntity = new Entity({
      name: name || 'Тактический знак',
      position,
      point: new PointGraphics({
        color: Color.fromCssColorString(style?.color ?? '#FFFFFFFF'),
        pixelSize: 10,
        outlineColor: Color.fromCssColorString(colorRadius ?? '#FFFFFFFF'),
        outlineWidth: 2,
      }),
    });

    // Проекционная точка (такой же стиль, но без обводки)
    const projectionEntity = new Entity({
      name: 'Проекция тактического знака',
      position: projectionPosition,
      point: new PointGraphics({
        color: Color.fromCssColorString(colorRadius ?? '#FFFFFFFF'),
        pixelSize: 8,
        outlineColor: Color.TRANSPARENT,
        outlineWidth: 0,
      }),
    });

    // Пунктирная линия между реальной точкой и проекцией
    const projectionLineEntity = new Entity({
      name: 'Проекционная линия',
      polyline: new PolylineGraphics({
        positions: [position, projectionPosition],
        width: 2,
        material: new PolylineDashMaterialProperty({
          color: Color.fromCssColorString(colorRadius ?? '#FFFFFFFF'),
          dashLength: 8.0,
          dashPattern: 255, // Паттерн для пунктира
        }),
      }),
    });

    // Плашка с координатами для реальной точки
    const coordinatesLabelEntity = new Entity({
      name: 'Координаты точки',
      position: position, // Используем ту же позицию, что и у точки
      label: new LabelGraphics({
        text: `Широта: ${coordinate.lat.toFixed(6)}°\nДолгота: ${coordinate.lon.toFixed(6)}°\nВысота: ${coordinate.alt.toFixed(2)}м`,
        font: '14px Arial',
        fillColor: Color.WHITE,
        backgroundColor: Color.BLACK.withAlpha(0.7),
        backgroundPadding: new Cartesian3(5, 5, 5),
        pixelOffset: new Cartesian3(25, 0), // Смещение в пикселях для позиционирования справа
        horizontalOrigin: HorizontalOrigin.LEFT, // Привязка к левому краю метки
        verticalOrigin: VerticalOrigin.CENTER, // Центрирование по вертикали относительно точки
        showBackground: true,
      }),
    });

    // Добавляем все сущности на карту
    cesiumViewer.entities.add(tacticalSignEntity);
    cesiumViewer.entities.add(projectionEntity);
    cesiumViewer.entities.add(projectionLineEntity);
    cesiumViewer.entities.add(coordinatesLabelEntity);

    // Используем точный метод для обеспечения видимости всех объектов
    // Создаем bounding sphere, который включает обе точки и линию между ними
    const combinedPositions = [position, projectionPosition];

    // Создаем BoundingSphere, который содержит обе точки
    const boundingSphere = new BoundingSphere();
    BoundingSphere.fromPoints(combinedPositions, boundingSphere);

    // Плавный переход к точке
    cesiumViewer.camera.flyToBoundingSphere(boundingSphere, {
      offset: new HeadingPitchRange(0, CesiumMath.toRadians(-20), boundingSphere.radius * 20), // +30% дальше
      duration: 2.0,
    });
  }
};

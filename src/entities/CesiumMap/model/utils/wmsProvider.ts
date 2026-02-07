import { WebMapServiceImageryProvider, Rectangle } from "cesium";

/**
 * Создает WMS провайдер для слоя физических объектов переписи населения США
 * с полной совместимостью с предоставленной конфигурацией WMS Capabilities
 */
export const createWmsProvider = () => {
  return new WebMapServiceImageryProvider({
    url: "https://tigerweb.geo.census.gov/arcgis/services/TIGERweb/tigerWMS_PhysicalFeatures/MapServer/WMSServer",
    
    // Используем все доступные слои из конфигурации
    layers: "1,2,3,4,5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24",
    
    parameters: {
      transparent: false,
      // Используем поддерживаемый формат изображений из конфигурации
      format: "image/png24",
      version: "1.3.0", // Версия WMS из конфигурации
      service: "WMS",
      request: "GetMap",
      // Используем CRS:84 как основную систему координат согласно конфигурации
      crs: "CRS:84",
    },
    
    enablePickFeatures: true,
    
    // Границы из EX_GeographicBoundingBox верхнего слоя конфигурации
    rectangle: Rectangle.fromDegrees(-179.231086, -14.601813, 179.859681, 71.439786),
    
    // Оптимизированные настройки тайлов на основе конфигурации
    maximumLevel: 20,
    minimumLevel: 0,
    tileWidth: 256,
    tileHeight: 256,
    
    // Добавляем все поддерживаемые форматы GetFeatureInfo из конфигурации
    getFeatureInfoFormats: [
      { 
        type: "application/vnd.esri.wms_raw_xml",
        format: "application/vnd.esri.wms_raw_xml"
      },
      {
        type: "application/vnd.esri.wms_featureinfo_xml", 
        format: "application/vnd.esri.wms_featureinfo_xml"
      },
      {
        type: "application/vnd.ogc.wms_xml",
        format: "application/vnd.ogc.wms_xml"
      },
      {
        type: "application/geo+json",
        format: "application/geo+json"
      },
      {
        type: "text/xml",
        format: "text/xml"
      },
      {
        type: "text/html",
        format: "text/html"
      },
      {
        type: "text/plain",
        format: "text/plain"
      }
    ]
  });
};

/**
 * Альтернативный вариант с использованием EPSG:4326 как CRS
 * для совместимости с системами, которые предпочитают эту систему координат
 */
export const createWmsProviderEPSG4326 = () => {
  return new WebMapServiceImageryProvider({
    url: "https://tigerweb.geo.census.gov/arcgis/services/TIGERweb/tigerWMS_PhysicalFeatures/MapServer/WMSServer",
    layers: "1,2,3,4,5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24",
    parameters: {
      transparent: true,
      format: "image/png",
      version: "1.3.0",
      service: "WMS",
      request: "GetMap",
      crs: "EPSG:4326", // Альтернативная CRS из конфигурации
    },
    enablePickFeatures: true,
    rectangle: Rectangle.fromDegrees(-180, -90, 180, 90),
    maximumLevel: 20,
    minimumLevel: 0,
    tileWidth: 256,
    tileHeight: 256,
    getFeatureInfoFormats: [
      { 
        type: "application/vnd.esri.wms_raw_xml",
        format: "application/vnd.esri.wms_raw_xml"
      },
      { type: "application/geo+json", format: "application/geo+json" },
      { type: "text/html", format: "text/html" },
    ]
  });
};

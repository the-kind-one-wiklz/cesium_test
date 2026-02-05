export const WMS_SERVER_TILES_URL =
  "https://geoserver.4z1x.dev/geoserver/ne/wms";
// export const WMS_SERVER_TILES_URL = 'https://geoserver-new.4z1x.dev/geoserver/ne/wms';
// export const WMS_SERVER_TILES_URL = 'https://geoserver.4z1x.dev/geoserver/BW/wms';
export const CESIUM_BASE_URL = "/cesium";
export const TERRAIN_PATH = "http://localhost:9000/cesium/terrain";
export const WMS_PARAMETERS = {
  service: "WMS",
  version: "1.3.0",
  request: "GetMap",
  srs: "WebMercatorQuad",
  format: "image/png",
  transparent: true,
  width: 257,
  height: 257,
  tiled: true,
};

// Конфигурация для OpenStreetMap terrain provider
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZGU0YWJiOC1lMzBjLTRiNzItOWU4My03NDA5YTg3Njc3YTYiLCJpZCI6Mzg0Njg0LCJpYXQiOjE3NzAwMjcxMjl9.Nl3tNIVbhmf3jAiZMl4XTusScOtgLVLzj2GiRdhcJAg";

// Конфигурация для WMTS провайдера
export const WMTS_SERVER_URL = "https://geoserver.4z1x.dev/geoserver/gwc/service/wmts/rest";
export const LAYERS = [
  "ne:Map250",
  "ne:Elevation400", 
  "ne:Crimea",
  "ne:Politic250",
  "ne:Vector250",
  "ne:Transport250"
] as const;
export const TILE_MATRIX_SETS = [
  "WebMercatorQuad",
  "EPSG:4326",
  "EPSG:900913",
  "Yandex"
] as const;

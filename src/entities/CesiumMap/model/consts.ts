export const WMS_SERVER_TILES_URL = 'https://geoserver.4z1x.dev/geoserver/ne/wms';
// export const WMS_SERVER_TILES_URL = 'https://geoserver-new.4z1x.dev/geoserver/ne/wms';
// export const WMS_SERVER_TILES_URL = 'https://geoserver.4z1x.dev/geoserver/BW/wms';
export const CESIUM_BASE_URL = '/cesium';
export const TERRAIN_PATH = 'http://localhost:9000/cesium/terrain';
export const WMS_PARAMETERS = {
  service: 'WMS',
  version: '1.3.0',
  request: 'GetMap',
  srs: 'WebMercatorQuad',
  format: 'image/png',
  transparent: true,
  width: 257,
  height: 257,
  tiled: true,
};

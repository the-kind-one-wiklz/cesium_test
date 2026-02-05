import { WebMercatorTilingScheme, Rectangle, UrlTemplateImageryProvider } from "cesium";
import { WMTS_SERVER_URL, LAYERS, TILE_MATRIX_SETS } from "../consts";

export interface WmtsProviderConfig {
  layer: typeof LAYERS[number];
  tileMatrixSet: typeof TILE_MATRIX_SETS[number];
  style?: string;
  format?: string;
}

export const createWmtsProvider = (config: WmtsProviderConfig) => {
  const {
    layer = "ne:Map250",
    tileMatrixSet = "WebMercatorQuad",
    style = "",
    format = "image/png"
  } = config;

  // Формируем URL для WMTS тайлов
  const urlTemplate = `${WMTS_SERVER_URL}/${layer}/${tileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?FORMAT=${format}&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=${layer}&STYLE=${style}&TILEMATRIXSET=${tileMatrixSet}&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}`;

  return new UrlTemplateImageryProvider({
    url: urlTemplate,
    tilingScheme: new WebMercatorTilingScheme(),
    maximumLevel: 19,
    minimumLevel: 0,
    rectangle: Rectangle.MAX_VALUE
  });
};

// Предопределенные провайдеры для часто используемых слоев
export const wmtsMap250Provider = createWmtsProvider({
  layer: "ne:Map250",
  tileMatrixSet: "WebMercatorQuad"
});

export const wmtsElevation400Provider = createWmtsProvider({
  layer: "ne:Elevation400", 
  tileMatrixSet: "WebMercatorQuad"
});

export const wmtsCrimeaProvider = createWmtsProvider({
  layer: "ne:Crimea",
  tileMatrixSet: "WebMercatorQuad"
});

export const wmtsPolitic250Provider = createWmtsProvider({
  layer: "ne:Politic250",
  tileMatrixSet: "WebMercatorQuad"  
});

export const wmtsVector250Provider = createWmtsProvider({
  layer: "ne:Vector250",
  tileMatrixSet: "WebMercatorQuad"
});

export const wmtsTransport250Provider = createWmtsProvider({
  layer: "ne:Transport250",
  tileMatrixSet: "WebMercatorQuad"
});
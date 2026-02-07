"use client";
import { useCallback, useMemo, useState, useRef } from "react";
import {
  Viewer,
  Ion,
  ImageryLayer,
  UrlTemplateImageryProvider,
  TileMapServiceImageryProvider,
  ProviderViewModel,
  buildModuleUrl,
  WebMapServiceImageryProvider,
  Rectangle,
  GeographicTilingScheme,
} from "cesium";

import { CESIUM_BASE_URL, TOKEN } from "../consts";
import type { UseCesiumMapHookType } from "../types";
import {
  createWmsProvider,
  createWmsProviderEPSG4326,
} from "../utils/wmsProvider";

export const useCesiumMap: UseCesiumMapHookType = () => {
  const [cesiumViewer, setCesiumViewer] = useState<Viewer | null>(null);
  const cesiumViewerRef = useRef<Viewer | null>(null);

  const initCesium = useCallback(async (containerId: string) => {
    // Ion.defaultAccessToken = TOKEN;
    const viewer = new Viewer(containerId, {
      vrButton: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      animation: false,
      // imageryProviderViewModels: [],
    });

    // viewer.baseLayerPicker.viewModel.imageryProviderViewModels.push(
    //   new ProviderViewModel({
    //     name: "Natural Earth\u00a0II",
    //     iconUrl: buildModuleUrl(
    //       "Widgets/Images/ImageryProviders/naturalEarthII.png",
    //     ),
    //     tooltip:
    //       "Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/",
    //     creationFunction: function () {
    //       return TileMapServiceImageryProvider.fromUrl(
    //         buildModuleUrl("Assets/Textures/NaturalEarthII"),
    //       );
    //     },
    //   }),
    // );

    viewer.imageryLayers.addImageryProvider(
      await TileMapServiceImageryProvider.fromUrl(
        buildModuleUrl("Assets/Textures/NaturalEarthII"),
      ),
    );
    // const gibs = new WebMapServiceImageryProvider({
    //   url: "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi",
    //   layers: "BlueMarble_ShadedRelief_Bathymetry", // базовая "красивая Земля"
    //   parameters: {
    //     service: "WMS",
    //     request: "GetMap",
    //     version: "1.1.1", // важно: без axis-order сюрпризов
    //     format: "image/png",
    //     transparent: false,
    //     styles: "",
    //     srs: "EPSG:4326",
    //   },
    //   tilingScheme: new GeographicTilingScheme(),
    //   rectangle: Rectangle.fromDegrees(-180, -90, 180, 90),
    // });

    // viewer.imageryLayers.addImageryProvider(gibs);

    setTimeout(() => {
      (window as Window).CESIUM_BASE_URL = CESIUM_BASE_URL;
    }, 100);

    cesiumViewerRef.current = viewer;
    setCesiumViewer(viewer);
  }, []);

  return useMemo(
    () => ({
      initCesium,
      cesiumViewer,
    }),
    [cesiumViewer, initCesium],
  );
};

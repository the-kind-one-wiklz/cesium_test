declare global {
  interface Window {
    /**
     * The URL on your server where CesiumJS's static files are hosted.
     * Set by `useCesiumMap` at runtime.
     */
    CESIUM_BASE_URL?: string;
  }
}

export {};

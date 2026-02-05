export const openStreetMapTerrainProviderCallback = async (
  x: number,
  y: number,
  level: number,
) => {
  try {
    if (level > 1) {
      // Используем TMS схему (y координата инвертирована) для сервисов высот
      const tmsY = Math.pow(2, level) - 1 - y;
      
      // Используем сервис OpenStreetMap совместимых высотных данных
      // Mapbox Terrain Tiles (работает с OpenStreetMap данными)
      const terrainUrl = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${level}/${x}/${tmsY}.pngraw?access_token=$pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;
      
      console.log("Loading OpenStreetMap terrain file:", terrainUrl);

      const response = await fetch(terrainUrl);
      if (!response.ok) {
        console.log("Response status:", response.status, "for URL:", terrainUrl);
        throw new Error("OpenStreetMap terrain file not found");
      }

      // Преобразуем RGB значения в высоты
      // Mapbox Terrain-RGB кодирует высоту в RGB каналах:
      // height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
      
      const blob = await response.blob();
      const img = await createImageBitmap(blob);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error("Could not create canvas context");
      }
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Создаем массив высот
      const terrainData = new Float32Array(canvas.width * canvas.height);
      
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Формула преобразования RGB в высоту для Mapbox Terrain-RGB
        const height = -10000 + ((r * 256 * 256 + g * 256 + b) * 0.1);
        terrainData[j] = height;
      }

      return terrainData;
    }
    
    // Для низких уровней детализации возвращаем плоскую поверхность
    return new Float32Array(256 * 256).fill(0);
  } catch (error) {
    console.log(
      "Using fallback for OpenStreetMap terrain:",
      error instanceof Error ? error.message : "Unknown error",
    );
    // Fallback - плоская поверхность
    return new Float32Array(256 * 256).fill(0);
  }
};
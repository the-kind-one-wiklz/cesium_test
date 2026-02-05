import { GeographicTilingScheme, WebMercatorTilingScheme } from 'cesium';

import { TERRAIN_PATH } from '../consts';

export const terrainProvaiderCallback = async (x: number, y: number, level: number) => {
  try {
    // Формируем URL для локального terrain файла
    if (level > 1) {
      const terrainUrl = `${TERRAIN_PATH}/${level}/${x}/${y}.terrain`;

      console.log('Loading terrain file:', terrainUrl);

      const response = await fetch(terrainUrl);
      if (!response.ok) {
        // Если файл не найден, используем простой рельеф для тестирования
        throw new Error('Terrain file not found');
      }

      // Создаем простой рельеф для тестирования
      const terrainData = new Float32Array(256 * 256);
      for (let i = 0; i < terrainData.length; i++) {
        // Создаем имитацию рельефа
        const row = Math.floor(i / 256);
        const col = i % 256;
        terrainData[i] = Math.sin(row * 0.1) * Math.cos(col * 0.1) * 1;
      }

      const rectangle = new GeographicTilingScheme().tileXYToNativeRectangle(x, y, level);
      console.log('LOH ========================================================');
      console.log('LOH долгота с запада:', rectangle.west * (180 / Math.PI));
      console.log('LOH долгота с востока:', rectangle.east * (180 / Math.PI));
      console.log('LOH широта с севера:', rectangle.north * (180 / Math.PI));
      console.log('LOH широта с юга:', rectangle.south * (180 / Math.PI));
      return terrainData;
    }
    return new Float32Array(256 * 256).fill(0);
  } catch (error) {
    console.log('Using fallback terrain:', error instanceof Error ? error.message : 'Unknown error');
    // Fallback - плоская поверхность
    return new Float32Array(256 * 256).fill(0);
  }
};

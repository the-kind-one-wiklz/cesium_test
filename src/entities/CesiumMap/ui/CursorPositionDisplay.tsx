"use client";
import type { FC } from "react";
import { Viewer } from "cesium";

import { useCursorPosition } from "../model/hooks/useCursorPosition";

interface CursorPositionDisplayProps {
  viewer: Viewer | null;
}

export const CursorPositionDisplay: FC<CursorPositionDisplayProps> = ({ viewer }) => {
  const cursorPosition = useCursorPosition(viewer);

  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      {cursorPosition.lat !== undefined && cursorPosition.lng !== undefined ? (
        <>
          <div>Широта: {cursorPosition.lat}°</div>
          <div>Долгота: {cursorPosition.lng}°</div>
          <div>Высота: {cursorPosition.height} м</div>
        </>
      ) : (
        <div>Наведите курсор на карту</div>
      )}
    </div>
  );
};
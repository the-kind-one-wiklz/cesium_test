"use client";
import { CesiumMapWidget } from "@/widgets/CesiumMap";
import { FC } from "react";
import { useCesiumMap } from "@/entities/CesiumMap/model/hooks/useCesiumMap";

export const CesiumPage: FC = () => {
  const { addTacticalSign } = useCesiumMap();

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <CesiumMapWidget />
    </div>
  );
};

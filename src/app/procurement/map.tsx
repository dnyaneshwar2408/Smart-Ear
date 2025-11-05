"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, Factory } from "lucide-react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

interface Location {
  id: string;
  name: string;
  type: "warehouse" | "station";
  position: {
    lat: number;
    lng: number;
  };
}

interface ProcurementMapProps {
  selectedDestination?: string;
  onSelectDestination?: (id: string) => void;
}

// 🧭 Set container style for Google Map
const containerStyle = {
  width: "100%",
  height: "480px",
  borderRadius: "12px",
};

// 📍 Define base warehouse + stations (you can replace lat/lng with real coords)
const locations: Location[] = [
  {
    id: "main-warehouse",
    name: "Main Warehouse",
    type: "warehouse",
    position: { lat: 18.5204, lng: 73.8567 },
  },
  {
    id: "station-a",
    name: "Station A",
    type: "station",
    position: { lat: 18.531, lng: 73.862 },
  },
  {
    id: "station-b",
    name: "Station B",
    type: "station",
    position: { lat: 18.515, lng: 73.878 },
  },
  {
    id: "station-c",
    name: "Station C",
    type: "station",
    position: { lat: 18.505, lng: 73.845 },
  },
];

export function ProcurementMap({
  selectedDestination,
  onSelectDestination,
}: ProcurementMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    if (selectedDestination) {
      const loc = locations.find((l) => l.id === selectedDestination) || null;
      setSelectedLocation(loc);
    }
  }, [selectedDestination]);

  if (loadError) return <p>Error loading map.</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  const center = locations[0].position; // center on warehouse

  return (
    <div className="w-full">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {/* 🏭 Markers */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            icon={{
              url:
                loc.type === "warehouse"
                  ? "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
                  : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scaledSize: new window.google.maps.Size(36, 36),
            }}
            onClick={() => {
              setSelectedLocation(loc);
              onSelectDestination?.(loc.id);
            }}
          />
        ))}

        {/* 🪧 InfoWindow */}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div
              className={cn(
                "p-3 rounded-lg shadow bg-white",
                selectedDestination === selectedLocation.id
                  ? "border border-blue-400"
                  : "border border-gray-200"
              )}
              style={{ width: "220px" }}
            >
              <h3 className="font-semibold text-sm mb-1 text-gray-800">
                {selectedLocation.name}
              </h3>
              <p className="text-xs text-gray-500">
                Type: {selectedLocation.type === "warehouse" ? "Warehouse" : "Station"}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

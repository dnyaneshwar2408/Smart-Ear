"use client";

import { cn } from "@/lib/utils";
import { Home, Factory } from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'station';
  position: {
    top: string;
    left: string;
  };
}

const locations: Location[] = [
  { id: 'main-warehouse', name: 'Main Warehouse', type: 'warehouse', position: { top: '50%', left: '10%' } },
  { id: 'station-a', name: 'Station A', type: 'station', position: { top: '20%', left: '70%' } },
  { id: 'station-b', name: 'Station B', type: 'station', position: { top: '50%', left: '80%' } },
  { id: 'station-c', name: 'Station C', type: 'station', position: { top: '80%', left: '70%' } },
];

interface ProcurementMapProps {
    selectedDestination?: string;
    onSelectDestination?: (id: string) => void;
}

export function ProcurementMap({ selectedDestination, onSelectDestination }: ProcurementMapProps) {
  const warehouse = locations.find(l => l.type === 'warehouse')!;
  const stations = locations.filter(l => l.type === 'station');

  return (
    <div className="relative h-96 w-full rounded-lg border bg-muted/50 overflow-hidden">
      {/* Dashed lines from warehouse to stations */}
      {stations.map(station => (
        <svg key={`line-${station.id}`} className="absolute top-0 left-0 h-full w-full" style={{ pointerEvents: 'none' }}>
          <line
            x1={warehouse.position.left}
            y1={warehouse.position.top}
            x2={station.position.left}
            y2={station.position.top}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="5, 5"
          />
        </svg>
      ))}

      {locations.map(loc => (
        <button
          key={loc.id}
          onClick={() => onSelectDestination?.(loc.id)}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
            onSelectDestination && "hover:bg-accent",
            selectedDestination === loc.id && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          style={{ top: loc.position.top, left: loc.position.left }}
        >
          {loc.type === 'warehouse' ? <Home className="h-6 w-6" /> : <Factory className="h-6 w-6" />}
          <span className="text-xs font-semibold">{loc.name}</span>
        </button>
      ))}
    </div>
  );
}
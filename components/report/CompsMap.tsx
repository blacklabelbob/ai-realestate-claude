"use client";

import { useState } from "react";
import { Map as MapIcon, MapPin } from "lucide-react";
import type { Comp } from "@/lib/reports";

interface CompsMapProps {
  subjectAddress: string;
  subjectLabel: string;
  comps: Comp[];
  city: string;
  state: string;
  verified?: boolean;
}

const MAPS_ENABLED = process.env.NEXT_PUBLIC_MAPS_ENABLED === "true";

// Comps often store a short street ("596 Sentinel Rd"); append city/state so the
// Static Maps geocoder can resolve each marker.
function qualify(addr: string, city: string, state: string) {
  return /\d{5}/.test(addr) || addr.includes(",") ? addr : `${addr}, ${city} ${state}`;
}

function staticMapUrl(subject: string, comps: Comp[], city: string, state: string) {
  const subjMarker = `markers=color:0xc9982e%7Clabel:S%7C${encodeURIComponent(subject)}`;
  const compMarkers = comps
    .slice(0, 9)
    .map(
      (c, i) =>
        `markers=color:0x1a2332%7Clabel:${i + 1}%7C${encodeURIComponent(qualify(c.address, city, state))}`,
    )
    .join("&");
  // No center/zoom → Static Maps auto-fits all markers. Routed via the secret-key proxy.
  return `/api/staticmap?size=640x360&scale=2&maptype=roadmap&${subjMarker}&${compMarkers}`;
}

// Deterministic scatter for the no-key schematic (index-based, stable across renders).
const SCATTER = [
  { top: "26%", left: "24%" },
  { top: "62%", left: "30%" },
  { top: "34%", left: "72%" },
  { top: "70%", left: "66%" },
  { top: "20%", left: "54%" },
  { top: "78%", left: "46%" },
  { top: "48%", left: "84%" },
  { top: "56%", left: "14%" },
  { top: "16%", left: "38%" },
];

function SchematicComps({ comps }: { comps: Comp[] }) {
  return (
    <div className="report-mapcard relative h-[300px] w-full overflow-hidden">
      <div className="report-mapgrid absolute inset-0" />
      <div className="report-mapdiag absolute inset-0" />
      {/* comp pins */}
      {comps.slice(0, 9).map((c, i) => (
        <div
          key={c.address}
          className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-navy/80 text-[10px] font-bold text-cream shadow"
          style={SCATTER[i]}
          title={`${c.address} — ${c.price}`}
        >
          {i + 1}
        </div>
      ))}
      {/* subject pin, centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="report-parcel flex h-11 w-11 items-center justify-center rounded-lg border-2 border-gold/80 bg-gold/20 shadow-[0_0_0_6px_rgba(201,152,46,0.12)]">
          <MapPin className="h-5 w-5 text-gold" />
        </div>
      </div>
      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream/90 backdrop-blur-sm">
        <MapIcon className="h-3 w-3 text-gold" /> Comp map · <span className="text-gold">S</span> = subject
      </div>
    </div>
  );
}

export function CompsMap({ subjectAddress, subjectLabel, comps, city, state, verified }: CompsMapProps) {
  const [errored, setErrored] = useState(false);
  const showImage = MAPS_ENABLED && !errored && comps.length > 0;

  return (
    <figure className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={staticMapUrl(subjectAddress, comps, city, state)}
          alt={`Map of ${subjectLabel} and ${comps.length} comparable sales`}
          className="h-[360px] w-full object-cover"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      ) : (
        <SchematicComps comps={comps} />
      )}
      <figcaption className="flex items-center justify-between border-t border-navy/5 px-4 py-2.5 text-xs text-navy/50">
        <span className="flex items-center gap-1.5">
          <MapIcon className="h-3.5 w-3.5 text-gold" /> Subject (S) vs {comps.length} comparable sales
        </span>
        {!verified && <span className="text-navy/40">approximate location</span>}
      </figcaption>
    </figure>
  );
}

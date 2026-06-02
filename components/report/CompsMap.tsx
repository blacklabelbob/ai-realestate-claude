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
  /** baked subject coords — centers the map so it always frames the neighborhood */
  subjectCoords?: { lat: number; lng: number };
}

const MAPS_ENABLED = process.env.NEXT_PUBLIC_MAPS_ENABLED === "true";

// Comps often store a short street ("596 Sentinel Rd"); append city/state so the
// Static Maps geocoder can resolve each marker.
function qualify(addr: string, city: string, state: string) {
  return /\d{5}/.test(addr) || addr.includes(",") ? addr : `${addr}, ${city} ${state}`;
}

function staticMapUrl(
  subject: string,
  comps: Comp[],
  city: string,
  state: string,
  subjectCoords?: { lat: number; lng: number },
) {
  // Use the subject as the gold "S" pin. If we have baked coords, pin the marker by
  // lat/lng (exact) so it never mis-geocodes.
  const list = comps.slice(0, 9);
  const allBaked = list.length > 0 && list.every((c) => typeof c.lat === "number" && typeof c.lng === "number");

  const subj = subjectCoords ? `${subjectCoords.lat},${subjectCoords.lng}` : subject;
  const subjMarker = `markers=color:0xc9982e%7Clabel:S%7C${encodeURIComponent(subj)}`;
  const compMarkers = list
    .map((c, i) => {
      const loc = c.lat != null && c.lng != null ? `${c.lat},${c.lng}` : qualify(c.address, city, state);
      return `markers=color:0x1a2332%7Clabel:${i + 1}%7C${encodeURIComponent(loc)}`;
    })
    .join("&");

  // If every pin has exact coords → let Static Maps auto-fit to those EXACT points
  // (all comps guaranteed visible, no mis-geocode blow-out). Otherwise center on the
  // subject at a clean neighborhood zoom so the frame is never blown out.
  const view = allBaked && subjectCoords
    ? ""
    : subjectCoords
      ? `center=${subjectCoords.lat},${subjectCoords.lng}&zoom=14&`
      : "";
  return `/api/staticmap?${view}size=640x360&scale=2&maptype=roadmap&${subjMarker}&${compMarkers}`;
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

// Keep the map tight on the subject + the comps that are actually nearby, so a
// far outlier doesn't zoom the whole frame out (close ones still overlap-free).
function nearComps(comps: Comp[], subjectCoords?: { lat: number; lng: number }) {
  if (!subjectCoords) return comps;
  const baked = comps.filter((c) => c.lat != null && c.lng != null);
  if (baked.length === 0) return comps;
  const R = 0.022; // ~1.5mi box around the subject
  const kept = baked.filter(
    (c) => Math.abs(c.lat! - subjectCoords.lat) < R && Math.abs(c.lng! - subjectCoords.lng) < R,
  );
  return kept.length >= 2 ? kept : baked;
}

export function CompsMap({ subjectAddress, subjectLabel, comps, city, state, verified, subjectCoords }: CompsMapProps) {
  const [errored, setErrored] = useState(false);
  const showImage = MAPS_ENABLED && !errored && comps.length > 0;
  const mapComps = nearComps(comps, subjectCoords);
  const omitted = comps.length - mapComps.length;

  return (
    <figure className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={staticMapUrl(subjectAddress, mapComps, city, state, subjectCoords)}
          alt={`Map of ${subjectLabel} and ${mapComps.length} comparable sales`}
          className="h-[360px] w-full object-cover"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      ) : (
        <SchematicComps comps={comps} />
      )}
      <figcaption className="flex items-center justify-between border-t border-navy/5 px-4 py-2.5 text-xs text-navy/50">
        <span className="flex items-center gap-1.5">
          <MapIcon className="h-3.5 w-3.5 text-gold" />
          {omitted > 0
            ? `Subject (S) + ${mapComps.length} nearest of ${comps.length} comps — full set in the table`
            : `Subject (S) vs ${comps.length} comparable sales`}
        </span>
        {!verified && <span className="text-navy/40">approximate location</span>}
      </figcaption>
    </figure>
  );
}

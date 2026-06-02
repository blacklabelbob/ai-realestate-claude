"use client";

import { useEffect, useState } from "react";
import { Satellite, MapPin, Navigation } from "lucide-react";

interface PropertySatelliteProps {
  address: string;
  verified?: boolean;
  /** caption shown under the image */
  caption?: string;
  /** pixel height of the image area when a real map IS available (default 340) */
  height?: number;
  /** hide the caption strip (compact use, e.g. gallery cards) */
  showCaption?: boolean;
  /** compact placeholder (used in gallery cards) */
  compact?: boolean;
  /** pre-geocoded coords — skips the runtime Nominatim call (production-safe) */
  coords?: { lat: number; lng: number };
  className?: string;
}

// Premium tier routed through our server-side proxy so the key stays secret.
const MAPS_ENABLED = process.env.NEXT_PUBLIC_MAPS_ENABLED === "true";

// --- Premium tier: Google Static Maps hybrid (satellite + labels), via /api/staticmap ---
function googleUrl(address: string) {
  const q = encodeURIComponent(address);
  return (
    `/api/staticmap?center=${q}` +
    `&zoom=19&size=640x340&scale=2&maptype=hybrid` +
    `&markers=color:0xc9982e%7C${q}`
  );
}

// --- Free tier: real Esri World Imagery satellite via a centered bbox (NO key) ---
function esriUrl(lat: number, lng: number, w = 640, h = 340) {
  const latDelta = 0.0012; // ~130m tall
  const lngDelta = (latDelta * w) / h / Math.cos((lat * Math.PI) / 180);
  const bbox = `${lng - lngDelta},${lat - latDelta},${lng + lngDelta},${lat + latDelta}`;
  return (
    `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export` +
    `?bbox=${bbox}&bboxSR=4326&imageSR=4326&size=${w},${h}&format=jpg&f=image`
  );
}

/**
 * Deliberate schematic placeholder — used only when no key AND geocoding fails
 * (e.g. an illustrative / non-real address). Reads as an intentional design element.
 */
function AerialPlaceholder({ address, compact }: { address: string; compact?: boolean }) {
  return (
    <div className="report-mapcard relative w-full overflow-hidden" style={{ height: compact ? 132 : 168 }}>
      <div className="report-mapgrid absolute inset-0" />
      <div className="report-mapdiag absolute inset-0" />
      <div className="absolute right-[14%] top-[22%] h-16 w-24 rounded-sm bg-forest/20 blur-[1px]" />
      <div className="absolute left-[20%] bottom-[18%] h-12 w-20 rounded-sm bg-navy/15 blur-[1px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="report-parcel flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gold/80 bg-gold/15 shadow-[0_0_0_6px_rgba(201,152,46,0.10)]">
          <MapPin className="h-5 w-5 text-gold" />
        </div>
      </div>
      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream/90 backdrop-blur-sm">
        <Satellite className="h-3 w-3 text-gold" /> Aerial preview
      </div>
      {!compact && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 truncate rounded-md bg-navy/70 px-2.5 py-1 text-xs text-cream/90 backdrop-blur-sm">
            <Navigation className="h-3 w-3 shrink-0 text-gold" />
            <span className="truncate">{address}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export function PropertySatellite({
  address,
  verified,
  caption,
  height = 340,
  showCaption = true,
  compact = false,
  coords: prebaked,
  className = "",
}: PropertySatelliteProps) {
  const [imgErrored, setImgErrored] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(prebaked ?? null);
  const [geo, setGeo] = useState<"idle" | "loading" | "ok" | "fail">(
    MAPS_ENABLED ? "idle" : prebaked ? "ok" : "loading",
  );

  // No Google proxy AND no pre-baked coords → geocode for free via OSM Nominatim.
  useEffect(() => {
    if (MAPS_ENABLED || prebaked) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`,
          { headers: { Accept: "application/json" } },
        );
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data) && data[0]?.lat && data[0]?.lon) {
          setCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
          setGeo("ok");
        } else {
          setGeo("fail");
        }
      } catch {
        if (!cancelled) setGeo("fail");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address]);

  const h = compact ? 168 : height;
  const showGoogle = MAPS_ENABLED && !imgErrored;
  const showEsri = !MAPS_ENABLED && geo === "ok" && coords && !imgErrored;
  const isLive = showGoogle || showEsri;

  return (
    <figure className={`overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm ${className}`}>
      {showGoogle ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={googleUrl(address)}
          alt={`Satellite view of ${address}`}
          className="w-full object-cover"
          style={{ height: h }}
          loading="lazy"
          onError={() => setImgErrored(true)}
        />
      ) : showEsri && coords ? (
        <div className="relative w-full" style={{ height: h }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={esriUrl(coords.lat, coords.lng, 640, Math.round((h / 340) * 340))}
            alt={`Satellite view of ${address}`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgErrored(true)}
          />
          {/* centered property marker */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-gold/25 shadow-[0_0_0_5px_rgba(201,152,46,0.25)] backdrop-blur-[1px]">
              <MapPin className="h-4 w-4 text-cream drop-shadow" />
            </div>
          </div>
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream/90 backdrop-blur-sm">
            <Satellite className="h-3 w-3 text-gold" /> Live satellite
          </div>
        </div>
      ) : (
        <AerialPlaceholder address={address} compact={compact} />
      )}
      {showCaption && (
        <figcaption className="flex items-center justify-between border-t border-navy/5 px-4 py-2.5 text-xs text-navy/50">
          <span className="flex items-center gap-1.5">
            <Satellite className="h-3.5 w-3.5 text-gold" />
            {caption ?? (isLive ? "Satellite view" : "Aerial / satellite view")}
            {showEsri && <span className="text-navy/35">· Esri World Imagery</span>}
          </span>
          {!verified && <span className="text-navy/40">approximate location</span>}
        </figcaption>
      )}
    </figure>
  );
}

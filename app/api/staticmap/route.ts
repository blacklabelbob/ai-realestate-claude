import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Server-side proxy for the Google Maps Static API.
// Keeps GOOGLE_MAPS_API_KEY secret (never shipped to the browser) and caches
// aggressively at the CDN so each property image hits Google at most once.
const SCALAR = ["center", "zoom", "size", "scale", "maptype", "format", "language", "region"];
const ALLOWED_MAPTYPE = new Set(["roadmap", "satellite", "hybrid", "terrain"]);

export async function GET(request: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    // Not configured → let the client fall back to the free Esri/schematic tier.
    return NextResponse.json({ error: "maps_not_configured" }, { status: 404 });
  }

  const inUrl = new URL(request.url);
  const inParams = inUrl.searchParams;

  const maptype = inParams.get("maptype") ?? "hybrid";
  if (!ALLOWED_MAPTYPE.has(maptype)) {
    return NextResponse.json({ error: "bad_maptype" }, { status: 400 });
  }

  const out = new URLSearchParams();
  for (const k of SCALAR) {
    const v = inParams.get(k);
    if (v) out.set(k, v);
  }
  // markers/path may repeat (subject + comp pins)
  for (const m of inParams.getAll("markers")) out.append("markers", m);
  for (const p of inParams.getAll("path")) out.append("path", p);
  out.set("key", key);

  const upstream = `https://maps.googleapis.com/maps/api/staticmap?${out.toString()}`;
  let res: Response;
  try {
    res = await fetch(upstream);
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
  if (!res.ok) {
    return NextResponse.json({ error: "upstream_error", status: res.status }, { status: 502 });
  }

  const body = await res.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/png",
      // 1 day in the browser, 7 days at the CDN — property imagery is static.
      "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
    },
  });
}

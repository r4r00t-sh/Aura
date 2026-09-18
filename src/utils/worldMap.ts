export const MAP_WIDTH = 950;
export const MAP_HEIGHT = 620;

export type MapDestination = {
  city: string;
  code: string;
  time: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  isHub?: boolean;
};

// Coordinates derived from country path bounds in src/assets/world-map.svg.
export const destinations: MapDestination[] = [
  { city: "London", code: "LHR", time: "7h 30m", lat: 51.47, lon: -0.45, x: 455, y: 177 },
  { city: "Paris", code: "CDG", time: "7h 45m", lat: 49.01, lon: 2.55, x: 461, y: 186 },
  { city: "Geneva", code: "GVA", time: "7h 10m", lat: 46.24, lon: 6.11, x: 471, y: 195 },
  { city: "New York", code: "JFK", time: "14h 20m", lat: 40.64, lon: -73.78, x: 278, y: 202 },
  { city: "Singapore", code: "SIN", time: "7h 05m", lat: 1.36, lon: 103.99, x: 740, y: 331 },
  { city: "Maldives", code: "MLE", time: "4h 10m", lat: 4.17, lon: 73.51, x: 664, y: 292 },
  { city: "Dubai", code: "DXB", time: "Hub", lat: 25.25, lon: 55.36, x: 601, y: 264, isHub: true },
  { city: "Moscow", code: "SVO", time: "5h 30m", lat: 55.97, lon: 37.41, x: 534, y: 141 },
  { city: "Mumbai", code: "BOM", time: "3h 05m", lat: 19.09, lon: 72.87, x: 655, y: 282 },
];

/** Light-theme map fills — scoped so inline <style> does not paint every SVG on the page. */
const LIGHT_MAP_STYLE = `.aura-world-map { background-color: #F7F3EB; }
  .aura-world-map path { fill: #C9BBA8; stroke: rgba(200, 169, 107, 0.4); stroke-width: 0.35; }`;

export function getWorldMapInnerMarkup(rawSvg: string) {
  const openTagEnd = rawSvg.indexOf(">");
  const closeTagStart = rawSvg.lastIndexOf("</svg>");
  if (openTagEnd === -1 || closeTagStart === -1) return "";
  let inner = rawSvg.slice(openTagEnd + 1, closeTagStart);
  // Replace embedded dark style block with light-theme land/ocean colors.
  inner = inner.replace(
    /<style[^>]*>[\s\S]*?<\/style>/i,
    `<style type="text/css"><![CDATA[\n  ${LIGHT_MAP_STYLE}\n]]></style>`
  );
  return inner;
}

export function getMapTransform(scale: number, panX: number, panY: number) {
  const cx = MAP_WIDTH / 2;
  const cy = MAP_HEIGHT / 2;
  return `translate(${cx + panX} ${cy + panY}) scale(${scale}) translate(${-cx} ${-cy})`;
}

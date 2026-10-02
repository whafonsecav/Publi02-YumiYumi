/* Parent-tile fallback for Yumi's offline MapLibre protocol. Load after map-tiles.js. */
(function (g) {
  "use strict";
  const FALLBACK_LIMIT = 512;
  const BITMAP_LIMIT = 96;
  let installed = false;
  const fallbackCache = new Map();
  const bitmapCache = new Map();
  const pack = () => g.YUMI_MAP_TILE_PACK;

  function touch(map, key, value, limit) {
    if (map.has(key)) map.delete(key);
    map.set(key, value);
    if (map.size > limit) {
      const oldest = map.keys().next().value;
      const stale = map.get(oldest);
      map.delete(oldest);
      if (stale && typeof stale.close === "function") stale.close();
    }
    return value;
  }
  function abortIfNeeded(ctrl) {
    if (ctrl && ctrl.signal && ctrl.signal.aborted) throw new Error("Tile request aborted");
  }
  function getTileBytes(key) {
    const p = pack();
    if (!p || !p.index[key]) return null;
    const dataURL = p.getTileDataURL(key);
    if (!dataURL) return null;
    const encoded = dataURL.slice(dataURL.indexOf(",") + 1);
    const raw = atob(encoded);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return bytes;
  }
  async function getBitmap(key) {
    if (bitmapCache.has(key)) return touch(bitmapCache, key, bitmapCache.get(key), BITMAP_LIMIT);
    const bytes = getTileBytes(key);
    if (!bytes) return null;
    const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/jpeg" }));
    return touch(bitmapCache, key, bitmap, BITMAP_LIMIT);
  }
  async function renderFallback(z, y, x, ctrl) {
    abortIfNeeded(ctrl);
    // Walk upward to the nearest available ancestor; z0–5 are complete, so a parent always exists.
    for (let parentZ = z - 1; parentZ >= 0; parentZ--) {
      const shift = z - parentZ;
      const scale = 2 ** shift;
      const parentX = Math.floor(x / scale);
      const parentY = Math.floor(y / scale);
      const parentKey = `${parentZ}/${parentY}/${parentX}`;
      if (!pack().index[parentKey]) continue;
      const cacheKey = `${z}/${y}/${x}`;
      if (fallbackCache.has(cacheKey)) return fallbackCache.get(cacheKey).slice(0).buffer;
      const bitmap = await getBitmap(parentKey);
      if (!bitmap) continue;
      const col = x - parentX * scale;
      const row = y - parentY * scale;
      const sx = col * bitmap.width / scale;
      const sy = row * bitmap.height / scale;
      const sw = bitmap.width / scale;
      const sh = bitmap.height / scale;
      const canvas = typeof OffscreenCanvas !== "undefined"
        ? new OffscreenCanvas(256, 256)
        : Object.assign(document.createElement("canvas"), { width: 256, height: 256 });
      const ctx = canvas.getContext("2d", { alpha: false });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, 256, 256);
      abortIfNeeded(ctrl);
      const blob = typeof canvas.convertToBlob === "function"
        ? await canvas.convertToBlob({ type: "image/jpeg", quality: 0.91 })
        : await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error("Could not render fallback tile")), "image/jpeg", 0.91));
      const result = new Uint8Array(await blob.arrayBuffer());
      touch(fallbackCache, cacheKey, result, FALLBACK_LIMIT);
      return result.slice(0).buffer;
    }
    throw new Error(`No ancestor tile available for offline tile ${z}/${y}/${x}`);
  }
  async function handle(params, ctrl) {
    abortIfNeeded(ctrl);
    const key = params.url.replace(/^offline:\/\//, "");
    const exact = pack() && pack().index[key];
    if (exact) {
      const tile = getTileBytes(key);
      return { data: tile.buffer.slice(tile.byteOffset, tile.byteOffset + tile.byteLength) };
    }
    const parts = key.split("/").map(Number);
    if (parts.length !== 3 || parts.some(n => !Number.isInteger(n))) throw new Error(`Invalid offline tile ${key}`);
    const [z, y, x] = parts;
    if (z < 1 || z > 22 || x < 0 || y < 0 || x >= 2 ** z || y >= 2 ** z) throw new Error(`Invalid offline tile ${key}`);
    return { data: await renderFallback(z, y, x, ctrl) };
  }
  function install(maplibregl = g.maplibregl) {
    if (!pack()) throw new Error("Load map-tiles.js before tile-fallback.js");
    if (!maplibregl || typeof maplibregl.addProtocol !== "function") throw new Error("MapLibre GL must be loaded before installing tile fallback");
    maplibregl.addProtocol("offline", handle);
    installed = true;
    return { installed, fallback: "nearest ancestor tile cropped to the matching quadrant and upscaled to 256×256" };
  }
  g.YUMI_MAP_TILE_FALLBACK = { install, handle, get installed() { return installed; } };
})(window);


import { describe, it, expect, vi, beforeEach } from "vitest";

// DATA_URL_BASE is read once at module load, so each test re-imports the module.
async function load(base: string | undefined) {
  vi.resetModules();
  if (base === undefined) vi.stubEnv("NEXT_PUBLIC_DATA_URL", "");
  else vi.stubEnv("NEXT_PUBLIC_DATA_URL", base);
  return import("../dataUrl");
}

describe("getDataUrl", () => {
  beforeEach(() => vi.unstubAllEnvs());

  it("serves local files from /data when no CDN is configured", async () => {
    const { getDataUrl } = await load(undefined);
    expect(getDataUrl("data/amharic_bible/1.json")).toBe("/data/amharic_bible/1.json");
    expect(getDataUrl("/data/niv/1.json")).toBe("/data/niv/1.json");
  });

  it("drops the data/ prefix and joins onto the CDN base", async () => {
    const { getDataUrl } = await load("https://cdn.example.com/bible-data");
    expect(getDataUrl("data/amharic_bible/1.json")).toBe("https://cdn.example.com/bible-data/amharic_bible/1.json");
  });

  it("does not double the slash when the base ends with one", async () => {
    const { getDataUrl } = await load("https://cdn.example.com/bible-data/");
    expect(getDataUrl("data/english/niv/2.json")).toBe("https://cdn.example.com/bible-data/english/niv/2.json");
  });
});

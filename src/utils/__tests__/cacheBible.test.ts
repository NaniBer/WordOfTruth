import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cacheBibleData } from "../cacheBible";
import { BIBLE_FOLDERS } from "../bibleData";
import { BIBLE_BOOKS } from "@/app/constants/books";

describe("cacheBibleData", () => {
  let put: ReturnType<typeof vi.fn>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    put = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("caches", { open: vi.fn().mockResolvedValue({ put }) });
    fetchMock = vi.fn().mockImplementation(async () => ({ ok: true, clone: () => ({}) }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("downloads every book in every translation and reports the totals", async () => {
    const result = await cacheBibleData();
    const expectedTotal = BIBLE_FOLDERS.length * BIBLE_BOOKS.length;
    expect(result).toEqual({ cached: expectedTotal, total: expectedTotal });
    expect(fetchMock).toHaveBeenCalledTimes(expectedTotal);
    expect(put).toHaveBeenCalledTimes(expectedTotal);
  });

  it("reports progress and a final message through setStatus", async () => {
    const setStatus = vi.fn();
    await cacheBibleData({ setStatus });
    expect(setStatus.mock.calls[0][0]).toBe("Caching Bible data...");
    expect(setStatus.mock.calls.some(([m]) => typeof m === "string" && m.startsWith("Cached 10/"))).toBe(true);
    const total = BIBLE_FOLDERS.length * BIBLE_BOOKS.length;
    expect(setStatus).toHaveBeenCalledWith(`Cached ${total} files for offline use`);
    vi.advanceTimersByTime(3000); // the message clears after a delay
    expect(setStatus).toHaveBeenLastCalledWith(null);
  });

  it("clears the status message after three seconds", async () => {
    const setStatus = vi.fn();
    await cacheBibleData({ setStatus });
    expect(setStatus).not.toHaveBeenCalledWith(null);
    vi.advanceTimersByTime(3000);
    expect(setStatus).toHaveBeenLastCalledWith(null);
  });

  it("refuses to start while offline and caches nothing", async () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    const setStatus = vi.fn();
    const result = await cacheBibleData({ setStatus });
    expect(result).toEqual({ cached: 0, total: 0 });
    expect(setStatus).toHaveBeenCalledWith("Cannot cache while offline");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("skips files that are missing on the server and keeps going", async () => {
    fetchMock.mockImplementation(async (url: string) => ({ ok: !url.includes("/2.json"), clone: () => ({}) }));
    const { cached, total } = await cacheBibleData();
    expect(cached).toBe(total - BIBLE_FOLDERS.length); // one missing file per folder
  });

  it("counts a network error for one file as a skip, not a failure of the whole run", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockImplementation(async (url: string) => {
      if (url.includes("/3.json")) throw new TypeError("network down");
      return { ok: true, clone: () => ({}) };
    });
    const { cached, total } = await cacheBibleData();
    expect(cached).toBe(total - BIBLE_FOLDERS.length);
  });
});

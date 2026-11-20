import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useChapterData } from "../useChapterData";
import { BIBLE_BOOKS } from "@/app/constants/books";
import { BIBLE_CACHE_NAME } from "@/utils/bibleData";

const genesis = BIBLE_BOOKS[0];
const exodus = BIBLE_BOOKS[1];

type Json = unknown;
const jsonResponse = (data: Json, ok = true) =>
  ({
    ok,
    json: async () => data,
    clone() {
      return jsonResponse(data, ok);
    },
  }) as unknown as Response;

/** Fake Cache Storage with a Map of url -> response. */
function makeCaches(initial: Record<string, Json>) {
  const store = new Map<string, unknown>(Object.entries(initial).map(([u, d]) => [u, jsonResponse(d)]));
  const cache = {
    match: vi.fn(async (url: string) => store.get(url)),
    put: vi.fn(async (url: string, response: { json: () => Promise<Json> }) => {
      store.set(url, response);
    }),
  };
  return { caches: { open: vi.fn(async (name: string) => (name === BIBLE_CACHE_NAME ? cache : undefined)) }, cache };
}

const file = (verses: string[]) => ({ chapters: [{ chapter: "1", verses }] });
const AM = (folder: string, n: number) => `/data/${folder}/${n}.json`;

describe("useChapterData", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("serves a fully cached chapter immediately and refreshes it in the background", async () => {
    const { caches, cache } = makeCaches({
      [AM("amharic_bible", 1)]: file(["cached am"]),
      [AM("english/niv", 1)]: file(["cached en"]),
    });
    vi.stubGlobal("caches", caches);
    // The refresh stays pending until the test releases it, so the cached text is observable.
    let releaseRefresh!: () => void;
    const gate = new Promise<void>((r) => (releaseRefresh = r));
    vi.mocked(fetch).mockImplementation(async (url) => {
      await gate;
      return jsonResponse(file([url.toString().includes("english") ? "fresh en" : "fresh am"]));
    });

    const { result } = renderHook(() =>
      useChapterData({ book: genesis, chapter: 1, amharicVersion: "amharic_bible", englishVersion: "niv" }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.verses).toEqual(["cached am"]);
    expect(result.current.englishVerses).toEqual(["cached en"]);
    expect(cache.put).not.toHaveBeenCalled();

    // Releasing the refresh replaces the shown text and writes both files back to the cache.
    await act(async () => releaseRefresh());
    await waitFor(() => expect(result.current.verses).toEqual(["fresh am"]));
    expect(result.current.englishVerses).toEqual(["fresh en"]);
    expect(cache.put).toHaveBeenCalledTimes(2);
  });

  it("writes a readable copy to the cache during refresh (regression: body was read before cloning)", async () => {
    const { caches, cache } = makeCaches({
      [AM("amharic_bible", 1)]: file(["old"]),
      [AM("english/niv", 1)]: file(["old"]),
    });
    vi.stubGlobal("caches", caches);
    vi.mocked(fetch).mockImplementation(async () => jsonResponse(file(["new"])));

    renderHook(() => useChapterData({ book: genesis, chapter: 1, amharicVersion: "amharic_bible", englishVersion: "niv" }));
    await waitFor(() => expect(cache.put).toHaveBeenCalledTimes(2));

    const stored = cache.put.mock.calls[0][1] as { json: () => Promise<Json> };
    await expect(stored.json()).resolves.toEqual(file(["new"]));
  });

  it("fetches from the network when the cache is incomplete", async () => {
    const { caches } = makeCaches({ [AM("amharic_bible", 1)]: file(["only amharic cached"]) });
    vi.stubGlobal("caches", caches);
    vi.mocked(fetch).mockImplementation(async (url) =>
      jsonResponse(file([url.toString().includes("english") ? "net en" : "net am"])),
    );

    const { result } = renderHook(() =>
      useChapterData({ book: genesis, chapter: 1, amharicVersion: "amharic_bible", englishVersion: "niv" }),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.verses).toEqual(["net am"]);
    expect(result.current.englishVerses).toEqual(["net en"]);
    expect(fetch).toHaveBeenCalledWith(AM("amharic_bible", 1));
    expect(fetch).toHaveBeenCalledWith("/data/english/niv/1.json");
  });

  it("shows an empty chapter (not an error) when a file is missing on the server", async () => {
    vi.stubGlobal("caches", makeCaches({}).caches);
    vi.mocked(fetch).mockImplementation(async () => jsonResponse(null, false));

    const { result } = renderHook(() =>
      useChapterData({ book: genesis, chapter: 1, amharicVersion: "amharic_bible", englishVersion: "niv" }),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.verses).toEqual([]);
    expect(result.current.englishVerses).toEqual([]);
  });

  it("clears the chapter when the network throws", async () => {
    vi.stubGlobal("caches", makeCaches({}).caches);
    vi.mocked(fetch).mockRejectedValue(new TypeError("offline"));

    const { result } = renderHook(() =>
      useChapterData({ book: genesis, chapter: 1, amharicVersion: "amharic_bible", englishVersion: "niv" }),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.verses).toEqual([]);
  });

  it("ignores a slow response for a chapter the reader has already left", async () => {
    vi.stubGlobal("caches", makeCaches({}).caches);
    let resolveSlow!: (v: unknown) => void;
    const slow = new Promise((r) => (resolveSlow = r));
    // Only the first request (chapter 1) is slow; the book file URL is the same for every chapter.
    vi.mocked(fetch).mockImplementationOnce(async () => slow as never);
    vi.mocked(fetch).mockImplementation(async () =>
      jsonResponse({ chapters: [{ chapter: "1", verses: ["ch1 text"] }, { chapter: "2", verses: ["ch2 text"] }] }),
    );

    const { result, rerender } = renderHook(
      ({ chapter }) => useChapterData({ book: genesis, chapter, amharicVersion: "amharic_bible", englishVersion: "niv" }),
      { initialProps: { chapter: 1 } },
    );
    // Make sure chapter 1's request is really in flight before the reader moves on.
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2)); // Amharic + English
    rerender({ chapter: 2 });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.verses).toEqual(["ch2 text"]);

    // The stale chapter-1 response now arrives; it must not overwrite chapter 2.
    await act(async () => {
      resolveSlow(jsonResponse({ chapters: [{ chapter: "1", verses: ["STALE ch1"] }] }));
      await Promise.resolve();
    });
    expect(result.current.verses).toEqual(["ch2 text"]);
  });

  it("does nothing for a book that is not in the canon", () => {
    vi.stubGlobal("caches", makeCaches({}).caches);
    const { result } = renderHook(() =>
      useChapterData({
        book: { ...exodus, name: "Not A Book" },
        chapter: 1,
        amharicVersion: "amharic_bible",
        englishVersion: "niv",
      }),
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(true);
  });
});

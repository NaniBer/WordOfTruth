type CacheBibleOptions = {
  setStatus?: (msg: string | null) => void;
  onProgress?: (cached: number, total: number) => void;
};

const BOOKS_PER_TESTAMENT_APPROX = 66;

export const cacheBibleData = async ({
  setStatus,
  onProgress,
}: CacheBibleOptions = {}) => {
  if (!navigator.onLine) {
    setStatus?.("Cannot cache while offline");
    setTimeout(() => setStatus?.(null), 3000);
    return;
  }

  setStatus?.("Caching Bible data...");

  const booksToCache = [
    "amharic_bible",
    "amharic_nasb",
    "english/niv",
    "english/nlt",
    "english/csb",
  ];

  let cached = 0;
  const total = booksToCache.length * BOOKS_PER_TESTAMENT_APPROX;

  try {
    const cache = await caches.open("wordoftruth-v1");

    for (const bookPath of booksToCache) {
      for (let i = 1; i <= 66; i++) {
        try {
          const url = `/data/${bookPath}/${i}.json`;
          const response = await fetch(url);

          if (response.ok) {
            await cache.put(url, response.clone());
            cached++;

            onProgress?.(cached, total);

            if (cached % 10 === 0) {
              setStatus?.(`Cached ${cached}/${total} files...`);
            }
          }
        } catch (err) {
          console.error(`Failed to cache ${bookPath}/${i}.json`);
        }
      }
    }

    setStatus?.(`Cached ${cached} files for offline use`);

    setTimeout(() => setStatus?.(null), 3000);
  } catch (error) {
    console.error("Cache error:", error);
    setStatus?.("Failed to cache data");

    setTimeout(() => setStatus?.(null), 3000);
  }
};

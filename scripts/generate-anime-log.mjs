import { readFile, writeFile } from "node:fs/promises";

const scriptsDirectory = new URL(".", import.meta.url);
const titlesPath = new URL("anime-titles.json", scriptsDirectory);
const cachePath = new URL("anime-log-cache.json", scriptsDirectory);
const outputPath = new URL("../src/anime-log.generated.ts", scriptsDirectory);

const titles = JSON.parse(await readFile(titlesPath, "utf8"));
let cache = {};

try {
  cache = JSON.parse(await readFile(cachePath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const chunk = (items, size) => Array.from(
  { length: Math.ceil(items.length / size) },
  (_, index) => items.slice(index * size, (index + 1) * size),
);

const getAnimeLog = () => titles.flatMap(({ title, highlighted }) => {
  const anime = cache[title];
  if (!anime?.coverUrl || !anime?.malUrl) return [];

  return [{ ...anime, highlighted, review: "" }];
});

const writeAnimeLog = () => writeFile(
  outputPath,
  `export type AnimeLogEntry = {\n  title: string;\n  coverUrl: string;\n  malUrl: string;\n  highlighted: boolean;\n  review: string;\n};\n\nexport const animeLog: AnimeLogEntry[] = ${JSON.stringify(getAnimeLog(), null, 2)};\n`,
);

const persist = async () => {
  await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
  await writeAnimeLog();
};

const getRetryDelay = (retryAfter) => {
  if (!retryAfter) return 120_000;

  const seconds = Number(retryAfter);
  if (!Number.isNaN(seconds)) return seconds * 1_000;

  return Math.max(Date.parse(retryAfter) - Date.now(), 0);
};

const buildQuery = (entries) => `query {
${entries.map((entry, index) => `  a${index}: Media(search: ${JSON.stringify(entry.title)}, type: ANIME) {
    title { romaji english }
    coverImage { extraLarge }
    siteUrl
  }`).join("\n")}
}`;

const fetchChunk = async (entries) => {
  const request = () => fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: buildQuery(entries) }),
  });

  let response = await request();
  if (response.status === 429) {
    await wait(getRetryDelay(response.headers.get("Retry-After")));
    response = await request();
  }

  return response;
};

const persistAnime = async (entry, anime) => {
  cache[entry.title] = {
    title: anime.title.english ?? anime.title.romaji,
    coverUrl: anime.coverImage?.extraLarge,
    malUrl: anime.siteUrl,
  };
  await persist();
};

const retryIndividually = async (entries) => {
  for (const entry of entries) {
    try {
      const response = await fetchChunk([entry]);
      const responseBody = await response.text();

      if (response.status !== 200) {
        console.warn(`Skipping "${entry.title}": AniList returned ${response.status}: ${responseBody}`);
      } else {
        const payload = JSON.parse(responseBody);
        const anime = payload.errors?.length ? null : payload.data?.a0;

        if (!anime) {
          console.warn(`Skipping "${entry.title}": AniList returned ${responseBody}`);
        } else {
          await persistAnime(entry, anime);
        }
      }
    } catch (error) {
      console.warn(`Skipping "${entry.title}" after its individual retry:`, error);
    }

    await wait(1100);
  }
};

await writeAnimeLog();

const uncachedTitles = titles.filter(({ title }) => !cache[title]);
const chunks = chunk(uncachedTitles, 10);

for (const [chunkIndex, entries] of chunks.entries()) {
  try {
    const response = await fetchChunk(entries);
    const responseBody = await response.text();

    if (response.status !== 200) {
      console.warn(`AniList batch failed with status ${response.status}: ${responseBody}`);
      await retryIndividually(entries);
    } else {
      let payload;
      try {
        payload = JSON.parse(responseBody);
      } catch {
        console.warn(`AniList batch returned invalid JSON: ${responseBody}`);
        payload = { errors: [{ message: "Invalid JSON response" }] };
      }

      if (payload.errors?.length) {
        console.warn(`AniList batch returned GraphQL errors: ${responseBody}`);
        await retryIndividually(entries);
      } else {
        for (const [entryIndex, entry] of entries.entries()) {
          const anime = payload.data?.[`a${entryIndex}`];
          if (!anime) {
            console.warn(`No AniList match found for "${entry.title}".`);
            continue;
          }

          await persistAnime(entry, anime);
        }
      }
    }
  } catch (error) {
    console.warn(`AniList batch threw an error; retrying titles individually:`, error);
    await retryIndividually(entries);
  }

  if (chunkIndex < chunks.length - 1) await wait(3_000);
}


const notice = e => new Notice(e, 5000);
const log = e => console.log(e);
const API_KEY_OPTION = "OMDb API Key";
const API_URL = "https://www.omdbapi.com/";

let QuickAdd, Settings;

async function start(e, t) {
  QuickAdd = e;
  Settings = t;

  const i = await QuickAdd.quickAddApi.inputPrompt("Enter movie title or IMDB ID:");

  if (!i) {
    throw notice("No query entered."), new Error("No query entered.");
  }

  let r;
  if (isImdbId(i)) {
    r = await getByImdbId(i);
  } else {
    const e = await getByQuery(i);
    const t = await QuickAdd.quickAddApi.suggester(e.map(formatTitleForSuggestion), e);
    if (!t) {
      throw notice("No choice selected."), new Error("No choice selected.");
    }
    r = await getByImdbId(t.imdbID);
  }

  QuickAdd.variables = {
    ...r,
    actorLinks: linkifyList(r.Actors.split(",")),
    genreLinks: linkifyList(r.Genre.split(",")),
    directorLink: "N/A" === r.Director ? " " : linkifyList(r.Director.split(",")),
    fileName: replaceIllegalFileNameCharactersInString(r.Title),
    typeLink: `[[${"movie" === r.Type ? "Movies" : "Series"}]]`
  };
}

function isImdbId(e) {
  return /^tt\d+$/.test(e);
}

function formatTitleForSuggestion(e) {
  return `(${e.Type === "movie" ? "M" : "TV"}) ${e.Title} (${e.Year})`;
}

async function getByQuery(e) {
  const t = await apiGet(API_URL, { s: e });

  if (!t.Search || !t.Search.length) {
    throw notice("No results found."), new Error("No results found.");
  }

  return t.Search;
}

async function getByImdbId(e) {
  const t = await apiGet(API_URL, { i: e });

  if (!t) {
    throw notice("No results found."), new Error("No results found.");
  }

  return t;
}

function linkifyList(e) {
  return e.length === 0 ? "" : e.length === 1 ? `[[${e[0]}]]` : e.map((e) => `[[${e.trim()}]]`).join(", ");
}

function replaceIllegalFileNameCharactersInString(e) {
  return e.replace(/[\\,#%&\{\}\/*<>?$\'\":@]*/g, "");
}

async function apiGet(e, t) {
  let i = new URL(e);

  if (t) {
    Object.keys(t).forEach((e) => i.searchParams.append(e, t[e]));
  }

  i.searchParams.append("apikey", Settings["OMDb API Key"]);

  const r = await request({
    url: i.href,
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  return JSON.parse(r);
}

module.exports = {
  entry: start,
  settings: {
    name: "Movie Script",
    author: "Christian B. B. Houmann",
    options: {
      "OMDb API Key": {
        type: "text",
        defaultValue: "",
        placeholder: "OMDb API Key"
      }
    }
  }
};

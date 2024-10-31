
const notice = e => new Notice(e, 5000);
const log = e => console.log(e);
const API_KEY_OPTION = "OMDb API Key";
const API_URL = "https://www.omdbapi.com/";

let QuickAdd, Settings;

async function start(e, t) {
  QuickAdd = e;
  Settings = t;

  const i = await QuickAdd.quickAddApi.inputPrompt("Enter :");

  // TODO: This is where you would want to use metadata menu API to get the value straight out of the note
  // This will be convenient if Drafts can prepopulate the note with the input so the user does not need to provide any.

//   if (!i) {
//     throw notice("No query entered."), new Error("No query entered.");
//   }

//   let r;
//   if (isImdbId(i)) {
//     r = await getByImdbId(i);
//   } else {
//     const e = await getByQuery(i);
//     const t = await QuickAdd.quickAddApi.suggester(e.map(formatTitleForSuggestion), e);
//     if (!t) {
//       throw notice("No choice selected."), new Error("No choice selected.");
//     }
//     r = await getByImdbId(t.imdbID);
//   }

  QuickAdd.variables = {
    ...r,
    // NOTE: this is where values get taken out of the response and put into the quickadd variables
    actorLinks: linkifyList(r.Actors.split(",")),
  };
}


// function linkifyList(e) {
//     return e.length === 0 ? "" : e.length === 1 ? `[[${e[0]}]]` : e.map((e) => `[[${e.trim()}]]`).join(", ");
//   }



// async function getByQuery(e) {
//   const t = await apiGet(API_URL, { s: e });

//   if (!t.Search || !t.Search.length) {
//     throw notice("No results found."), new Error("No results found.");
//   }

//   return t.Search;
// }


// async function apiGet(e, t) {
//   let i = new URL(e);

//   if (t) {
//     Object.keys(t).forEach((e) => i.searchParams.append(e, t[e]));
//   }

//   i.searchParams.append("apikey", Settings["OMDb API Key"]);

//   const r = await request({
//     url: i.href,
//     method: "GET",
//     cache: "no-cache",
//     headers: { "Content-Type": "application/json" },
//   });

//   return JSON.parse(r);
// }

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
      },

    }
  }
};

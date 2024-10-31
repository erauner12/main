// https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html
// function my_function (msg) {
//     return `Message from my script: ${msg}`;
// }
// module.exports = my_function;

// <% tp.user.my_script("Hello World!") %>



// https://cajueiro.me/post/obsidian-tutorial-meta-bind-templater/
async function my_function(file) {
    const options_file = app.vault.getAbstractFileByPath(file);
    const result = await app.vault.read(options_file);

    // could easily add to this static file from drafts for example
    // Breakfast ☕
    // Clean 🐈 💩
    // Clean 🐶 🍺
    // Dinner 🥘
    // Lunch 🍲
    // Take out 🗑️
    // Wash the dishes 🧼
    // const result = "Breakfast ☕\nClean 🐈 💩\nClean 🐶 🍺\nDinner 🥘\nLunch 🍲\nTake out 🗑️\nWash the dishes 🧼";


    return result
      .split("\n")
      .map((option) => `"${option}"`)
      .join(", ");
}

module.exports = my_function;

// USAGE:
// ```meta-bind
// INPUT[multi_select(
//   <% tp.user.my_script("Databases/Properties/domestic_tasks.md") %>
// ):Domestic_tasks]
// ```
// Templater: Replace templates in the active file
  

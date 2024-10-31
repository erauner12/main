// https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html
// function my_function (msg) {
//     return `Message from my script: ${msg}`;
// }
// module.exports = my_function;

// <% tp.user.my_script("Hello World!") %>


// https://cajueiro.me/post/obsidian-tutorial-meta-bind-templater/
async function create_bullet_list(file) {
    const options_file = app.vault.getAbstractFileByPath(file);
    const result = await app.vault.read(options_file);

    const listItems = result.split("\n")
        .map(option => {
            const [title, url] = option.split("|");
            return `- [${title}](${url})`;
        })
        .join("\n");

    return listItems;
}


module.exports = create_bullet_list;

// USAGE:
// <% tp.user.create_reading_list("_Databases/Properties/reading_list.md") %>
// https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html
// function my_function (msg) {
//     return `Message from my script: ${msg}`;
// }
// module.exports = my_function;

// <% tp.user.my_script("Hello World!") %>


// https://cajueiro.me/post/obsidian-tutorial-meta-bind-templater/
// Function to get file names based on your logic

// Main function to choose a project
async function refactor_note(tp) {

    console.log(tp.file.selection());
}

module.exports = refactor_note;



// USAGE:
// <% tp.user.refactor_note("") %>

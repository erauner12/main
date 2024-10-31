// https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html
// function my_function (msg) {
//     return `Message from my script: ${msg}`;
// }
// module.exports = my_function;

// <% tp.user.my_script("Hello World!") %>


// https://cajueiro.me/post/obsidian-tutorial-meta-bind-templater/
// Function to get file names based on your logic
async function getFiles(app, folders, folderExclude) {
    return app.vault.getMarkdownFiles()
        .filter(file => {
            return folders.some(folder => file.path.match(folder));
        })
        .filter(file => {
            // Check if folderExclude field exists
            if (folderExclude) {
                return !file.path.match(folderExclude);
            } else {
                return file;
            }
        })
        // Sort by File Name
        .sort((a, b) => a.basename.localeCompare(b.basename))
        // Sort by Folder
        .sort((a, b) => a.parent.path.localeCompare(b.parent.path))
        .map(file => file.basename.replace(".md", ""));
}

// Function to choose a project using the suggester
async function chooseWithSuggester(tp, files) {
    return await tp.system.suggester(
        (file) => file,
        files,
        false,
        // can either use placeholder or prompt
        "Choose a project",
        undefined
    );
}

// Main function to choose a project
async function choose_project(tp) {
    // You can add more folders to this array as needed
    const folders = ["Projects/Home ==-", "Projects/Side ==-", "Projects/Work ==-"];
    const folderExclude = "Projects/archive";

    const files = await getFiles(app, folders, folderExclude);
    const chosenProject = await chooseWithSuggester(tp, files);

    // Format the chosen project with double square brackets
    return `${chosenProject}`;
}

module.exports = choose_project;



// USAGE:
// <% tp.user.choose_project("") %>


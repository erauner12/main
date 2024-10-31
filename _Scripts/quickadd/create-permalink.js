module.exports = async function createPermalink(params) {

    const metaEditApi = params.app.plugins.plugins["metaedit"].api;
    const activeFile = params.app.workspace.getActiveFile();

    // Check if the active file is valid and its extension is "md"
    if (!activeFile || activeFile.extension !== "md") {
        new Notice("No valid active file");
        return;
    }

    // Check if the active file is in the "Content/Notes/" path
    if (!activeFile.path.includes("Content/Notes/")) {
        // console.log("File is not in the 'Content/Notes/' path. Exiting.");
        return;
    }

    let titleToRename = await metaEditApi.getPropertyValue("title", activeFile);
    let processedTitle = titleToRename.replace(/ /g, "-").toLowerCase();
    let context = await metaEditApi.getPropertyValue("context", activeFile);

    if (context && context.trim().length > 0) {
        const contextParts = context.split("/");
        const lastContextPart = contextParts[contextParts.length - 1].toLowerCase();

        // If the last part of context matches processedTitle
        if (lastContextPart === processedTitle) {
            titleToRename = context;
        } else {
            titleToRename = `${context}/${processedTitle}`;
        }
    } else {
        titleToRename = processedTitle;
    }

    // Fetch the current permalink value
    let currentPermalink = await metaEditApi.getPropertyValue("permalink", activeFile);

    // Check if the current permalink is already what we expect
    if (currentPermalink === titleToRename) {
        // console.log("Permalink is already updated. No changes needed.");
        return;
    }

    await metaEditApi.update("permalink", titleToRename, activeFile);
}

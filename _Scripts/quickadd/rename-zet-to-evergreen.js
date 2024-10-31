// Mark Tag as Processed
// https://forum.obsidian.md/t/quickadd-plugin/20032/24
const PROCESSED_TAG = "to-process";

// until I figure out how to share code, I'm going to have some redundant code here
module.exports = async function processFile(params) {

    const {app} = params;

    const metaEditApi = params.app.plugins.plugins["metaedit"].api;
    const activeFile = params.app.workspace.getActiveFile();
    const evergreenPath = "Evergreen/";

    if (! activeFile && activeFile.extension !== "md") {
        new Notice("No valid active file");
        return;
    }

    let titleToRename = await app.plugins.plugins["metaedit"].api.getPropertyValue("title", activeFile);

    await app.fileManager.renameFile(
        activeFile, evergreenPath + "/" + titleToRename + ".md");
}

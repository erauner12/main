// Move Processed File
// https://forum.obsidian.md/t/plugin-to-automatically-replace-text-and-move-note/34046/4
const PROCESSED_TAG = "to-process";
module.exports = async function moveProcessedFile(params) {
    const { app } = params;

    // Get file
    const activeFile = this.app.workspace.getActiveFile();

    // Get customer name and move to its folder

    let processedPath = await app.plugins.plugins["metaedit"].api.getPropertyValue(
        "processed-path",
        activeFile
    );
    
    // commented out for testing
    // console.log(Object.prototype.toString.call(processedPath));

    // TODO: if the path provided is not a valid path, then do not move the file
    if (processedPath && processedPath.length > 0) {
        // rename file
        await app.fileManager.renameFile(
          activeFile,
          processedPath + "/" + activeFile.name
        );
    }
  };

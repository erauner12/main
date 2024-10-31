// Mark Tag as Processed
// https://forum.obsidian.md/t/quickadd-plugin/20032/24
const PROCESSED_TAG = "to-process";

// until I figure out how to share code, I'm going to have some redundant code here
module.exports = async function processFile(params){
    
    const { app } = params;
    
    
    const { fileFields } = app.plugins.plugins["metadata-menu"].api;
    const { postValues } = app.plugins.plugins["metadata-menu"].api;

    const activeFile = app.workspace.getActiveFile();

    var currentFields = await fileFields(activeFile, "tags")

    if (!currentFields["tags"]["value"].includes(PROCESSED_TAG)) {
        console.log("no to-process tag found")
        return
    }

    // generate a fieldsPayload from the currentFields
    var currentTags = currentFields["tags"]["value"]
    /// filter out the "to-process" tag
    var filteredTags = currentTags.filter(function(value) {
        return value !== PROCESSED_TAG;
    });
    // get curentTags length and use that for previousItemsCount
    var fieldsPayload = [
        {
          name: "tags",
          payload: {
            // value: "to-process, context/side, test, another, andanother, yo",
            value: filteredTags.join(", "),
            previousItemsCount: currentTags.length
          }
        },
    ];
    await postValues(activeFile, fieldsPayload)
}



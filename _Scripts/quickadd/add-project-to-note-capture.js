// Mark Tag as Processed
// https://forum.obsidian.md/t/quickadd-plugin/20032/24


// until I figure out how to share code, I'm going to have some redundant code here
module.exports = async function addProjectToNote(params){
    const { app } = params;

    // const dv = this.app.plugins.plugins["dataview"] api;
    const { fileFields } = app.plugins.plugins["metadata-menu"].api;
    const { postValues } = app.plugins.plugins["metadata-menu"].api;
    const activeFile = params.app.workspace.getActiveFile();

    // commented out because I decided to default every null value to an empty string

    const getCurrentProperty = async (file, yamlKey) => {
        var currentFields = await fileFields(file)
        var currentValue = currentFields[yamlKey]["value"]
        // console.log(currentValue)
        return currentValue
    }

    const changeProject = async (file, yamlKey, newValue) => {
        var currentFields = await fileFields(activeFile, yamlKey)
        var currentValue = currentFields[yamlKey]["value"]
        // console.log(currentValue)
        // console.log(currentValue)


        
        // get curentTags length and use that for previousItemsCount
        var fieldsPayload = [
            {
                name: yamlKey,
                payload: {
                    value: newValue
                }
            },
        ];
        postValues(file, fieldsPayload)
    }




    const changeLabels = async (file, yamlKey, newValue) => {
        // var currentFields = await fileFields(activeFile, yamlKey)
        // var currentValue = currentFields[yamlKey]["value"]
        
        // get curentTags length and use that for previousItemsCount
        var fieldsPayload = [
            {
                name: yamlKey,
                payload: {
                    value: "[" + newValue + "]",
                    // previousItemsCount: currentValue.length
                }
            },
        ];
        console.log("getting almost to postValues")
        postValues(file, fieldsPayload)
    }


    console.log(await getCurrentProperty(activeFile, "project"))
    console.log(params.variables["projectName"])
    if (await getCurrentProperty(activeFile, "project") === params.variables["projectName"]) {
        console.log("Same Project, no changes needed")
        return
    }
    else{
        changeProject(activeFile, "project", params.variables["projectName"])

        // TODO: put this in a function so you don't have to repeat smaller functions
        var currentTags = await getCurrentProperty(activeFile, "tags")
        console.log("getting past the currentTags line")

        // console.log(currentTags)

        // filter out all but "context/side", "context/home", "context/work"
        var filteredTags = currentTags.filter(function(value) {
            return value === "context/side" | value === "context/home" | value === "context/work";
        });
        // // remove "context/" from each item in filteredTags
        filteredTags = filteredTags.map(function(value) {
            return value.replace("context/", "");
        });
        filteredTags = filteredTags.slice(0, 1);

        // TODO: stop using labels for this entirely and just use context tags at some point


        console.log(filteredTags)

        // update labels with string first item in filteredTags
        changeLabels(activeFile, "labels", "context/" + filteredTags[0])
    }


}



function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

// Mark Tag as Processed
// https://forum.obsidian.md/t/quickadd-plugin/20032/24


// until I figure out how to share code, I'm going to have some redundant code here
module.exports = async function testFile(params){
    // const dv = this.app.plugins.plugins["dataview"] api;


    const { app } = params;

    // const lastActiveFile = params.app.workspace.lastActiveFile;
    qa = app.plugins.plugins.quickadd.api


    
    // suggester
    const pickedFile = await params.quickAddApi.suggester(
        (file) => file.basename,
        params.app.vault.getMarkdownFiles()
        );
        
    // metaedit
    let alias = await app.plugins.plugins["metaedit"].api.getPropertyValue(
        "aliases",
        pickedFile
    );

    // yes or no prompt
    // testAnswer = await qa.yesNoPrompt("test header","test text");

    // input prompt
    // testInput = await qa.inputPrompt("test header","test placeholder", "test value");

    // wide input prompt
    // testWideInput = await qa.wideInputPrompt("test header","test placeholder", "test value");

    // checkbox prompt
    // testCheckbox = await qa.checkboxPrompt(["not checked 1","checked 2","not checked 3"],["not checked 1","checked 2","not checked3"]);

    // set clipboard
    // await qa.utility.setClipboard("this is my clipboard text");

    // get clipboard
    // my_clipboard = await quickAddApi.utility.getClipboard();

    

    console.log(alias);
}



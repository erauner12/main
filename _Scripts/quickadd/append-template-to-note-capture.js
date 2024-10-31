// Mark Tag as Processed
// https://forum.obsidian.md/t/quickadd-plugin/20032/24


// until I figure out how to share code, I'm going to have some redundant code here
module.exports = async function appendTemplateToNote(params){
    const { app } = params;

    console.log(params)

    // call templater with choice

    // find the first # in the note, append string after that line

    // const firstHash = note.indexOf('#');



    
    // params.quickAddApi.executeChoice('test');
    // Templater: Replace templates in the active file
}


function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

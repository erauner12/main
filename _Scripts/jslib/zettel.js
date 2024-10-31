class Zettel { // https://github.com/saml-dev/obsidian-custom-js/issues/13#issuecomment-960384576

    displayMetadata(dv) { // call displayLinks
        this.displayTags(dv);
        // this.displayLinks(dv);
        // this.displayProjectName(dv);
        // this.appendToDo(dv);
        this.displaySourceUrl(dv);
        this.insertToggleMetadataButton(dv.el("div"));
        // this.addNoteToProjectCommandButton(dv.el("div"));
        // this.removeTodoistLink(dv.el("div"));
        // this.insertTemplateButton(dv.el("div"));
        // this.applyTemplateButton(dv.el("div"));
        this.createNewNoteTemplateButton(dv.el("div"));
        this.createLintCommandButton(dv.el("div"));
        // this.createGoogleButton(dv.el("div"));
        // this.createGptButton(dv.el("div"));
    }
    // ////////////////////////////////////////////////////////////////////////////////////////////
    // everytime you create a new metadata option/function, you need to call it in displayMetadata
    // ////////////////////////////////////////////////////////////////////////////////////////////

    removeTodoistLink(container) {
        // construct obsidian advanced url link to regex replace in the
        // https://vinzent03.github.io/obsidian-advanced-uri/actions/search

        const {createButton} = app.plugins.plugins["buttons"]

        const activeFile = app.workspace.getActiveFile();


        // create the url
        var obsidianUrl = "obsidian://advanced-uri?vault=main&filepath=";

        // searchregex, replace	Uses searchregex to replace every match with replace in the current file
        // add the file name
        obsidianUrl += encodeURI(activeFile.path);
        // add the search regex
        obsidianUrl += "&searchregex=";
        // add the search regex
        // test = "\[\✔️\]\(https:\/\/todoist\.com\/showTask\?id\=\d{10}\)\s\^[a-zA-Z0-9]{5}\b"
        // obsidianUrl += encodeURI("\\\[\\\✔️\\\]\\\(https:\\/\\/todoist\\.com\\/showTask\\?id") + "%3D" + encodeURI("\\d{10}\\)\\s\\^[a-zA-Z0-9]{5}");
        obsidianUrl += encodeURI("%%[todoist_id::\s") + "%3D" + encodeURI("\\d{10}\\]%%");

        // add the replace
        obsidianUrl += "&replace=";
        // add the replace
        obsidianUrl += "";
        // construct markdown link
        var markdownLink = "[Remove Taskbone]" + "(" + obsidianUrl + ")";

        return [createButton(
                {
                    app,
                    el: container,
                    args: {
                        name: "Replace Taskbone Link",
                        type: "link",
                        action: obsidianUrl
                    }
                }
            )]

    }

    // TODO: add a conditional of some sort to paste clipboard contents
    // perhaps this should just be a separate template (command + n) (new zettel from clipboard)

    displayTags(dv) { // display the tags
        let tags = dv.current().file.tags;
        if (tags.length > 0) {
            dv.paragraph(tags.join(" "));
        }
    }

    displaySourceUrl(dv) {
        let page = dv.current();
        if (page.source) {
            return dv.paragraph("**source:** " + page.source)
        }
    }

    displayProjectName(dv) {
        let page = dv.current();
        if (page.project) {
            // TODO: link to todoist project
            // need to store todoist project id after creating the project with quickadd
            return dv.paragraph("**project:** " + page.project)
        }
    }


    displayLinkValue(dv, links, linkType) { // Nicely Render all the inlinks to the current note on a single line
        let mylinks = [];


        for (let link of links) { // check if link path exists
            console.info(link)
            if (link.path != dv.current().file.path) {

                // TODO: if a link does not have a file, then it is a broken link
                // try catch is fine for now but should probably be handled differently
                try {
                    let linkFile = dv.page(link.path).file
                    // fileLink is a link to the file
                    // with the alias as the text of the link if it exists
                    // or the file name if it doesn't exist
                    let displayName = linkFile.aliases ? linkFile.aliases[0] : linkFile.name
                    let fileLink = dv.fileLink(linkFile.path, false, displayName)
                    mylinks.push(fileLink)
                } catch (error) {
                    console.error(error)
                }
            }
        }
        var mylinksStr = ` **${linkType}**: ${
            mylinks.join(', ')
        }`
        dv.paragraph(mylinksStr)
    }

    displayLinks(dv) {
        // this function is used to display inlinks or outlinks
        // isInLink is a boolean

        // TODO: fix inlinks, for some reason it is duplicating the inlinks and not displaying the outlinks
        // if (dv.current().file.inlinks.length > 0) {
        //     this.displayLinkValue(dv, dv.current().file.inlinks, "inlinks")
        // }
        if (dv.current().file.outlinks.length > 0) {
            this.displayLinkValue(dv, dv.current().file.outlinks, "outlinks")
        }
    }

    // working
    // async createGoogleButton(container) {
    //     // TODO: should look and see if search exists in the metadata, if it does not.
    //     // Then it should somehow insert that template

    //     const { fileFields } = app.plugins.plugins["metadata-menu"].api;

    //     const getCurrentProperty = async (file, yamlKey) => {
    //         var currentFields = await fileFields(file)
    //         var currentValue = currentFields[yamlKey]["value"]
    //         if (currentValue == undefined) {
    //             currentValue = ""
    //         }
    //         // console.log(currentValue)
    //         return currentValue
    //     }

    //     const {
    //         createButton
    //     } = app.plugins.plugins["buttons"]
    //     const activeFile = app.workspace.getActiveFile();


    //     // var qa = app.plugins.plugins.quickadd.api;

    //     var searchThis = await getCurrentProperty(activeFile, "search");
    //     var uriEncodedSearch = encodeURIComponent(searchThis);

    //     var googleQuery = "https://google.com/search?q=" + uriEncodedSearch;
    //     // var markdownUrl = `[${searchThis}]` + "(" + googleQuery + ")";
    //     // TODO: only set the clipboard if the search if the button is clicked
    //     // commenting out for now
    //     // await qa.utility.setClipboard(markdownUrl);

    //     return [createButton({
    //         app,
    //         el: container,
    //         args: {
    //             name: "Google it",
    //             type: "link",
    //             action: googleQuery + uriEncodedSearch,
    //         }
    //     })]


    // }


    // working
    async insertTemplateButton(container) {
        // https://github.com/shabegom/buttons#templater-button
        // TODO: identify which line the "# " is on and replace that line with the template
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                id: "default",
                name: "Templater: Open Insert Template Modal",
                type: "command",
                action: "Templater: Open Insert Template Modal"
            }
        })
    }

    async applyTemplateButton(container) {
        // https://github.com/shabegom/buttons#templater-button
        // TODO: identify which line the "# " is on and replace that line with the template
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                id: "default",
                name: "Templater: Replace templates in the active file",
                type: "command",
                action: "Templater: Replace templates in the active file"
            }
        })
    }


    async createNewNoteTemplateButton(container) { // TODO: link to existing note via the button
        const {getPropertyValue} = app.plugins.plugins["metaedit"].api
        const {createButton} = app.plugins.plugins["buttons"]

        const activeFile = app.workspace.getActiveFile();
        // var title = await getPropertyValue("title", activeFile);

        // 2023-02-12--12-41-30.md
        // genereate the date
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var dateStr = year + "-" + month + "-" + day + "--" + hour + "-" + minute + "-" + second;

        var templateName = "Zet Note"
        var path = "Zettel/"
        var fileName = dateStr
        var newFilePath = path + fileName

        return createButton({
            app,
            el: container,
            args: {
                id: "default",
                name: "New Note",
                type: `note(${newFilePath}, split) template`,
                action: templateName
            }
        })
    }

    async createLintCommandButton(container) {
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                name: "Linter: Lint the current file",
                type: "command",
                action: "Linter: Lint the current file"
            }
        })
    }

    async createGptButton(container) {
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                name: "Text Generator: Generate Text!",
                type: "command",
                action: "Text Generator: Generate Text!"
            }
        })
    }

    async addNoteToProjectCommandButton(container) {
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                name: "QuickAdd: Add Project to Note",
                type: "command",
                action: "QuickAdd: Add Project to Note"
            }
        })
    }

    async appendToDo(dv) {
        // construct obsidian advanced url link to create a new page
        // https://vinzent03.github.io/obsidian-advanced-uri/actions/writing

        const activeFile = app.workspace.getActiveFile();
        let page = dv.current();

        // obsidian://advanced-uri?vault=<your-vault>&daily=true&clipboard=true&mode=append

        // create the url
        var obsidianUrl = "obsidian://advanced-uri?vault=main&filepath=";
        // add the title
        obsidianUrl += encodeURI(activeFile.path);


        var title = page.title;
        // add the notes
        obsidianUrl += "&data=" + encodeURI(`- [ ] ${title}`);

        // &mode=append
        obsidianUrl += "&mode=prepend";

        // &header=TODO
        obsidianUrl += "&heading=TODO";


        // return markdown link
        obsidianUrl = `[Title To Do]` + "(" + obsidianUrl + ")";
        return dv.paragraph(obsidianUrl);


    }

    // working
    async insertToggleMetadataButton(container) {
        // https://github.com/shabegom/buttons#templater-button
        // TODO: identify which line the "# " is on and replace that line with the template
        const {createButton} = app.plugins.plugins["buttons"]

        return createButton({
            app,
            el: container,
            args: {
                id: "default",
                name: "Snippet Commands: Toggle hide-metadata",
                type: "command",
                action: "Snippet Commands: Toggle hide-metadata"
            }
        })
    }

}

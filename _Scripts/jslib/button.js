class Button {


    // create hyperlink

    // const createButton = ({ app, el, args, inline, id, clickOverride, }) => {
    // clickHandler(app, args, inline, id)

    // name: "",
    // type: "",
    // action: "",
    // swap: "",
    // remove: "",
    // replace: "",
    // id: "",
    // templater: false,
    // class: "",
    // color: "",
    // blockId: "",

    // ```dataviewjs
    // const {Button} = customJS
    // Button.createSimpleButton(dv)
    // ```
    createSimpleButton(dv) {
        const { update } = app.plugins.plugins["metaedit"].api
        const { createButton } = app.plugins.plugins["buttons"]
        return dv.paragraph(createButton({
            app,
            el: container,
            args: {
                name: "Done!"
            },
            clickOverride: {
                click: update,
                params: ['Status', 'Completed', 'test']
            }
        }))
    }


    // not working yet
    createLinkButton(dv) {
        const { createButton } = app.plugins.plugins["buttons"]
        return dv.paragraph(createButton({
            app,
            el: container,
            args: {
                name: "Link!",
                type: "link",
                action: "https://google.com"
            }
        }))
    }

    // metaedit
    // autoprop:
    // update:
    // getPropertyValue:
    // getFilesWithProperty:
    // createYamlProperty:
    // getPropertiesInFile:

    async createMetaLinkButton(dv) {
        const { getPropertyValue } = app.plugins.plugins["metaedit"].api
        const { createButton } = app.plugins.plugins["buttons"]
        const activeFile = app.workspace.getActiveFile();

        // https://github.com/chhoumann/MetaEdit#getpropertyvaluepropertyname-string-file-tfile--string
        var title = await app.plugins.plugins["metaedit"].api.getPropertyValue("title", activeFile);

        return dv.paragraph(createButton({
            app,
            el: container,
            args: {
                name: "Link!",
                type: "link",
                action: "https://google.com/search?q=" + encodeURIComponent(title)
            }
        }))
    }

    async createSearchMetaBind(dv) {
        const { fileFields } = app.plugins.plugins["metadata-menu"].api;
        const { postValues } = app.plugins.plugins["metadata-menu"].api;

        const getCurrentProperty = async (file, yamlKey) => {
            var currentFields = await fileFields(file)
            var currentValue = currentFields[yamlKey]["value"]
            // console.log(currentValue)
            return currentValue
        }


        const { createButton } = app.plugins.plugins["buttons"]
        const activeFile = app.workspace.getActiveFile();

        // https://github.com/chhoumann/MetaEdit#getpropertyvaluepropertyname-string-file-tfile--string
        var title = await app.plugins.plugins["metaedit"].api.getPropertyValue("title", activeFile);

        return dv.paragraph(createButton({
            app,
            el: container,
            args: {
                name: "Link!",
                type: "link",
                action: "https://google.com/search?q=" + encodeURIComponent(getCurrentProperty(activeFile, "search"))
            }
        }))
    }

    async createCommandButton(dv) {
        const { createButton } = app.plugins.plugins["buttons"]
        const activeFile = app.workspace.getActiveFile();


        return dv.paragraph(createButton({
            app,
            el: container,
            args: {
                name: "Lint Command",
                type: "command",
                action: "Linter: Lint the current file"
            }
        }))
    }

    // https://github.com/chhoumann/MetaEdit#api-examples
    // need to take "this." out everywhere you see it
    async createButtonDataView(dv) { // https://forum.obsidian.md/t/using-metaedit-buttons-templater-nldates-and-dataview-together/35911
        const { update } = app.plugins.plugins["metaedit"].api
        const { createButton } = app.plugins.plugins["buttons"]

        const PROCESSED_TAG = "to-process";

        const defer = async (file, key) => {
            const currentTags = await app.plugins.plugins["metaedit"].api.getPropertyValue("tags", file);

            console.log(currentTags)

            // TODO: ask one of discord friends why this does not works
            var tmpList = ["test", "context/side"]

            await update(key, tmpList, file)
        }

        dv.table([
            "Name",
            "Path",
            "Tags",
            "Due Date",
            ""
        ], dv.pages("#test").sort(t => t["due-date"], 'desc').where(t => t.status != "Completed").map(t => [
            t.file.link,
            t.file.path,
            t.tags,
            t.project,
            t["due-date"],
            createButton(
                {
                    app,
                    el: container,
                    args: {
                        name: "Done!"
                    },
                    clickOverride: {
                        click: defer,
                        params: [t.file.path, 'tags']
                        // params: ['tags', filterTags, t.file.path]
                    }
                }
            )
        ]))
    }


    // createNewButton(activities, dv) {
    //     const buttonConfig = {
    //         name: "New Button",
    //     };

    //     const clickHandler = async (_, activities) => {
    //         // Custom click handler logic for the new button
    //         console.log("New button clicked!");
    //     };

    //     return this.createButton(activities, dv, buttonConfig, clickHandler);
    // }


}

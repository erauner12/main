class AnyBox {

    // Constants
    static API_URL_BASE = "http://127.0.0.1:6391/search";
    static API_KEY = '0C6EE11C-BB81-48B2-8DFC-239A65412DD7';
    static TIMEZONE_OFFSET = 6; // CST timezone

    // Fetch notes from the API
    async fetchNotesFromApi(type = 'note', inFolder = false) {
        const url = this.buildApiUrl(type);
        const headers = this.getAuthenticationHeaders();

        let response = await this.sendRequest(url, headers);
        this.ensureValidResponse(response);
        let allData = await response.json;

        // Filter based on the starred flag
        allData = allData.filter(item => !item.isStarred && (inFolder ? item.hasOwnProperty('folder') : !item.hasOwnProperty('folder')));


        return allData;
    }

    async populateTable(dv, filterDate, type = 'note', inFolder = true) { // Set inFolder to true to enable folder grouping
        let allData = await this.fetchNotesFromApi(type, inFolder);

        // Group data by folder name
        const groupedData = allData.reduce((grouped, item) => {
            // Check if the item has a folder and use the folder's name, otherwise use 'No Folder'
            const folderName = item.folder ? item.folder.name : 'No Folder';
            if (!grouped[folderName]) {
                grouped[folderName] = [];
            }
            grouped[folderName].push(item);
            return grouped;
        }, {});

        // Create a header and table for each folder group
        for (const [folderName, items] of Object.entries(groupedData)) {
            const headerTitle = `${this.getHeaderTitle(type)} - ${folderName}`;
            dv.header(4, headerTitle); // Create a header for the folder

            const { headers, data } = this.prepareTableData(items, type, dv);
            dv.table(headers, data); // Create a table for the items in the folder
        }
    }



    getCurrentDate() {
        const today = new Date();
        today.setHours(today.getHours() - AnyBox.TIMEZONE_OFFSET);
        return `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`;
    }

    buildApiUrl(type, limit = 0, starred = false) {
        let url = `${AnyBox.API_URL_BASE}?limit=${limit}&type=${type}`;
        if (starred) {
            url += "&starred=yes";
        }
        return url;
    }

    // Get authentication headers
    getAuthenticationHeaders() {
        return {
            'x-api-key': AnyBox.API_KEY
        };
    }

    // Send a request to the specified URL
    async sendRequest(url, headers, method = 'GET', body = null) {
        const options = {
            url: url,
            method: method,
            headers: headers
        };
        if (body) {
            options.body = body;
        }

        return await requestUrl(options);
    }

    // Ensure that the response status is valid
    ensureValidResponse(response) {
        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }
    }

    // Get the header title based on the type
    getHeaderTitle(type) {
        const titles = {
            'note': "Notes",
            'link': "Links",
            'linkwithcomment': "Links With Comments",
            'file': "Files",
            'image': "Images"
        };
        if (titles[type]) {
            return titles[type];
        }
        throw new Error(`Unsupported type: ${type}`);
    }


    // Filter data based on the date
    filterDataByDate(data, filterDate) {
        return data.filter(d => {
            const noteDate = new Date(d.dateAdded);
            noteDate.setHours(noteDate.getHours() - AnyBox.TIMEZONE_OFFSET);
            const filterUTCDate = new Date(filterDate + "T00:00:00Z");

            return noteDate.getUTCFullYear() === filterUTCDate.getUTCFullYear() &&
                noteDate.getUTCMonth() === filterUTCDate.getUTCMonth() &&
                noteDate.getUTCDate() === filterUTCDate.getUTCDate();
        });
    }

    // Prepare the data for the table
    prepareTableData(data, type, dv) {
        const tableInfo = {
            'note': {
                headers: ["A", "O", "Note", "Comment", "Relative Day (Days Ago)"],
                preparer: this.prepareNoteTableData
            },
            'link': {
                headers: ["A", "O", "URL", "Title", "Relative Day (Days Ago)"],
                preparer: this.prepareLinkTableData
            },
            'linkwithcomment': {
                headers: ["A", "O", "Comment", "URL", "Relative Day (Days Ago)"],
                preparer: this.prepareLinkWithCommentTableData
            },
            'file': {
                headers: ["A", "O", "File", "Comment", "Description", "Relative Day (Days Ago)"],
                preparer: this.prepareFileTableData // You need to define this method
            },
            'image': {
                headers: ["A", "O", "Image", "Comment", "Description", "Relative Day (Days Ago)"],
                preparer: this.prepareImageTableData // You need to define this method
            }
        };
        if (tableInfo[type]) {
            const { headers, preparer } = tableInfo[type];
            return { headers, data: preparer.call(this, data, dv) };
        }
        throw new Error(`Unsupported type: ${type}`);
    }


    prepareNoteTableData(data, dv) {
        return data.map(d => [
            this.createAppendButton(d, dv),
            this.createOpenButton(`anybox://document/${d.id}`, dv),
            d.description,
            d.comment,
            this.calculateRelativeDay(d.dateAdded),
        ]);
    }

    prepareLinkTableData(data, dv) {
        const filteredData = data.filter(d => !d.comment);
        return filteredData.map(d => [
            this.createAppendButton(d, dv), // Add this line
            this.createOpenButton(`anybox://document/${d.id}`, dv),
            `[${d.host}](${d.url})`,
            d.title,
            d.comment,
            this.calculateRelativeDay(d.dateAdded),
        ]);
    }

    prepareLinkWithCommentTableData(data, dv) {
        const filteredData = data.filter(d => d.comment);
        return filteredData.map(d => [
            this.createAppendButton(d, dv), // Add this line
            this.createOpenButton(`anybox://document/${d.id}`, dv),
            d.comment,
            `[${d.host}](${d.url})`,
            this.calculateRelativeDay(d.dateAdded),
        ]);
    }

    prepareFileTableData(data, dv) {
        return data.map(d => [
            this.createAppendButton(d, dv),
            this.createOpenButton(`anybox://document/${d.id}`, dv), // Changed from `file://` to `anybox://document/`
            d.title,
            d.comment, // Added comment here
            d.description,
            this.calculateRelativeDay(d.dateAdded)
        ]);
    }

    prepareImageTableData(data, dv) {
        return data.map(d => [
            this.createAppendButton(d, dv),
            this.createOpenButton(`anybox://document/${d.id}`, dv), // Changed from `file://` to `anybox://document/`
            d.title,
            d.comment, // Added comment here
            d.description,
            this.calculateRelativeDay(d.dateAdded)
        ]);
    }


    createOpenButton(link, dv) {
        const { createButton } = app.plugins.plugins["buttons"];
        const defer = () => {
            window.open(link, "_blank");
        };

        return createButton({
            app,
            el: dv.container,
            args: {
                name: "🔗",
            },
            clickOverride: {
                click: defer,
                params: []
            }
        });
    }

    async deleteFromAnyBox(identifier) {
        const url = 'http://localhost:6391/trash';
        const headers = {
            'x-api-key': AnyBox.API_KEY,
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            type: "document",
            identifiers: [identifier],
            deleteImmediately: false
        });

        const response = await this.sendRequest(url, headers, 'POST', body);
        this.ensureValidResponse(response);
    }

    createAppendButton(data, dv) {
        const { createButton } = app.plugins.plugins["buttons"];
        const defer = async () => {
            let textToAppend;

            if (data.comment) {
                if (data.url) { // If it's a link
                    textToAppend = `${data.comment}\n[${data.host}](${data.url})\n${data.description}`;
                } else { // If it's a note
                    textToAppend = `${data.comment}\n${data.description}`;
                }
            } else {
                if (data.url && !data.url.startsWith("anybox://")) {
                    textToAppend = `[${data.host}](${data.url})\n${data.description}`;
                } else { // If it's a note or an AnyBox link
                    textToAppend = data.description;
                }
            }

            // Constructing the URL scheme to append text to today's daily note.
            const baseUrl = 'obsidian://actions-uri/daily-note/append';
            const vault = 'main'; // Your vault name
            const content = encodeURIComponent(`\n---\n\n${textToAppend}\n`);
            const ensureNewline = true; // Optional: set to true or false
            const silent = true; // Optional: set to true or false

            const url = `${baseUrl}?vault=${vault}&content=${content}&ensure-newline=${ensureNewline}&silent=${silent}`;

            // Open the URL to append the text to the daily note.
            window.open(url, "_blank");

            // Wait for a short delay to ensure the above operation is complete.
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay

            // Now delete the item from AnyBox.
            await this.deleteFromAnyBox(data.id);
        };

        return createButton({
            app,
            el: dv.container,
            args: {
                name: "✍️",
            },
            clickOverride: {
                click: defer,
                params: []
            }
        });
    }

    calculateRelativeDay(dateAdded) {
        const currentDate = new Date();
        const noteDate = new Date(dateAdded);
        const diffTime = Math.abs(currentDate - noteDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let relativeDay = '';

        if (diffDays === 0) {
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            relativeDay = `Today (${diffHours} hours ago)`;
        } else if (diffDays === 1) {
            relativeDay = `Yesterday (${diffDays} day ago)`;
        } else {
            relativeDay = `${diffDays} days ago`;
        }

        return relativeDay;
    }
}

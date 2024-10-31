class Readwise {

    createThingsLink(title, notes, readwise_url) {
        // construct things 3 link x-callback-url
        // https://culturedcode.com/things/support/articles/2803573/
        // create the url
        var thingsUrl = "things:///add?";
        // add the title
        thingsUrl += "title=" + encodeURI(title);
        // add the notes
        thingsUrl += "&notes=" + encodeURI(notes);
        // add the readwise url to the notes
        thingsUrl += "%0A%0A" + encodeURI(readwise_url);
        // add reveal to the url
        thingsUrl += "&reveal=true";
        // add the due date
        // thingsUrl += "&due=" + dueDate;

        return thingsUrl;
    }


    createObsidianPageLink(highlight_id, book_id, notes, readwise_url) {
        // construct obsidian advanced url link to create a new page
        // https://vinzent03.github.io/obsidian-advanced-uri/actions/writing

        // create the url
        var obsidianUrl = "obsidian://advanced-uri?vault=main";

        // construct the filepath to the file
        var filePath = "Readwise/Highlights" + "/";

        obsidianUrl += "&filepath=" + encodeURI(filePath);

        // // add the file name (highlight id)
        obsidianUrl += encodeURI(highlight_id);

        // TODO: invoke some kind of input prompt to get the title of the page to add to the data
        // add the title
        obsidianUrl += "&data=" + "%23%20" + encodeURI("Change Me" + "\n\n");

        // construct the link to the highlight in obsidian
        obsidianUrl += encodeURI(`![[${book_id}` + "%23" + `^rw${highlight_id}]]` + "\n");

        // add the notes
        obsidianUrl += "-%20" + encodeURI(notes) + "%0A";

        obsidianUrl += "-%20%23" + encodeURI("context/");

        // add the readwise url to the notes
        obsidianUrl += encodeURI(readwise_url);

        return obsidianUrl;
    }

    async fetchResultsFromHighlightApi(day) {
        var today = new Date(day);
        today.setDate(today.getDate() + 1);
        var beginningOfDay = new Date(today.setHours(0, 0, 0, 0));
        var endOfDay = new Date(today.setHours(23, 59, 59, 999));


        let params = {
            page_size: '100',
            highlighted_at__gt: beginningOfDay.toISOString(),
            highlighted_at__lt: endOfDay.toISOString()
        };
        let searchParams = new URLSearchParams(params).toString();
        return fetch(`https://readwise.io/api/v2/highlights/?${searchParams}`, {
            method: 'GET',
            // data:
            // "highlighted_at__lt": lastFetchWasAt.toISOString(),
            headers: {
                Authorization: `Token uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l`
            }
        }).then(response => response.json()).then(data => {
            return data.results
        })
    }


    async fetchFromHighlightApi(documentView, day) {
        const allData = await this.fetchResultsFromHighlightApi(day);

        documentView.header(3, "Readwise Highlights");
        documentView.paragraph(`${
            allData.length
        } highlights`);

        allData.sort((a, b) => new Date(b.created) - new Date(a.created));

        const listRoot = documentView.el("ul", "");

        for (const highlight of allData) {
            const listItem = documentView.el("li", "", {container: listRoot});
            const buttonContainer = documentView.el("div", "", {container: listItem});
            const collapsibleButton = this.createCollapsibleButton(documentView, listItem, highlight);
            const nestedListRoot = documentView.el("ul", "", {
                container: listItem,
                style: "display: none;"
            });

            collapsibleButton.onclick = () => {
                if (nestedListRoot.style.display === "none") {
                    nestedListRoot.style.display = "block";
                    buttonContainer.style.display = "flex";
                } else {
                    nestedListRoot.style.display = "none";
                    buttonContainer.style.display = "none";
                }
            };

            this.createHighlightContent(documentView, highlight, nestedListRoot);
            this.createButtonContainer(documentView, highlight, buttonContainer);
        }
    }

    createCollapsibleButton(documentView, listItem, highlight) {
        const date = new Date(highlight.updated);
        const convertedDate = date.toLocaleString('en-US', {timeZone: 'America/Chicago'});
        const buttonContainer = documentView.el("div", "", {container: listItem});
        return documentView.el("button", convertedDate, {container: buttonContainer});
    }

    createHighlightContent(documentView, highlight, nestedListRoot) {
        const highlightText = highlight.text.replace(/(\r)/gm, " ");
        const noteText = highlight.note.replace(/(\r\n|\n|\r|^\s)/gm, " ");
        documentView.el("blockquote", highlightText, {container: nestedListRoot});

        const nestedNestedListRoot = documentView.el("ul", "", {container: nestedListRoot});

        if (highlight.tags && highlight.tags.length > 0) {
            const tags = highlight.tags.map(tag => tag.name).join(", ");
            documentView.el("li", tags, {container: nestedNestedListRoot});
        }

        if (highlight.note) {
            documentView.el("li", `==${noteText}==`, {container: nestedNestedListRoot});
        }
    }

    createButtonContainer(documentView, highlight, buttonContainer) {
        const buttonList = [
            {
                "📚": highlight.url,
                "clickFunction": (url) => {
                    navigator.clipboard.writeText(url);
                    window.open(url)
                }
            }, {
                "🔖": `https://readwise.io/bookreview/${
                    highlight.book_id
                }?highlight=${
                    highlight.id
                }`,
                "clickFunction": (url) => {
                    navigator.clipboard.writeText(url);
                    window.open(url)
                }
                // },
                // {
                //     "Things": this.createThingsLink(highlight.note, highlight.text, highlight.url),
                //     "clickFunction": (url) => {
                //         window.open(url)
                //     }
                // },
                // {
                //     "Obsidian": this.createObsidianPageLink(highlight.id, highlight.book_id, highlight.note),
                //     "clickFunction": (url) => {
                //         navigator.clipboard.writeText(url);
                //         window.open(url)
                //     }
            }, {
                "🔧": highlight,
                "clickFunction": (highlight) => {
                    this.updateReadwiseHighlight('text', highlight, "Ony answer with the fixed sentence, nothing else. Please break up sentences into new paragraphs if they get longer than two sentences. Fix the spelling errors in this sentence:");

                    // open url
                    var url = `https://readwise.io/bookreview/${
                        highlight.book_id
                    }?highlight=${
                        highlight.id
                    }`
                    navigator.clipboard.writeText(url);
                    // window.open(url)
                }
            }, {
                "📓": highlight,
                "clickFunction": (highlight) => {
                    this.updateReadwiseHighlight('note', highlight, "Simplify the following text. Repeat the point back in a way that would make sense to someone with little understanding: ");

                    // open url
                    var url = `https://readwise.io/bookreview/${
                        highlight.book_id
                    }?highlight=${
                        highlight.id
                    }`
                    navigator.clipboard.writeText(url);
                    // window.open(url)
                }
            }
        ];

        const buttonListContainer = documentView.el("div", "", {container: buttonContainer});
        buttonListContainer.style.display = "flex";
        buttonListContainer.style.flexDirection = "row";
        buttonListContainer.style.gap = "5px";

        for (const buttonData of buttonList) {
            const key = Object.keys(buttonData)[0];
            const value = Object.values(buttonData)[0];

            const button = app.plugins.plugins["buttons"].createButton({
                app,
                el: buttonListContainer,
                args: {
                    name: key
                },
                clickOverride: {
                    click: buttonData.clickFunction,
                    params: [value]
                }
            });

            button.addClass(key.toLowerCase());
        }
    }

    async updateReadwiseHighlight(fieldToUpdate, highlight, prompt) {
        const correctedText = await this.promptGpt(prompt, highlight.text);
        const url = `https://readwise.io/api/v2/highlights/${
            highlight.id
        }`;
        const body = {
            [fieldToUpdate]: correctedText
        };
        await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.error(error);
        });
    }

    async promptGpt(myPrompt, sentence) {
        const gptURL = 'https://api.openai.com/v1/completions';

        // console.log(sentence);
        const gptKey = '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';
        const prompt = myPrompt;
        const response = await fetch(gptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gptKey}`
            },
            body: JSON.stringify(
                {
                    model: 'text-davinci-003',
                    prompt: myPrompt + sentence,
                    max_tokens: 1536,
                    temperature: 0.6,
                    top_p: 1,
                    n: 1,
                    stream: false,
                    logprobs: null,
                    echo: false
                }
            )
        });
        const data = await response.json();
        // console.log(data);
        return data.choices[0].text.trim();
    }


    addTag(highlightId) {
        const url = `https://readwise.io/api/v2/highlights/${highlightId}/tags/`;
        const body = {
            name: "processed"
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.error(error);
        });
    }
}

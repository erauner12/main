class TodoistTable {
    static API_URL_BASE = "https://api.todoist.com/rest/v2/tasks";
    static API_TOKEN = '930f98274acbbafeb4362652cb572b12b90f3bd6';
    static PROJECT_ID = '2236493795';
    static WORK_PROJECT_ID = '2244866349';
    static HOME_PROJECT_ID = '2244866374';
    static SIDE_PROJECT_ID = '2267840287';
    static TIMEZONE_OFFSET = 6;


    async fetchTasksFromApi() {
      const url = this.buildApiUrl();
        const headers = this.getAuthenticationHeaders();
        const response = await this.sendRequest(url, headers);
        this.ensureValidResponse(response);
        return response.json;
    }

    async populateTable(dv, filterDate) {
        if (!filterDate) {
            filterDate = this.getCurrentDate();
        }
        const allData = await this.fetchTasksFromApi();
        const filteredData = this.filterDataByDate(allData, filterDate);
        dv.header(3, "Inbox");
        const { headers, data } = this.prepareTableData(filteredData, dv);
        dv.table(headers, data);
    }

    getCurrentDate() {
        const today = new Date();
        today.setHours(today.getHours() - TodoistTable.TIMEZONE_OFFSET);
        return `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`;
    }

    buildApiUrl() {
        return `${TodoistTable.API_URL_BASE}?project_id=${TodoistTable.PROJECT_ID}`;
    }

    getAuthenticationHeaders() {
        return {
            'Authorization': `Bearer ${TodoistTable.API_TOKEN}`
        };
    }

    async sendRequest(url, headers) {
        return await requestUrl({
            url: url,
            method: 'GET',
            headers: headers
        });
    }
    

    ensureValidResponse(response) {
        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }
    }

    filterDataByDate(data, filterDate) {
        console.log("Filtering tasks for date:", filterDate);
        return data.filter(d => {
            if (!d.created_at) return false;
            const taskDate = new Date(d.created_at);
            // console.log("Original Task Date:", taskDate);
            taskDate.setHours(taskDate.getHours() - TodoistTable.TIMEZONE_OFFSET);
            // console.log("Adjusted Task Date:", taskDate);
            const filterUTCDate = new Date(filterDate + "T00:00:00Z");
            return taskDate.getUTCFullYear() === filterUTCDate.getUTCFullYear() &&
                taskDate.getUTCMonth() === filterUTCDate.getUTCMonth() &&
                taskDate.getUTCDate() === filterUTCDate.getUTCDate();
        });
    }

    prepareTableData(data, dv) {
        return {
            headers: ["Task", "Due Date", "Link", "Copy", "Send to Work", "Send to Home", "Send to Side"],
            data: this.prepareTaskTableData(data, dv)
        };
    }

    prepareTaskTableData(data, dv) {
        return data.map(d => [
            d.content,
            d.due ? d.due.date : 'N/A',
            `[*](${d.url})`,
            this.createCopyButton(d.content, dv),
            this.createSendToProjectButton(d.id, TodoistTable.WORK_PROJECT_ID, "Send to Work", dv),
            this.createSendToProjectButton(d.id, TodoistTable.HOME_PROJECT_ID, "Send to Home", dv),
            this.createSendToProjectButton(d.id, TodoistTable.SIDE_PROJECT_ID, "Send to Side", dv)
        ]);
    }

    createSendToProjectButton(taskId, projectId, buttonText, dv) {
        const { createButton } = app.plugins.plugins["buttons"];

        const sendToProject = async () => {
            const url = `${TodoistTable.API_URL_BASE}/${taskId}`;
            const headers = {
                ...this.getAuthenticationHeaders(),
                'Content-Type': 'application/json'
            };
            try {
                const response = await this.sendRequest(url, headers, {
                    method: 'POST',
                    body: JSON.stringify({ project_id: projectId })
                });
                
                console.log("API Response JSON:", response.json);
                
                if (response.status !== 200) {
                    console.error("Error sending task to project:", response.status);
                }
            } catch (error) {
                console.error("Error while sending request:", error);
            }
        };
        
              
        return createButton({
            app,
            el: dv.container,
            args: { name: buttonText },
            clickOverride: {
                click: sendToProject,
                params: [sendToProject] 
            }
        });
    }
    

    createCopyButton(copyText, dv) {
        const { createButton } = app.plugins.plugins["buttons"];
        const defer = async (text) => {
            navigator.clipboard.writeText(text);
        };
        return createButton({
            app,
            el: dv.container,
            args: { name: "Copy" },
            clickOverride: {
                click: defer,
                params: [copyText]
            }
        });
    }
}

// todoistSyncAPI.js

class TodoistSyncAPI {
    constructor() {
        this.API_HOST = null;
        this.API_VERSION = null;
        this.API_TOKEN = null;
    }

    setApiConfig(apiHost, apiVersion, apiToken) {
        this.API_HOST = apiHost;
        this.API_VERSION = apiVersion;
        this.API_TOKEN = apiToken;
    }

    getApiUrlBase() {
        return `${this.API_HOST}/${this.API_VERSION}`;
    }

    async createProjectInWorkspace(projectData) {
        const url = `${this.getApiUrlBase()}/sync`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const tempId = this.generateUUID();
        const uuid = this.generateUUID();

        const commands = [{
            type: "project_add",
            temp_id: tempId,
            uuid: uuid,
            args: {
                name: projectData.name,
                workspace_id: projectData.workspace_id
            }
        }];

        const data = `commands=${encodeURIComponent(JSON.stringify(commands))}`;

        try {
            console.log('Sending request to create project in workspace');
            const response = await this.sendRequest(url, headers, 'POST', data);
            console.log('Response received:', response);
            this.ensureValidResponse(response, 200);
            const projectId = response.json.temp_id_mapping[tempId];
            return { id: projectId };
        } catch (error) {
            console.error('Error creating project in workspace:', error);
            throw error;
        }
    }

    async sendRequest(url, headers, method = 'GET', body = null) {
        const options = {
            method: method,
            headers: headers,
        };

        if (body) {
            options.body = body;
        }

        console.log('Sending request with options:', options);

        const response = await fetch(url, options);

        console.log('Response received:', response);

        return {
            status: response.status,
            json: await response.json(),
        };
    }

    getAuthenticationHeaders() {
        return {
            "Authorization": `Bearer ${this.API_TOKEN}`,
        };
    }

    ensureValidResponse(response, expectedStatus = 200) {
        if (response.status !== expectedStatus) {
            throw new Error(`Request failed with status ${response.status}`);
        }
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// todoistApi.js

class TodoistApi {
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

    getTaskPermalink(taskId) {
        return `https://app.todoist.com/app/task/${taskId}`;
    }

    async createTask(taskData) {
        const url = `${this.getApiUrlBase()}/tasks`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            content: taskData.content,
            description: taskData.description
        };

        try {
            console.log('Sending request to create task');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response, 200);
            return await response.json(); // Parse the JSON response
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    async createProject(projectData) {
        const url = `${this.getApiUrlBase()}/projects`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            name: projectData.name,
        };

        try {
            console.log('Sending request to create project');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response, 200);
            return response.json;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    async createComment(commentData) {
        const url = `${this.getApiUrlBase()}/comments`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            project_id: commentData.project_id,
            content: commentData.content,
        };

        try {
            console.log('Sending request to create comment');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response, 200);
            return response.json;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    async getFilteredTasks(filter) {
        const encodedFilter = encodeURIComponent(filter);
        const url = `${this.getApiUrlBase()}/tasks?filter=${encodedFilter}`;
        const headers = this.getAuthenticationHeaders();
        const response = await this.sendRequest(url, headers, 'GET');
        this.ensureValidResponse(response);
        return response.json;
    }

    async completeTask(taskId) {
        const url = `${this.getApiUrlBase()}/tasks/${taskId}/close`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            "X-Request-Id": this.generateUUID()
        };
        const response = await this.sendRequest(url, headers, 'POST');
        this.ensureValidResponse(response, 204);
    }

    async deleteTask(taskId) {
        const url = `${this.getApiUrlBase()}/tasks/${taskId}`;
        const headers = this.getAuthenticationHeaders();
        const response = await this.sendRequest(url, headers, 'DELETE');
        this.ensureValidResponse(response, 204);
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

        return response;
    }

    getAuthenticationHeaders() {
        return {
            "Authorization": `Bearer ${this.API_TOKEN}`,
            "Content-Type": "application/json",
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

    async updateTaskDueDate(taskId, dueString, dueDateTime) {
        const url = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            due_string: dueString,
            due_datetime: dueDateTime
        };

        try {
            console.log('Sending request to update task due date');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response);
            return response.json;
        } catch (error) {
            console.error('Error updating task due date:', error);
            throw error;
        }
    }

    async updateTaskDueString(taskId, dueString) {
        const url = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            due_string: dueString
        };

        try {
            console.log('Sending request to update task due string');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response);
            return response.json;
        } catch (error) {
            console.error('Error updating task due string:', error);
            throw error;
        }
    }


    async getActiveTasks() {
        const filter = encodeURIComponent('!recurring');
        const url = `https://api.todoist.com/rest/v2/tasks?filter=${filter}`;
        const headers = this.getAuthenticationHeaders();
        const response = await this.sendRequest(url, headers, 'GET');
        this.ensureValidResponse(response);
        const tasks = await response.json;

        // Sort tasks based on creation date and comment count
        tasks.sort((a, b) => {
            const createdAtA = new Date(a.created_at);
            const createdAtB = new Date(b.created_at);
            if (createdAtA > createdAtB) {
                return -1;
            } else if (createdAtA < createdAtB) {
                return 1;
            } else {
                return b.comment_count - a.comment_count;
            }
        });

        return tasks;
    }

    async addCommentToTask(taskId, commentContent) {
        const url = `https://api.todoist.com/rest/v2/comments`;
        const headers = {
            ...this.getAuthenticationHeaders(),
            'Content-Type': 'application/json',
            'X-Request-Id': this.generateUUID()
        };

        const data = {
            task_id: taskId,
            content: commentContent,
        };

        try {
            console.log('Sending request to add comment to task');
            const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
            console.log('Response received:', response);
            this.ensureValidResponse(response, 200);
            return response.json;
        } catch (error) {
            console.error('Error adding comment to task:', error);
            throw error;
        }
    }
}

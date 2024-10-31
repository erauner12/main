// todoistActivityAPI.js

class TodoistActivityAPI {
    constructor(apiToken) {
        this.apiToken = "20fdade709c084c2e255e56e57d0e53370e8283e";
        this.apiUrl = 'https://api.todoist.com/sync/v9/activity/get';
    }

    async getActivities(limit = 30, offset = 0) {
        const url = new URL(this.apiUrl);
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);
        url.searchParams.append('object_event_types', JSON.stringify([
            "item:added",
            "item:completed",
            "note:added",
            "note:updated"
        ]));

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.apiToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    formatRelativeTime(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return "just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    }

    async getTaskDetails(taskId) {
        const url = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.apiToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Task not found
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}

// API constants
// Constructor
// API request methods
// Activity rendering methods
// Activity data processing methods
// UI element creation methods
// Utility methods

class TodoistActivity {
    // API constants
    static API_URL_BASE = "https://api.todoist.com/sync/v9/activity/get";
    static API_TOKEN = "20fdade709c084c2e255e56e57d0e53370e8283e";
    static TASK_URL_BASE = "https://api.todoist.com/rest/v2/tasks";
    static PROJECT_URL_BASE = "https://api.todoist.com/rest/v2/projects";
    static RESOURCE_TYPES = [
        "item:added",
        "item:completed",
        "note:added",
        "note:updated"
    ];
    static EXCLUDED_PROJECT_IDS = [
        "2324843500",
        "2328639678",
        "2314702903",
        "2314703159",
        "2314703154"
    ];

    constructor() {
        this.projects = [];
        this.taskDetailsMap = {};
    }

    // API request methods
    async fetchProjects() {
        const url = TodoistActivity.PROJECT_URL_BASE;
        const headers = this.getAuthenticationHeaders();

        const response = await this.sendRequest(url, headers);
        this.ensureValidResponse(response);

        this.projects = response.json;
    }

    async fetchActivityData() {
        const url = this.buildApiUrl();
        const headers = this.getAuthenticationHeaders();

        const response = await this.sendRequest(url, headers);
        this.ensureValidResponse(response);

        return response.json;
    }

    async fetchTaskData(taskId) {
        const url = `${TodoistActivity.TASK_URL_BASE}/${taskId}`;
        const headers = this.getAuthenticationHeaders();

        try {
            const response = await this.sendRequest(url, headers);
            this.ensureValidResponse(response);
            return response.json;
        } catch (error) {
            if (error.message.includes("status 404")) {
                return null;
            }
            throw error;
        }
    }

    async fetchComments(taskId) {
        const url = `https://api.todoist.com/rest/v2/comments?task_id=${taskId}`;
        const headers = this.getAuthenticationHeaders();

        try {
            const response = await this.sendRequest(url, headers);
            this.ensureValidResponse(response);
            console.log(`Response for task ${taskId}:`, response); // Log the response

            if (Array.isArray(response.json)) {
                return response.json;
            } else {
                console.warn(`Unexpected response format for comments of task ${taskId}:`, response.json);
                return [];
            }
        } catch (error) {
            console.error(`Failed to fetch comments for task ${taskId}:`, error);
            return [];
        }
    }

    async renderActivitiesTable(dv, container) {
        const activityData = await this.fetchActivityData();
        const filteredData = this.filterActivityData(activityData);
        const sortedData = filteredData.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        const limitedData = sortedData.slice(0, 20);

        const containerEl = dv.el('div');
        containerEl.classList.add('activity-table-container');

        const tableEl = dv.el('div');
        tableEl.style.maxHeight = '400px';
        tableEl.style.overflowY = 'auto';

        const table = dv.el('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        const headerRow = dv.el('tr');
        ['Date', 'Activity', 'Content'].forEach(header => {
            const th = dv.el('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        for (const activity of limitedData) {
            const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
            const taskData = await this.fetchTaskData(taskId);

            if (taskData) {
                const row = dv.el('tr');

                const dateCell = dv.el('td');
                dateCell.textContent = this.formatRelativeTime(new Date(activity.event_date));
                row.appendChild(dateCell);

                const activityCell = dv.el('td');
                activityCell.textContent = `${activity.object_type}: ${activity.event_type}`;
                row.appendChild(activityCell);

                const contentCell = dv.el('td');
                contentCell.textContent = this.getActivityContent(activity);
                row.appendChild(contentCell);

                table.appendChild(row);
            }
        }

        tableEl.appendChild(table);
        containerEl.appendChild(tableEl);

        // Insert the container at the beginning of the DataviewJS container
        container.appendChild(containerEl);

        this.applyTableStyles();
    }

    applyTableStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `

            .activity-table-wrapper table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .activity-table-wrapper th,
            .activity-table-wrapper td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            
            .activity-table-wrapper th {
                background-color: #f2f2f2;
            }
            
            .activity-table-wrapper {
                order: -1; /* Ensure the activity table appears on top */
                margin-bottom: 20px;
            }

            .activity-table-container {
                margin-top: 20px;
            }
            
            .activity-table-container table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .activity-table-container th,
            .activity-table-container td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            
            .activity-table-container th {
                background-color: #f2f2f2;
            }
    
            /* Add flexbox styles */
            .markdown-preview-view .markdown-preview-sizer {
                display: flex;
                flex-direction: column;
            }
    
            .activity-table-container {
                order: -1; /* Ensure the activity table appears on top */
            }
        `;
        document.head.appendChild(styleEl);
    }

    // Activity rendering methods
    async renderActivities(dv) {
        await this.fetchProjects();

        const activityData = await this.fetchActivityData();
        const filteredData = this.filterActivityData(activityData);
        const groupedData = await this.groupActivitiesByTopLevelTask(filteredData);
        const sortedGroups = this.sortGroupsByLatestUpdate(groupedData);

        for (const [topLevelTaskId, activities] of sortedGroups) {
            await this.renderTopLevelTask(dv, topLevelTaskId, activities);
        }

        this.applyStyles();
    }

    async renderTopLevelTask(dv, topLevelTaskId, activities) {
        const topLevelParentTaskData = await this.fetchTaskData(topLevelTaskId);

        if (topLevelParentTaskData) {
            const taskLink = `https://todoist.com/showTask?id=${topLevelParentTaskData.id}`;

            const collapsibleEl = dv.el('details');
            // Create a span element for the summary text
            const summaryTextSpan = dv.el('span', topLevelParentTaskData.content);

            // Check if the task is completed and apply green text color to the span
            if (topLevelParentTaskData.is_completed) {
                summaryTextSpan.style.color = "green"; // Apply green color for completed tasks
            }

            const summaryEl = dv.el('summary');
            summaryEl.appendChild(summaryTextSpan); // Add the span to the summary element
            collapsibleEl.appendChild(summaryEl);

            const contentEl = dv.el('div');

            const copyButton = this.createCopyActivitiesButton(activities, dv);
            contentEl.appendChild(copyButton);

            const linkEl = dv.el('a', 'View Task');
            linkEl.href = taskLink;
            contentEl.appendChild(linkEl);

            if (topLevelParentTaskData.description) {
                const descEl = dv.el('p', topLevelParentTaskData.description);
                contentEl.appendChild(descEl);
            }

            for (const activity of activities) {
                await this.renderActivity(dv, activity, topLevelParentTaskData, contentEl);
            }

            collapsibleEl.appendChild(contentEl);
        }
    }



    async renderActivity(dv, activity, topLevelParentTaskData, contentEl) {
        const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
        const taskData = await this.fetchTaskData(taskId);

        if (taskData) {
            const isTopLevelTask = taskData.id === topLevelParentTaskData.id;
            const containerEl = this.createActivityContent(dv, activity, taskData, isTopLevelTask);
            contentEl.appendChild(containerEl);

            // Add the copy comments button for each activity
            const copyCommentsButton = await this.createCopyCommentsButton([activity], dv);
            containerEl.appendChild(copyCommentsButton);
        }
    }

    // Activity data processing methods
    filterActivityData(activityData) {
        return activityData.events.filter(item =>
            TodoistActivity.RESOURCE_TYPES.includes(`${item.object_type}:${item.event_type}`) &&
            !TodoistActivity.EXCLUDED_PROJECT_IDS.includes(item.parent_project_id)
        );
    }

    async groupActivitiesByTopLevelTask(activities) {
        const groupedData = await this.groupActivities(activities);
        return this.filterGroupedData(groupedData);
    }

    async groupActivities(activities) {
        const groupedData = new Map();

        for (const activity of activities) {
            const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
            const topLevelParentTaskId = await this.getTopLevelParentTask(taskId);

            if (topLevelParentTaskId) {
                if (!groupedData.has(topLevelParentTaskId)) {
                    groupedData.set(topLevelParentTaskId, []);
                }
                groupedData.get(topLevelParentTaskId).push(activity);
            }
        }

        return groupedData;
    }

    filterGroupedData(groupedData) {
        const filteredGroupedData = new Map();
        for (const [topLevelTaskId, activities] of groupedData) {
            if (activities.length > 1 || activities[0].object_type !== 'item' || activities[0].event_type !== 'added') {
                filteredGroupedData.set(topLevelTaskId, activities);
            }
        }

        for (const activities of filteredGroupedData.values()) {
            activities.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        }

        return filteredGroupedData;
    }

    sortGroupsByLatestUpdate(groupedData) {
        const sortedGroups = Array.from(groupedData.entries());
        sortedGroups.sort((a, b) => {
            const latestUpdateA = new Date(a[1][0].event_date);
            const latestUpdateB = new Date(b[1][0].event_date);
            return latestUpdateB - latestUpdateA;
        });
        return sortedGroups;
    }

    // UI element creation methods
    createActivityContent(dv, activity, taskData, isTopLevelTask) {
        const containerEl = this.createActivityContainer(dv, activity, taskData, isTopLevelTask);

        if (activity.object_type === "note") {
            containerEl.appendChild(this.createNoteTitleElement(dv, taskData));
        }

        containerEl.appendChild(this.createTaskLinkElement(dv, taskData));
        containerEl.appendChild(this.createUpdateTypeElement(dv, activity));
        containerEl.appendChild(this.createRelativeTimeElement(dv, activity));
        containerEl.appendChild(this.createContentElement(dv, activity));

        return containerEl;
    }

    createActivityContainer(dv, activity, taskData, isTopLevelTask) {
        const containerEl = dv.el('div');
        containerEl.classList.add('event-container');
        containerEl.classList.add(this.getEventClass(activity.object_type, activity.event_type, isTopLevelTask));
        return containerEl;
    }

    createNoteTitleElement(dv, taskData) {
        return dv.el('h2', taskData.content);
    }

    createTaskLinkElement(dv, taskData) {
        const taskLink = `https://todoist.com/showTask?id=${taskData.id}`;
        return dv.el('a', 'View Task', { href: taskLink });
    }

    createUpdateTypeElement(dv, activity) {
        let updateType = "";
        if (activity.object_type === "note") {
            updateType = activity.event_type === "added" ? "Note added" : "Note updated";
        } else if (activity.object_type === "item") {
            updateType = activity.event_type === "added" ? "Task added" : "Task completed";
        }
        return dv.el('p', updateType);
    }

    createRelativeTimeElement(dv, activity) {
        const relativeTime = this.formatRelativeTime(new Date(activity.event_date));
        return dv.el('p', relativeTime);
    }

    createContentElement(dv, activity) {
        const content = this.getActivityContent(activity);
        return dv.el('p', content);
    }

    // Utility methods



    // Task utility methods

    async getTopLevelParentTask(taskId) {
        if (!this.taskDetailsMap[taskId]) {
            const taskDetails = await this.fetchTaskData(taskId);
            this.taskDetailsMap[taskId] = taskDetails;
        }

        const task = this.taskDetailsMap[taskId];

        if (task === null) {
            console.warn(`Task ${taskId} not found. It might have been deleted.`);
            return null;
        }

        if (task.parent_id === null) {
            return taskId;
        } else {
            const parentTaskId = await this.getTopLevelParentTask(task.parent_id);
            return parentTaskId !== null ? parentTaskId : taskId;
        }
    }

    getActivityContent(item) {
        if (item.object_type === "note") {
            return item.extra_data.content || "";
        } else if (item.object_type === "item") {
            return item.extra_data.content || "";
        }
        return "";
    }

    getProjectName(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        return project ? project.name : "Unknown Project";
    }

    // UI utility methods

    applyStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .event-container {
                border: 3px solid;
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 15px;
            }
    
            .note-event {
                border-color: #ffd700;
            }
    
            .completed-event {
                border-color: #98fb98;
            }
    
            .subtask-event {
                border-color: #da70d6;
            }
    
            .toplevel-event {
                border-color: #87cefa;
            }
        `;
        document.head.appendChild(styleEl);
    }

    getEventClass(objectType, eventType, isTopLevelTask) {
        if (objectType === "note") {
            return "note-event";
        } else if (objectType === "item") {
            if (eventType === "completed") {
                return "completed-event";
            } else if (eventType === "added") {
                return isTopLevelTask ? "toplevel-event" : "subtask-event";
            }
        }
        return "";
    }

    // Button utility methods

    createButton(dv, buttonConfig, clickHandler) {
        const { createButton } = app.plugins.plugins["buttons"];

        return createButton({
            app,
            el: dv.container,
            args: buttonConfig,
            clickOverride: {
                click: clickHandler,
                params: []
            }
        });
    }

    async createCopyActivitiesButton(activities, dv) {
        const buttonName = "📋";

        const clickHandler = async () => {
            const transformedContent = await Promise.all(
                activities
                    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
                    .map(async activity => {
                        const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
                        const taskData = await this.fetchTaskData(taskId);
                        const taskName = taskData ? taskData.content.split('>')[0].trim() : 'Unknown Task';
                        const content = this.getActivityContent(activity);
                        return `\n${taskName}\n${content}\n\n---`;
                    })
            ).then(results => results.join('\n'));

            await navigator.clipboard.writeText(transformedContent);
        };

        const buttonConfig = {
            name: buttonName,
        };

        return this.createButton(dv, buttonConfig, clickHandler);
    }

    async createCopyCommentsButton(activities, dv) {
        const buttonName = "💬";

        const clickHandler = async () => {
            const comments = await Promise.all(
                activities.map(async activity => {
                    const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
                    const taskComments = await this.fetchComments(taskId);
                    return taskComments;
                })
            ).then(results => results.flat());

            if (comments.length === 0) {
                await navigator.clipboard.writeText("No comments found.");
            } else {
                const sortedComments = comments.sort((a, b) => new Date(a.posted_at) - new Date(b.posted_at));
                const commentContent = sortedComments.map(comment => `${comment.content}\n\n---`).join('\n');
                await navigator.clipboard.writeText(commentContent);
            }
        };

        const buttonConfig = {
            name: buttonName,
        };

        return this.createButton(dv, buttonConfig, clickHandler);
    }

    // API utility methods

    buildApiUrl() {
        return `${TodoistActivity.API_URL_BASE}?limit=100`;
    }

    getAuthenticationHeaders() {
        return {
            "Authorization": `Bearer ${TodoistActivity.API_TOKEN}`
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
            throw new Error(`Request failed, status ${response.status}`);
        }
    }


    createCopyActivitiesButton(activities, dv) {
        const { createButton } = app.plugins.plugins["buttons"];

        const defer = async () => {
            const chronologicalContent = await Promise.all(
                activities
                    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
                    .map(async activity => {
                        const taskId = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
                        const taskData = await this.fetchTaskData(taskId);
                        const taskName = taskData ? taskData.content.split('>')[0].trim() : 'Unknown Task';
                        const content = this.getActivityContent(activity);
                        return `\n${taskName}\n${content}\n\n---`;
                    })
            ).then(results => results.join('\n'));

            await navigator.clipboard.writeText(chronologicalContent);
        };

        return createButton({
            app,
            el: dv.container,
            args: {
                name: "📋",
            },
            clickOverride: {
                click: defer,
                params: []
            }
        });
    }

    // Date utility methods

    /**
     * Formats a date as a relative time string.
     * @param {Date} date - The date to format.
     * @returns {string} The formatted relative time string.
     */
    formatRelativeTime(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) {
            return "just now";
        } else if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diff / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }
}

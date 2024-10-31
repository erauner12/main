// readwiseReaderAPI.js
class ReadwiseReaderAPI {
    constructor(apiToken) {
        this.apiToken = "uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l";
        this.apiUrl = 'https://readwise.io/api/v3/list/';
    }

    async getDocuments(limit = 20, cursor = null, updatedAfter = null, location = null) {
        const url = new URL(this.apiUrl);
        url.searchParams.append('page_size', limit);

        if (cursor) {
            url.searchParams.append('pageCursor', cursor);
        }
        if (updatedAfter) {
            url.searchParams.append('updatedAfter', updatedAfter);
        }
        if (location) {
            url.searchParams.append('location', location);
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Token ${this.apiToken}`
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
}

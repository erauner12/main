// readwiseHighlightsAPI.js
class ReadwiseHighlightsAPI {
    constructor(apiToken) {
        this.apiToken = "uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l";
        this.apiUrl = 'https://readwise.io/api/v2/highlights/';
    }

    async getHighlights(limit = 20, offset = 0, startDate = null) {
        const url = new URL(this.apiUrl);
        url.searchParams.append('page_size', limit);
        url.searchParams.append('offset', offset);

        if (startDate) {
            url.searchParams.append('highlighted_at__gt', startDate);
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Token ${this.apiToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results.sort((a, b) => new Date(a.highlighted_at) - new Date(b.highlighted_at));
    }

    formatRelativeTime(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return "just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    }

    async getHighlightDetails(highlightId) {
        const url = `${this.apiUrl}${highlightId}/`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Token ${this.apiToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Highlight not found
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}

// raindropAPI.js
class RaindropAPI {
    constructor(apiToken) {
        this.apiToken = "893f90e6-5b61-4ee3-8095-3ebf1e8ebeba";
        this.apiUrl = 'https://api.raindrop.io/rest/v1/';
    }

    async getRaindrops(limit = 25, offset = 0, collectionId = 0, search = '') {
        const url = new URL(`${this.apiUrl}raindrops/${collectionId}`);
        url.searchParams.append('perpage', limit);
        url.searchParams.append('page', Math.floor(offset / limit) + 1);
        if (search) {
            url.searchParams.append('search', search);
        }

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

    async getRaindropDetails(raindropId) {
        const url = `${this.apiUrl}raindrop/${raindropId}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.apiToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Raindrop not found
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async getHighlights(limit = 25, offset = 0) {
        const url = new URL(`${this.apiUrl}highlights`);
        url.searchParams.append('perpage', limit);
        url.searchParams.append('page', Math.floor(offset / limit) + 1);

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

    async getRaindropsCreatedToday(limit = 25, offset = 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayISOString = today.toISOString();

        const url = new URL(`${this.apiUrl}raindrops/0`);
        url.searchParams.append('perpage', limit);
        url.searchParams.append('page', Math.floor(offset / limit) + 1);
        url.searchParams.append('search', `created:>${todayISOString}`);
        url.searchParams.append('sort', '-created');

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
}


// views/memos/model/memoModel.js

class Memo {
    constructor() {
        this.API_HOST = null;
        this.API_VERSION = null;
        this.API_TOKEN = null;
    }

    setApiConfig(apiConfig) {
        this.API_HOST = apiConfig.host;
        this.API_VERSION = apiConfig.version;
        this.API_TOKEN = apiConfig.token;
    }

    getApiConfig() {
        return {
            host: this.API_HOST,
            version: this.API_VERSION,
            token: this.API_TOKEN,
        };
    }

    getApiUrlBase() {
        return `${this.API_HOST}/${this.API_VERSION}`;
    }

    getBaseUrl() {
        return this.API_HOST;
    }

    getSearchUrlResults(searchTerm) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        return `${this.getBaseUrl()}/?text=${encodedSearchTerm}`;
    }


    getMemoUrl(memo) {
        return `${this.API_HOST}/m/${memo.uid}`;
    }

    async fetchMemos(pageSize = 20, pageToken = '', daysToLookBack = 2, pinnedDaysToLookBack = 3) {
        const filters = [`row_status == "NORMAL"`];

        // Get the start and end timestamps for the specified days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endTimestamp = today.getTime() / 1000 + 24 * 60 * 60; // Add 24 hours to include today's memos
        const startTimestamp = Math.floor((today.getTime() - daysToLookBack * 24 * 60 * 60 * 1000) / 1000);
        const pinnedStartTimestamp = Math.floor((today.getTime() - (daysToLookBack + pinnedDaysToLookBack) * 24 * 60 * 60 * 1000) / 1000);

        // Add filters for memos within the specified time range
        const memoFilters = [
            ...filters,
            `display_time_after == ${pinnedStartTimestamp}`,
            `display_time_before == ${endTimestamp}`,
        ];

        let allMemos = [];
        let hasMorePages = true;
        let currentPageToken = pageToken;

        while (hasMorePages) {
            let memosUrl = `${this.getApiUrlBase()}/memos?pageSize=${pageSize}&pageToken=${currentPageToken}&include_comments=true`;
            const options = {
                method: 'GET',
                headers: this.getAuthenticationHeaders(),
            };
            if (memoFilters.length > 0) {
                memosUrl += `&filter=${encodeURIComponent(memoFilters.join(' && '))}`;
            }
            const memosResponse = await this.sendGetRequest(memosUrl, options);
            const memos = memosResponse.memos || [];

            // Filter the memos based on the pinned status and time range
            const filteredMemos = memos.filter(memo => {
                const displayTime = new Date(memo.displayTime).getTime() / 1000;
                return memo.pinned ? displayTime >= pinnedStartTimestamp : displayTime >= startTimestamp;
            });

            allMemos = [...allMemos, ...filteredMemos];
            const nextPageToken = memosResponse.nextPageToken;
            if (nextPageToken) {
                currentPageToken = nextPageToken;
            } else {
                hasMorePages = false;
            }
        }

        return allMemos;
    }

    async bumpMemo(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        const body = {};
        const response = await this.sendPatchRequest(url, body);
        console.log('Memo bumped successfully');
        return response.memo;
    }

    getTimeStampByDate(date) {
        // Create a new Date object based on the provided date
        const targetDate = new Date(date);

        // Set the time to the start of the day (00:00:00)
        targetDate.setHours(0, 0, 0, 0);

        // Get the timestamp in milliseconds
        const timestamp = targetDate.getTime();

        return timestamp;
    }

    async fetchMemoComments(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}/comments`;
        const response = await this.sendGetRequest(url);
        return response.memos;
    }

    async getMemoContent(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        const response = await this.sendGetRequest(url);
        return response.memo.content;
    }

    async getMemoByName(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        const response = await this.sendGetRequest(url);
        return response.memo;
    }

    async updateMemo(memo) {
        const url = `${this.getApiUrlBase()}/${memo.name}`;
        const body = {
            content: memo.content,
            pinned: memo.pinned,
        };
        const response = await this.sendPatchRequest(url, body);
        console.log('Memo updated successfully');
        return response.memo;
    }

    async toggleMemoPinned(memoName, currentPinned) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        const body = {
            pinned: !currentPinned,
        };
        const response = await this.sendPatchRequest(url, body);
        console.log('Memo pinned status updated successfully');
        return response.memo;
    }

    async deleteMemo(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        await this.sendDeleteRequest(url);
        console.log('Memo deleted successfully');
    }

    async createMemo(memo) {
        const url = `${this.getApiUrlBase()}/memos`;
        const body = {
            content: memo.content,
            visibility: memo.visibility,
        };
        const response = await this.sendPostRequest(url, body);
        console.log('Memo created successfully');
        return response.memo;
    }

    async archiveMemo(memoName) {
        const url = `${this.getApiUrlBase()}/${memoName}`;
        const body = {
            rowStatus: "ARCHIVED",
        };
        const response = await this.sendPatchRequest(url, body);
        console.log('Memo archived successfully');
        return response.memo;
    }

    async sendGetRequest(url) {
        const options = {
            url: url,
            method: 'GET',
            headers: this.getAuthenticationHeaders(),
        };
        const response = await this.sendRequest(url, options);
        return response;
    }

    async sendPatchRequest(url, body) {
        const options = {
            url: url,
            method: 'PATCH',
            headers: this.getAuthenticationHeaders(),
            body: JSON.stringify(body),
        };
        const response = await this.sendRequest(url, options);
        return response;
    }

    async sendDeleteRequest(url) {
        const options = {
            url: url,
            method: 'DELETE',
            headers: this.getAuthenticationHeaders(),
        };
        await this.sendRequest(url, options);
    }

    async sendPostRequest(url, body) {
        const options = {
            url: url,
            method: 'POST',
            headers: this.getAuthenticationHeaders(),
            body: JSON.stringify(body),
        };
        const response = await this.sendRequest(url, options);
        return response;
    }

    async sendRequest(url, options) {
        try {
            const defaultOptions = {
                url: url,
                method: 'GET',
                headers: this.getAuthenticationHeaders(),
            };
            const mergedOptions = { ...defaultOptions, ...options };
            console.log('Request:', mergedOptions);
            const response = await requestUrl(mergedOptions);
            this.ensureValidResponse(response);
            return response.json;
        } catch (error) {
            console.error('Error sending request:', error);
            throw error;
        }
    }

    getAuthenticationHeaders() {
        return {
            "Authorization": `Bearer ${this.API_TOKEN}`
        };
    }

    ensureValidResponse(response) {
        if (response.status !== 200) {
            throw new Error(`Request failed, status ${response.status}`);
        }
    }
}

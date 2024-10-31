class Reader {

    getRelativeDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
    
        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days < 7) {
            return `${days} days ago`;
        } else if (weeks < 4) {
            return `${weeks} weeks ago`;
        } else if (months < 12) {
            return `${months} months ago`;
        } else {
            return `${years} years ago`;
        }
    }
    
    async fetchDocumentsFromListApi(category = 'epub') {
        const params = {
            category: category
        };
        const searchParams = new URLSearchParams(params).toString();
        return fetch(`https://readwise.io/api/v3/list/?${searchParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Token uyS6hVQaNbDy5Cw5Uiv8a4MEvHrjhiF4Ld3HqE4Y3hgRTMJU1l`
            }
        }).then(response => response.json()).then(data => {
            return data.results
        })
    }

    async fetchFromDocumentApi(dv, limit = 10, category = 'epub') {
        const allData = await this.fetchDocumentsFromListApi(category);

        dv.header(3, "Reader Documents");

        allData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // filter out items with a reading_progress of 100%
        const filteredData = allData.filter(d => d.reading_progress !== 1);
        filteredData.splice(limit);

        const tableData = filteredData.map(d => [
            `[${d.title}](https://read.readwise.io/read/${d.url.split('/').pop()})`,
            d.author,
            `${(d.reading_progress * 100).toFixed(2)}%`,
            this.getRelativeDate(d.updated_at)
        ]);

        dv.table([
            "Name",
            "Author",
            "Reading Progress",
            "Last Read"
        ], tableData);
    }

    async fetchFromEpubApi(dv, limit = 5) {
        return this.fetchFromDocumentApi(dv, limit, 'epub');
    }

    async fetchFromArticleApi(dv, limit = 5) {
        return this.fetchFromDocumentApi(dv, limit, 'article');
    }

    async fetchFromPdfApi(dv, limit = 5) {
        return this.fetchFromDocumentApi(dv, limit, 'pdf');
    }

}

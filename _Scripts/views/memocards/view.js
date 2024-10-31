// view.js
dv.container.classList.add("cards");
dv.container.classList.add("table-100");
dv.container.classList.add("table-max");
dv.container.classList.add("table-wide");
dv.container.classList.add("cards-16-9");
dv.container.classList.add("cards-cols-1");

const Memo = customJS.Memo;

Memo.setApiConfig({
    host: "https://memos.erauner.synology.me",
    version: "api/v2",
    token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiZXJhdW5lciIsImlzcyI6Im1lbW9zIiwic3ViIjoiMSIsImF1ZCI6WyJ1c2VyLmFjY2Vzcy10b2tlbiJdLCJpYXQiOjE3MDc4NTAwODZ9._RF2E87G2CLrUpM2mVbHCfR_9We7UcIVPNuGAuGthAk"
});

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function createMemoLink(memo) {
    const url = Memo.getMemoUrl(memo);
    return `<a href="${url}" target="_blank" class="internal-link">${Memo.name}</a>`;
}

async function renderMemos(pageSize = 20, pageToken = '') {
    try {
        const memos = await Memo.fetchMemos(pageSize, pageToken);

        if (memos.length === 0) {
            dv.paragraph("No memos found.");
        } else {
            const tableData = memos.map(m => [
                createMemoLink(m),
                m.content,
                m.creator,
                formatDateTime(m.createTime),
                m.pinned ? "📌" : ""
            ]);

            dv.table(["Memo", "Content", "Creator", "Created At", "Pinned"], tableData);
        }

        if (memos.length === pageSize) {
            const loadMoreButton = dv.el('button', 'Load More', { cls: 'load-more-button' });
            loadMoreButton.addEventListener('click', () => renderMemos(pageSize, memos[memos.length - 1].id));
            dv.container.appendChild(loadMoreButton);
        }
    } catch (error) {
        console.error("Error fetching memos:", error);
        dv.paragraph(`Error fetching memos: ${error.message}`);
    }
}

renderMemos();

// view.js
dv.container.classList.add("cards");
dv.container.classList.add("table-100");
dv.container.classList.add("table-max");
dv.container.classList.add("table-wide");
dv.container.classList.add("cards-16-9");
dv.container.classList.add("cards-cols-1");

const { ReadwiseReaderAPI } = customJS;

function createOpenButton(document) {
    const openButton = dv.el('button', 'Open in Reader', { cls: 'open-button' });
    openButton.addEventListener('click', () => {
        window.open(document.url, '_blank');
    });
    return openButton;
}

function getCardClass(document) {
    switch (document.category) {
        case 'article': return 'card-article';
        case 'book': return 'card-book';
        case 'tweet': return 'card-tweet';
        case 'podcast': return 'card-podcast';
        default: return 'card-default';
    }
}

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

function createDocumentCard(document) {
    const card = dv.el('div', '', { cls: `document-card ${getCardClass(document)}` });

    const title = dv.el('h3', document.title || 'Untitled', { cls: 'document-title' });
    card.appendChild(title);

    const author = dv.el('p', document.author || 'Unknown Author', { cls: 'document-author' });
    card.appendChild(author);

    if (document.summary) {
        const summary = dv.el('p', document.summary, { cls: 'document-summary' });
        card.appendChild(summary);
    }

    if (document.notes) {
        const noteContainer = dv.el('div', '', { cls: 'document-note-container' });
        const noteLabel = dv.el('span', 'Note:', { cls: 'document-note-label' });
        const noteContent = dv.el('p', document.notes, { cls: 'document-note-content' });
        noteContainer.appendChild(noteLabel);
        noteContainer.appendChild(noteContent);
        card.appendChild(noteContainer);
    }

    const details = dv.el('div', '', { cls: 'document-details' });
    details.appendChild(dv.el('span', document.category || 'Uncategorized', { cls: 'document-category' }));
    details.appendChild(dv.el('span', ReadwiseReaderAPI.formatRelativeTime(new Date(document.created_at)), { cls: 'document-date' }));
    card.appendChild(details);

    card.appendChild(createOpenButton(document));

    return card;
}

async function renderDocuments(cursor = null, limit = 20) {
    try {
        const response = await ReadwiseReaderAPI.getDocuments(limit, cursor);
        const documents = response.results;

        if (documents.length === 0) {
            dv.paragraph("No documents found.");
        } else {
            const container = dv.el('div', '', { cls: 'documents-container' });
            for (const document of documents) {
                const card = createDocumentCard(document);
                container.appendChild(card);
            }
            dv.container.appendChild(container);
        }

        if (response.nextPageCursor) {
            const loadMoreButton = dv.el('button', 'Load More', { cls: 'load-more-button' });
            loadMoreButton.addEventListener('click', () => renderDocuments(response.nextPageCursor, limit));
            dv.container.appendChild(loadMoreButton);
        }
    } catch (error) {
        console.error("Error fetching documents:", error);
        dv.paragraph(`Error fetching documents: ${error.message}`);
    }
}

renderDocuments();

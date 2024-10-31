// view.js
dv.container.classList.add("cards");
dv.container.classList.add("table-100");
dv.container.classList.add("table-max");
dv.container.classList.add("table-wide");
dv.container.classList.add("cards-16-9");
dv.container.classList.add("cards-cols-1");

const { ReadwiseHighlightsAPI } = customJS;

function createOpenButton(highlight) {
    const openButton = dv.el('button', 'Open in Readwise', { cls: 'open-button' });
    openButton.addEventListener('click', () => {
        const url = highlight.url || `https://readwise.io/open/${highlight.id}`;
        window.open(url, '_blank');
    });
    return openButton;
}

function getCardClass(highlight) {
    switch (highlight.category) {
        case 'books': return 'card-book';
        case 'articles': return 'card-article';
        case 'tweets': return 'card-tweet';
        case 'podcasts': return 'card-podcast';
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

function createHighlightCard(highlight) {
    const card = dv.el('div', '', { cls: `highlight-card ${getCardClass(highlight)}` });

    const title = dv.el('h3', highlight.book_title || 'Untitled', { cls: 'highlight-title' });
    card.appendChild(title);

    const author = dv.el('p', highlight.book_author || 'Unknown Author', { cls: 'highlight-author' });
    card.appendChild(author);

    const content = dv.el('blockquote', highlight.text, { cls: 'highlight-content' });
    card.appendChild(content);

    if (highlight.note) {
        const noteContainer = dv.el('div', '', { cls: 'highlight-note-container' });
        const noteLabel = dv.el('span', 'Note:', { cls: 'highlight-note-label' });
        const noteContent = dv.el('p', highlight.note, { cls: 'highlight-note-content' });
        noteContainer.appendChild(noteLabel);
        noteContainer.appendChild(noteContent);
        card.appendChild(noteContainer);
    }

    const details = dv.el('div', '', { cls: 'highlight-details' });
    details.appendChild(dv.el('span', highlight.category || 'Uncategorized', { cls: 'highlight-category' }));
    details.appendChild(dv.el('span', ReadwiseHighlightsAPI.formatRelativeTime(new Date(highlight.highlighted_at)), { cls: 'highlight-date' }));
    card.appendChild(details);

    card.appendChild(createOpenButton(highlight));

    return card;
}

async function renderHighlights(offset = 0, limit = 20) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const highlights = await ReadwiseHighlightsAPI.getHighlights(limit, offset, today.toISOString());

        if (highlights.length === 0) {
            dv.paragraph("No highlights found for today.");
        } else {
            const container = dv.el('div', '', { cls: 'highlights-container' });
            for (const highlight of highlights) {
                const card = createHighlightCard(highlight);
                container.appendChild(card);
            }
            dv.container.appendChild(container);
        }

        if (highlights.length === limit) {
            const loadMoreButton = dv.el('button', 'Load More', { cls: 'load-more-button' });
            loadMoreButton.addEventListener('click', () => renderHighlights(offset + limit, limit));
            dv.container.appendChild(loadMoreButton);
        }
    } catch (error) {
        console.error("Error fetching highlights:", error);
        dv.paragraph(`Error fetching highlights: ${error.message}`);
    }
}

renderHighlights();

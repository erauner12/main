// view.js
const { RaindropAPI } = customJS;

function createOpenButton(raindrop) {
    const openButton = dv.el('button', 'Open in Raindrop', { cls: 'open-button' });
    openButton.addEventListener('click', () => {
        window.open(raindrop.link, '_blank');
    });
    return openButton;
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function createRaindropCard(raindrop) {
    const card = dv.el('div', '', { cls: 'raindrop-card' });

    const title = dv.el('h3', raindrop.title, { cls: 'raindrop-title' });
    card.appendChild(title);

    const link = dv.el('a', raindrop.link, { cls: 'raindrop-link', href: raindrop.link, target: '_blank' });
    card.appendChild(link);

    if (raindrop.excerpt) {
        const excerpt = dv.el('p', raindrop.excerpt, { cls: 'raindrop-excerpt' });
        card.appendChild(excerpt);
    }

    const details = dv.el('div', '', { cls: 'raindrop-details' });
    details.appendChild(dv.el('span', formatDateTime(raindrop.created), { cls: 'raindrop-date' }));
    card.appendChild(details);

    if (raindrop.tags && raindrop.tags.length > 0) {
        const tags = dv.el('div', '', { cls: 'raindrop-tags' });
        raindrop.tags.forEach(tag => {
            tags.appendChild(dv.el('span', tag, { cls: 'raindrop-tag' }));
        });
        card.appendChild(tags);
    }

    card.appendChild(createOpenButton(raindrop));

    return card;
}

async function renderRaindrops(offset = 0, limit = 25) {
    const raindrops = await RaindropAPI.getRaindropsCreatedToday(limit, offset);

    if (raindrops.items.length === 0) {
        dv.paragraph("No raindrops created today.");
    } else {
        const container = dv.el('div', '', { cls: 'raindrops-container' });
        for (const raindrop of raindrops.items) {
            const card = createRaindropCard(raindrop);
            container.appendChild(card);
        }
        dv.container.appendChild(container);
    }

    // Add load more button
    if (raindrops.items.length === limit) {
        const loadMoreButton = dv.el('button', 'Load More', { cls: 'load-more-button' });
        loadMoreButton.addEventListener('click', () => renderRaindrops(offset + limit, limit));
        dv.container.appendChild(loadMoreButton);
    }
}

// Initial render
renderRaindrops();

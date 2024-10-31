// view.js
dv.container.classList.add("cards");
dv.container.classList.add("table-100");
dv.container.classList.add("table-max");
dv.container.classList.add("table-wide");
dv.container.classList.add("cards-16-9");
dv.container.classList.add("cards-cols-1");

const { TodoistActivityAPI } = customJS;

function createOpenButton(activity) {
    const id = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
    const openButton = dv.el('button', 'Open in Todoist', { cls: 'open-button' });
    openButton.addEventListener('click', () => {
        const url = `https://todoist.com/showTask?id=${id}`;
        window.open(url, '_blank');
    });
    return openButton;
}

function getCardClass(activity) {
    const type = `${activity.object_type}:${activity.event_type}`;
    switch (type) {
        case 'item:added': return 'card-added';
        case 'item:completed': return 'card-completed';
        case 'note:added':
        case 'note:updated': return 'card-note';
        default: return '';
    }
}

function translateActivityType(activity) {
    const type = `${activity.object_type}:${activity.event_type}`;
    switch (type) {
        case 'item:added': return 'Task Created';
        case 'item:completed': return 'Task Completed';
        case 'note:added': return 'Comment Added';
        case 'note:updated': return 'Comment Updated';
        default: return type;
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

async function createActivityCard(activity) {
    const card = dv.el('div', '', { cls: `activity-card ${getCardClass(activity)}` });

    const id = activity.object_type === 'note' ? activity.parent_item_id : activity.object_id;
    const taskDetails = await TodoistActivityAPI.getTaskDetails(id);

    const taskName = dv.el('h3', taskDetails ? taskDetails.content : 'Unknown Task', { cls: 'task-name' });
    card.appendChild(taskName);

    const content = dv.el('p', activity.extra_data.content, { cls: 'activity-content' });
    card.appendChild(content);

    const details = dv.el('div', '', { cls: 'activity-details' });
    details.appendChild(dv.el('span', translateActivityType(activity), { cls: 'activity-type' }));
    details.appendChild(dv.el('span', formatDateTime(activity.event_date), { cls: 'activity-date' }));
    card.appendChild(details);

    card.appendChild(createOpenButton(activity));

    return card;
}

async function renderActivities(offset = 0, limit = 10) {
    const activities = await TodoistActivityAPI.getActivities(limit, offset);

    if (activities.events.length === 0) {
        dv.paragraph("No activities found.");
    } else {
        const container = dv.el('div', '', { cls: 'activities-container' });
        for (const activity of activities.events) {
            const card = await createActivityCard(activity);
            container.appendChild(card);
        }
        dv.container.appendChild(container);
    }

    // Add load more button
    if (activities.events.length === limit) {
        const loadMoreButton = dv.el('button', 'Load More', { cls: 'load-more-button' });
        loadMoreButton.addEventListener('click', () => renderActivities(offset + limit, limit));
        dv.container.appendChild(loadMoreButton);
    }
}

// Initial render
renderActivities();

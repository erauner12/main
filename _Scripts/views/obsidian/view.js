// view.js

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Chicago',
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Chicago',
    };
    return date.toLocaleTimeString('en-US', options);
}

function extractPathWithoutFileName(filePath) {
    const parts = filePath.split('/');
    parts.pop();
    return parts.length > 0 ? parts.join('/') : '/';
}

function createNoteCard(note) {
    const card = dv.el('div', '', { cls: 'note-card' });

    const title = dv.el('h3', note.file.name, { cls: 'note-title' });
    card.appendChild(title);

    const path = dv.el('p', extractPathWithoutFileName(note.file.path), { cls: 'note-path' });
    card.appendChild(path);

    const details = dv.el('div', '', { cls: 'note-details' });
    details.appendChild(dv.el('span', `Created: ${formatTime(new Date(note.file.ctime))}`, { cls: 'note-date' }));
    details.appendChild(dv.el('span', `Modified: ${formatTime(new Date(note.file.mtime))}`, { cls: 'note-date' }));
    card.appendChild(details);

    const openButton = dv.el('button', 'Open Note', { cls: 'open-button' });
    openButton.addEventListener('click', (event) => {
        // Prevent the default action
        event.preventDefault();

        // Get the TFile object for this note
        const targetFile = app.vault.getAbstractFileByPath(note.file.path);

        // If the file exists, open it in a new leaf
        if (targetFile) {
            app.workspace.openLinkText(note.file.path, '', true);
        } else {
            // If the file doesn't exist, show an error message
            app.notices.createNotice("Unable to open the note. The file may not exist.", 5000);
        }
    });
    card.appendChild(openButton);

    return card;
}

function displayNotesForToday() {
    const today = formatDate(new Date());

    const createdTodayFiles = dv.pages().where(p => {
        const createdDate = formatDate(new Date(p.file.ctime));
        return today === createdDate;
    });

    const modifiedTodayFiles = dv.pages().where(p => {
        const modifiedDate = formatDate(new Date(p.file.mtime));
        const createdDate = formatDate(new Date(p.file.ctime));
        return today === modifiedDate && today !== createdDate;
    });

    dv.header(2, 'Notes Created Today');
    const createdContainer = dv.el('div', '', { cls: 'notes-container' });
    createdTodayFiles.forEach(note => {
        createdContainer.appendChild(createNoteCard(note));
    });
    dv.container.appendChild(createdContainer);

    dv.header(2, 'Notes Modified Today');
    const modifiedContainer = dv.el('div', '', { cls: 'notes-container' });
    modifiedTodayFiles.forEach(note => {
        modifiedContainer.appendChild(createNoteCard(note));
    });
    dv.container.appendChild(modifiedContainer);
}

// Initialize and render
displayNotesForToday();



// todo Add a button to refresh the view

// TODO: Add a button to show notes for a specific date



// views/memos/controller/memoController.js


const {
    filterMemosByCreationDate,
    filterMemosByModificationDate
} = require('_Scripts/views/memos/utils/utils.js');

const {
    hideMemo,
    openMemoEditForm,
    createTaskFromMemo,
    createProjectFromMemo,
    openMemoCreateForm
} = require('_Scripts/views/memos/controller/memoController.js');

const { hiddenMemos } = require('_Scripts/views/memos/state.js');

// ========= Button Creation (With Update) Functions =========

async function createNewMemo(dv, memoTable, container) {
    const createdMemo = await openMemoCreateForm(dv, memoTable, container);
    if (createdMemo) {
        console.log('Memo created successfully:', createdMemo);

    }
}

async function createPinButton(dv, memo, memoTable, memoContainer) {
    const pinButton = dv.el('button', memo.pinned ? '📌' : '📍', { cls: 'memo-button pin-button' }
    );
    pinButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.toggleMemoPinned(memo.name, memo.pinned);
        memo.pinned = !memo.pinned;

    }));
    return pinButton;
}

async function createDeleteButton(dv, memo, memoTable, container, apiConfig) {
    const deleteButton = dv.el('button', '🗑️', { cls: 'memo-button delete-button' });
    deleteButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.deleteMemo(memo.name);

    }));
    return deleteButton;
}

async function createCutButton(dv, memo, memoTable, memoContainer) {
    const cutButton = dv.el('button', '✂️', { cls: 'memo-button cut-button' })
    cutButton.addEventListener('click', withCloseDropdowns(async () => {
        copyMemoContent(memo)
        await memoTable.archiveMemo(memo.name)

    }));
    return cutButton;
}

async function createArchiveButton(dv, memo, memoTable, memoContainer) {
    const archiveButton = dv.el('button', '📥', { cls: 'memo-button archive-button' }
    );
    archiveButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.archiveMemo(memo.name)

    }));
    return archiveButton;
}


async function createAppendFromClipboardButton(dv, memo, memoTable, memoContainer) {
    const appendFromClipboardButton = dv.el('button', '📋➕', { cls: 'memo-button append-from-clipboard-button' });
    appendFromClipboardButton.addEventListener('click', async () => {
        const clipboardContent = await navigator.clipboard.readText();
        if (clipboardContent) {
            const updatedContent = `${memo.content}\n\n---\n\n${clipboardContent}`;
            const updatedMemo = {
                name: memo.name,
                content: updatedContent,
            };
            const updatedMemoResponse = await memoTable.updateMemo(updatedMemo);
            if (updatedMemoResponse) {

            }
        } else {
            console.log('Clipboard is empty');
        }
    });
    return appendFromClipboardButton;
}


async function createPasteButton(dv, memo, memoTable, memoGrid) {
    const pasteButton = dv.el('button', '📋➕', { cls: 'memo-button paste-button' });
    pasteButton.addEventListener('click', withCloseDropdowns(async () => {
        const clipboardContent = await navigator.clipboard.readText();
        if (clipboardContent) {
            const pasteOptions = ['Append', 'Prepend'];
            const selectedOption = await app.plugins.plugins.quickadd.api.suggester(pasteOptions, pasteOptions);
            if (selectedOption) {
                let updatedContent = '';
                if (selectedOption === 'Prepend') {
                    updatedContent = `${clipboardContent}\n\n---\n\n${memo.content}`;
                } else if (selectedOption === 'Append') {
                    updatedContent = `${memo.content}\n\n---\n\n${clipboardContent}`;
                }
                const updatedMemo = {
                    name: memo.name,
                    content: updatedContent,
                };
                const updatedMemoResponse = await memoTable.updateMemo(updatedMemo);
                if (updatedMemoResponse) {

                }
            }
        } else {
            console.log('Clipboard is empty');
        }
    }));
    return pasteButton;
}

async function createEditButton(dv, memo, memoTable, memoGrid, apiConfig) {
    const editButton = dv.el('button', '✏️', { cls: 'memo-button edit-button' });
    editButton.addEventListener('click', withCloseDropdowns(async () => {
        const updatedMemo = await openMemoEditForm(memo, memoTable);
        if (updatedMemo) {
            await memoTable.updateMemo(updatedMemo);

        }
    }));
    return editButton;
}

async function createBumpButton(dv, memo, memoTable, memoContainer) {
    const bumpButton = dv.el('button', '⬆️', { cls: 'memo-button bump-button' });
    bumpButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.bumpMemo(memo.name);

    }));
    return bumpButton;
}

async function createOpenMemoButton(dv, memo, memoTable, memoContainer, apiConfig, eventNamespace) {
    const openMemoButton = dv.el('button', '🔗', { cls: 'memo-button open-memo-button' });
    openMemoButton.addEventListener('click', async () => {
        const memoUrl = memoTable.getMemoUrl(memo);
        window.open(memoUrl, '_blank');
        await memoTable.bumpMemo(memo.name);
    });
    return openMemoButton;
}

async function createCopyButton(dv, memo, memoTable, memoContainer) {
    const copyButton = dv.el('button', '📋', { cls: 'memo-button copy-button' })
    copyButton.addEventListener('click', withCloseDropdowns(async () => {
        copyMemoContent(memo)
        // bump the memo after copying
        await memoTable.bumpMemo(memo.name)

    }))
    return copyButton
}


// ========= Button Creation Functions (Without Update) =========

function createMemoButton(dv, memoTable, container) {
    const createButton = dv.el('button', '🆕', { cls: 'memo-button create-button' });
    createButton.addEventListener('click', async () => {
        await createNewMemo(memoTable, container);
    });
    return createButton;
}

function createSearchContainer(dv, memoGrid, apiConfig) {
    const searchContainer = dv.el('div', '', { cls: 'search-container' });
    const searchInput = dv.el('input', '', { cls: 'search-input', type: 'text', placeholder: 'Search memos...' });
    const searchButton = dv.el('button', 'Search', { cls: 'search-button' });
    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            await handleSearch(searchTerm, memoGrid, apiConfig);
        }
    });
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    return searchContainer;
}

// TODO: eventually make this a toggle
function createShowOnlyTodayButton(dv, memoTable, container, title) {
    const showOnlyTodayButton = dv.el('button', '📅', { cls: 'memo-button show-only-today-button' });
    showOnlyTodayButton.addEventListener('click', async () => {
        const today = new Date();
        const memos = await memoTable.fetchMemos();
        // const filteredMemos = filterMemosByCreationDate(memos, today);
    });
    return showOnlyTodayButton;
}

// TODO: eventually make this a toggle
function createShowOnlyModifiedTodayButton(dv, memoTable, container, title) {
    const showOnlyModifiedTodayButton = dv.el('button', '🔄', { cls: 'memo-button show-only-modified-today-button' });
    showOnlyModifiedTodayButton.addEventListener('click', async () => {
        const today = new Date();
        const memos = await memoTable.fetchMemos();
        // const filteredMemos = filterMemosByModificationDate(memos, today);
    });
    return showOnlyModifiedTodayButton;
}

async function createTodoistDropdownButton(dv, memo, memoTable, memoCard) {
    const todoistButtonContainer = dv.el('div', '', { cls: 'memo-button-container todoist-dropdown' });

    const dropdownButton = dv.el('button', '✅', { cls: 'memo-button dropdown-button' });
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        const isOpen = dropdownContent.classList.contains('show');

        closeDropdowns();

        if (!isOpen) {
            dropdownContent.classList.add('show');
        }
    });
    todoistButtonContainer.appendChild(dropdownButton);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });
    const createTaskButton = await createCreateTaskFromMemoButton(dv, memo, memoTable, memoCard);
    dropdownContent.appendChild(createTaskButton);

    const createProjectButton = await createCreateProjectButton(dv, memo, memoTable, memoCard);
    dropdownContent.appendChild(createProjectButton);

    todoistButtonContainer.appendChild(dropdownContent);

    return todoistButtonContainer;
}

async function createCreateTaskFromMemoButton(dv, memo, memoTable, memoCard) {
    const createTaskButton = dv.el('button', '📋➡️', { cls: 'memo-button create-task-button' });
    createTaskButton.addEventListener('click', withCloseDropdowns(async () => {
        await createTaskFromMemo(memo, memoTable, memoCard);
    }));
    return createTaskButton;
}

async function createCreateProjectButton(dv, memo, memoTable, memoCard) {
    const createProjectButton = dv.el('button', '📋🗂️', { cls: 'memo-button create-project-button' });
    createProjectButton.addEventListener('click', withCloseDropdowns(async () => {
        await createProjectFromMemo(memo, memoTable, memoCard);
    }));
    return createProjectButton;
}

function createHideButton(dv, memo, memoCard) {
    const hideButton = dv.el('button', '👁️', { cls: 'memo-button hide-button' });
    hideButton.addEventListener('click', () => {
        hideMemo(dv, memo.name, memoCard);
    });
    return hideButton;
}


function copyMemoContent(dv, memo) {
    navigator.clipboard.writeText(memo.content)
        .then(() => {
            console.log('Memo content copied to clipboard');
        })
        .catch(err => {
            console.error('Error copying memo content: ', err);
        });
}

function closeDropdowns(dv) {
    const dropdowns = document.querySelectorAll('.dropdown-content.show');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
}

function withCloseDropdowns(eventListener) {
    return async function (...args) {
        await eventListener(...args);
        closeDropdowns();
    };
}






async function createActionsDropdownButton(dv, memo, memoTable, memoGrid) {
    const actionsButtonContainer = dv.el('div', '', { cls: 'memo-button-container actions-dropdown' });

    const dropdownButton = dv.el('button', '⚙️', { cls: 'memo-button dropdown-button' });
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        const isOpen = dropdownContent.classList.contains('show');

        closeDropdowns();

        if (!isOpen) {
            dropdownContent.classList.add('show');
        }
    });
    actionsButtonContainer.appendChild(dropdownButton);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });

    const archiveButton = await createArchiveButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(archiveButton);

    const deleteButton = await createDeleteButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(deleteButton);

    const pinButton = await createPinButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(pinButton);

    const editButton = await createEditButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(editButton);

    actionsButtonContainer.appendChild(dropdownContent);

    return actionsButtonContainer;
}

async function createTextActionsDropdownButton(dv, memo, memoTable, memoGrid) {
    const textActionsButtonContainer = dv.el('div', '', { cls: 'memo-button-container text-actions-dropdown' });

    const dropdownButton = dv.el('button', '✂️', { cls: 'memo-button dropdown-button' });
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        const isOpen = dropdownContent.classList.contains('show');

        closeDropdowns();

        if (!isOpen) {
            dropdownContent.classList.add('show');
        }
    });
    textActionsButtonContainer.appendChild(dropdownButton);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });
    const copyButton = await createCopyButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(copyButton);

    const cutButton = await createCutButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(cutButton);

    const pasteButton = await createPasteButton(dv, memo, memoTable, memoGrid);
    dropdownContent.appendChild(pasteButton);

    textActionsButtonContainer.appendChild(dropdownContent);

    return textActionsButtonContainer;
}

async function createAppendToDailyNoteButton(dv, memo, memoTable, memoContainer, apiConfig) {
    const appendToDailyNoteButton = dv.el('button', '📓➕', { cls: 'memo-button append-to-daily-note-button' });
    appendToDailyNoteButton.addEventListener('click', async () => {
        const memoContent = memo.content;

        const pasteOptions = ['Append', 'Prepend'];
        const selectedOption = await app.plugins.plugins.quickadd.api.suggester(pasteOptions, pasteOptions);

        if (selectedOption) {
            let updatedContent = '';
            let mode = '';

            if (selectedOption === 'Prepend') {
                updatedContent = `${memoContent}\n\n---\n\n`;
                mode = 'prepend';
            } else if (selectedOption === 'Append') {
                updatedContent = `\n\n---\n\n${memoContent}`;
                mode = 'append';
            }

            const encodedContent = encodeURIComponent(updatedContent);
            const vaultName = app.vault.getName();
            const dailyNoteCommand = `obsidian://advanced-uri?vault=${vaultName}&daily=true&data=${encodedContent}&mode=${mode}`;

            // Append or prepend memo content to daily note
            window.open(dailyNoteCommand, '_blank');
        }
    });
    return appendToDailyNoteButton;
}

function createSortingToggleButton(dv, memoTable, container, title, showPinnedFirst) {
    const sortingToggleButton = dv.el('button', showPinnedFirst ? '📌↑' : '⏰↑', { cls: 'memo-button sorting-toggle-button' });
    sortingToggleButton.addEventListener('click', async () => {
        showPinnedFirst = !showPinnedFirst;
        sortingToggleButton.textContent = showPinnedFirst ? '📌↑' : '⏰↑';
        const memos = await memoTable.fetchMemos();
        await renderMemosCard(dv, memos, container.querySelector('.memo-container'), title, memoTable, showPinnedFirst);
    });
    return sortingToggleButton;
}

function updateHiddenMemoCount(dv) {
    const hiddenMemoCount = Object.keys(hiddenMemos).length;
    const hiddenMemoCountElement = document.querySelector('.hidden-memo-count');
    if (hiddenMemoCountElement) {
        hiddenMemoCountElement.textContent = `Hidden Memos: ${hiddenMemoCount}`;
    } else {
        const hiddenMemoCountElement = dv.el('span', `Hidden Memos: ${hiddenMemoCount}`, { cls: 'hidden-memo-count' });
        document.body.appendChild(hiddenMemoCountElement);
    }
}

module.exports = {
    createNewMemo,
    createMemoButton,
    createPinButton,
    createDeleteButton,
    createCutButton,
    createArchiveButton,
    createAppendFromClipboardButton,
    createPasteButton,
    createEditButton,
    createBumpButton,
    createOpenMemoButton,
    createCopyButton,
    createHideButton,
    createActionsDropdownButton,
    createTextActionsDropdownButton,
    createAppendToDailyNoteButton,
    createSortingToggleButton,
    createSearchContainer,
    createShowOnlyTodayButton,
    createShowOnlyModifiedTodayButton,
    createTodoistDropdownButton,
    createCreateTaskFromMemoButton,
    createCreateProjectButton,
    createHideButton,
    updateHiddenMemoCount,
    withCloseDropdowns,
    closeDropdowns,
};

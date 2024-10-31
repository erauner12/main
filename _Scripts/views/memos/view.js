// view.js

// ========= Imports =========
// Import any necessary modules or dependencies

const { Memo } = customJS;

const {
    formatRelativeTime,
    sortMemosByUpdateTime,
    filterMemosByCreationDate,
    filterMemosByModificationDate,
    sortMemosByUpdateTimeAscending
} = require('_Scripts/views/memos/utils/utils.js');

const {
    SIDE_MEMOS_API_CONFIG,
    WORK_MEMOS_API_CONFIG,
    HOME_MEMOS_API_CONFIG,
    PERSONAL_MEMOS_API_CONFIG,
    TODOIST_API_CONFIG
} = require('_Scripts/views/memos/config.js');

// ========= Constants =========

const hiddenMemos = {};


// ========= Button Creation (With Update) Functions =========

async function createNewMemo(memoTable, container) {
    const createdMemo = await openMemoCreateForm(memoTable, container);
    if (createdMemo) {
        console.log('Memo created successfully:', createdMemo);
        const updatedMemos = await memoTable.fetchMemos();
        const memoGrid = container.querySelector('.memo-container');
        memoGrid.innerHTML = '';
        await renderMemoGrid(updatedMemos, memoGrid, '', memoTable, false, true);
    }
}

async function createPinButton(memo, memoTable, memoContainer) {
    const pinButton = dv.el('button', memo.pinned ? '📌' : '📍', { cls: 'memo-button pin-button' }
    );
    pinButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.toggleMemoPinned(memo.name, memo.pinned);
        memo.pinned = !memo.pinned;
        pinButton.textContent = memo.pinned ? '📌' : '📍';
        alert('Memo pinned status updated successfully!');
        // const updatedMemos = await memoTable.fetchMemos();
        // memoContainer.innerHTML = '';
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true);
    }));
    return pinButton;
}

async function createDeleteButton(memo, memoTable, memoContainer) {
    const deleteButton = dv.el('button', '🗑️', { cls: 'memo-button delete-button' })
    deleteButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.deleteMemo(memo.name)
        alert('Memo deleted successfully!')
        // const updatedMemos = await memoTable.fetchMemos()
        // memoContainer.innerHTML = ''
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true)
    }));
    return deleteButton;
}

async function createCutButton(memo, memoTable, memoContainer) {
    const cutButton = dv.el('button', '✂️', { cls: 'memo-button cut-button' })
    cutButton.addEventListener('click', withCloseDropdowns(async () => {
        copyMemoContent(memo)
        await memoTable.archiveMemo(memo.name)
        alert('Memo archived successfully!')
        // const updatedMemos = await memoTable.fetchMemos()
        // memoContainer.innerHTML = ''
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true)
    }));
    return cutButton;
}

async function createArchiveButton(memo, memoTable, memoContainer) {
    const archiveButton = dv.el('button', '📥', { cls: 'memo-button archive-button' }
    );
    archiveButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.archiveMemo(memo.name)
        alert('Memo archived successfully!')
        // const updatedMemos = await memoTable.fetchMemos()
        // memoContainer.innerHTML = ''
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true)
    }));
    return archiveButton;
}


async function createAppendFromClipboardButton(memo, memoTable, memoContainer) {
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
                alert('Memo updated successfully!')
                // const updatedMemos = await memoTable.fetchMemos();
                // memoContainer.innerHTML = '';
                // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true);
            }
        } else {
            console.log('Clipboard is empty');
        }
    });
    return appendFromClipboardButton;
}


async function createPasteButton(memo, memoTable, memoGrid) {
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
                    alert('Memo updated successfully!')
                    // const updatedMemos = await memoTable.fetchMemos();
                    // memoGrid.innerHTML = '';
                    // await renderMemoGrid(updatedMemos, memoGrid, '', memoTable, false, true);
                }
            }
        } else {
            console.log('Clipboard is empty');
        }
    }));
    return pasteButton;
}

async function createEditButton(memo, memoTable, memoGrid) {
    const editButton = dv.el('button', '✏️', { cls: 'memo-button edit-button' });
    editButton.addEventListener('click', withCloseDropdowns(async () => {
        const updatedMemo = await openMemoEditForm(memo, memoTable);
        if (updatedMemo) {
            await memoTable.updateMemo(updatedMemo);
            alert('Memo updated successfully!')
            // const updatedMemos = await memoTable.fetchMemos();
            // memoGrid.innerHTML = '';
            // await renderMemoGrid(updatedMemos, memoGrid, '', memoTable, false, true);
        }
    }));
    return editButton;
}

async function createBumpButton(memo, memoTable, memoContainer) {
    const bumpButton = dv.el('button', '⬆️', { cls: 'memo-button bump-button' });
    bumpButton.addEventListener('click', withCloseDropdowns(async () => {
        await memoTable.bumpMemo(memo.name);
        // const updatedMemos = await memoTable.fetchMemos();
        // memoContainer.innerHTML = '';
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true);
    }));
    return bumpButton;
}


async function createOpenMemoButton(memo, memoTable, memoContainer) {
    const openMemoButton = dv.el('button', '🔗', { cls: 'memo-button open-memo-button' });
    openMemoButton.addEventListener('click', async () => {
        const memoUrl = memoTable.getMemoUrl(memo);
        openLink(memoUrl, 'memo');
    });
    return openMemoButton;
}

async function createCopyButton(memo, memoTable, memoContainer) {
    const copyButton = dv.el('button', '📋', { cls: 'memo-button copy-button' })
    copyButton.addEventListener('click', withCloseDropdowns(async () => {
        copyMemoContent(memo)
        alert('Memo content copied to clipboard!')
        // bump the memo after copying
        // await memoTable.bumpMemo(memo.name)

        //
        // const updatedMemos = await memoTable.fetchMemos()
        // memoContainer.innerHTML = ''
        // await renderMemoGrid(updatedMemos, memoContainer, '', memoTable, false, true)
    }))
    return copyButton
}


// ========= Button Creation Functions (Without Update) =========

function createGlobalButtons(mainContainer) {
    const globalButtonsContainer = dv.el('div', '', { cls: 'global-buttons-container' });
    const sideMemosButton = dv.el('button', 'Side Memos', { cls: 'global-button side-memos-button' });
    const workMemosButton = dv.el('button', 'Work Memos', { cls: 'global-button work-memos-button' });
    const homeMemosButton = dv.el('button', 'Home Memos', { cls: 'global-button home-memos-button' });
    const personalMemosButton = dv.el('button', 'Personal Memos', { cls: 'global-button personal-memos-button' });
    const allMemosButton = dv.el('button', 'All Memos', { cls: 'global-button all-memos-button' });

    sideMemosButton.addEventListener('click', async () => {
        await renderSpecificView(mainContainer, 'memoTable', SIDE_MEMOS_API_CONFIG, 'Side Memos');
    });

    workMemosButton.addEventListener('click', async () => {
        await renderSpecificView(mainContainer, 'memoTable', WORK_MEMOS_API_CONFIG, 'Work Memos');
    });

    homeMemosButton.addEventListener('click', async () => {
        await renderSpecificView(mainContainer, 'memoTable', HOME_MEMOS_API_CONFIG, 'Home Memos');
    });

    personalMemosButton.addEventListener('click', async () => {
        await renderSpecificView(mainContainer, 'memoTable', PERSONAL_MEMOS_API_CONFIG, 'Personal Memos');
    });

    allMemosButton.addEventListener('click', async () => {
        await renderAllMemosView(mainContainer);
    });

    globalButtonsContainer.appendChild(personalMemosButton);
    globalButtonsContainer.appendChild(homeMemosButton);
    globalButtonsContainer.appendChild(sideMemosButton);
    globalButtonsContainer.appendChild(workMemosButton);
    globalButtonsContainer.appendChild(allMemosButton);

    return globalButtonsContainer;
}

function createMemoButton(memoTable, container) {
    const createButton = dv.el('button', '🆕', { cls: 'memo-button create-button' });
    createButton.addEventListener('click', async () => {
        await createNewMemo(memoTable, container);
    });
    return createButton;
}

function createSearchContainer(memoGrid, apiConfig) {
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
function createShowOnlyTodayButton(memoTable, container, title) {
    const showOnlyTodayButton = dv.el('button', '📅', { cls: 'memo-button show-only-today-button' });
    showOnlyTodayButton.addEventListener('click', async () => {
        const today = new Date();
        const memos = await memoTable.fetchMemos();
        const filteredMemos = filterMemosByCreationDate(memos, today);
        await renderMemoGrid(filteredMemos, container.querySelector('.memo-container'), title, memoTable, false, true, true); // Pass true for oldestFirst parameter
    });
    return showOnlyTodayButton;
}

// TODO: eventually make this a toggle
function createShowOnlyModifiedTodayButton(memoTable, container, title) {
    const showOnlyModifiedTodayButton = dv.el('button', '🔄', { cls: 'memo-button show-only-modified-today-button' });
    showOnlyModifiedTodayButton.addEventListener('click', async () => {
        const today = new Date();
        const memos = await memoTable.fetchMemos();
        const filteredMemos = filterMemosByModificationDate(memos, today);
        await renderMemoGrid(filteredMemos, container.querySelector('.memo-container'), title, memoTable, false, true);
    });
    return showOnlyModifiedTodayButton;
}

async function createTodoistDropdownButton(memo, memoTable, memoCard) {
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
    const createTaskButton = await createCreateTaskFromMemoButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(createTaskButton);

    const createProjectButton = await createCreateProjectButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(createProjectButton);

    const commentOnTaskButton = await createCommentOnTaskButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(commentOnTaskButton);

    todoistButtonContainer.appendChild(dropdownContent);

    return todoistButtonContainer;
}

async function createCreateTaskFromMemoButton(memo, memoTable, memoCard) {
    const createTaskButton = dv.el('button', '📋➡️', { cls: 'memo-button create-task-button' });
    createTaskButton.addEventListener('click', withCloseDropdowns(async () => {
        await createTaskFromMemo(memo, memoTable, memoCard);
    }));
    return createTaskButton;
}

async function createCreateProjectButton(memo, memoTable, memoCard) {
    const createProjectButton = dv.el('button', '📋🗂️', { cls: 'memo-button create-project-button' });
    createProjectButton.addEventListener('click', withCloseDropdowns(async () => {
        await createProjectFromMemo(memo, memoTable, memoCard);
    }));
    return createProjectButton;
}

function createHideButton(memo, memoCard) {
    const hideButton = dv.el('button', '👁️', { cls: 'memo-button hide-button' });
    hideButton.addEventListener('click', () => {
        hideMemo(memo.name, memoCard);
    });
    return hideButton;
}


function copyMemoContent(memo) {
    navigator.clipboard.writeText(memo.content)
        .then(() => {
            console.log('Memo content copied to clipboard');
        })
        .catch(err => {
            console.error('Error copying memo content: ', err);
        });
}

function closeDropdowns() {
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


async function createActionsDropdownButton(memo, memoTable, memoCard) {
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

    const archiveButton = await createArchiveButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(archiveButton);

    const deleteButton = await createDeleteButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(deleteButton);

    const pinButton = await createPinButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(pinButton);

    const editButton = await createEditButton(memo, memoTable, memoCard);
    dropdownContent.appendChild(editButton);

    actionsButtonContainer.appendChild(dropdownContent);

    return actionsButtonContainer;
}

async function createTextActionsDropdownButton(memo, memoTable, memoGrid) {
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
    const copyButton = await createCopyButton(memo, memoTable, memoGrid);
    dropdownContent.appendChild(copyButton);

    const cutButton = await createCutButton(memo, memoTable, memoGrid);
    dropdownContent.appendChild(cutButton);

    const pasteButton = await createPasteButton(memo, memoTable, memoGrid);
    dropdownContent.appendChild(pasteButton);

    // Add the new "Overwrite with Clipboard" button
    const overwriteWithClipboardButton = await createOverwriteWithClipboardButton(memo, memoTable, memoGrid);
    dropdownContent.appendChild(overwriteWithClipboardButton);

    textActionsButtonContainer.appendChild(dropdownContent);

    return textActionsButtonContainer;
}

async function createOverwriteWithClipboardButton(memo, memoTable, memoGrid) {
    const overwriteWithClipboardButton = dv.el('button', '📋🔄', { cls: 'memo-button overwrite-with-clipboard-button' });
    overwriteWithClipboardButton.addEventListener('click', async () => {
        const clipboardContent = await navigator.clipboard.readText();
        if (clipboardContent) {
            const confirmOverwrite = await app.plugins.plugins.quickadd.api.yesNoPrompt(
                'Overwrite Memo',
                'Are you sure you want to overwrite the memo content with the clipboard content?'
            );

            if (confirmOverwrite) {
                const updatedMemo = {
                    name: memo.name,
                    content: clipboardContent,
                };
                const updatedMemoResponse = await memoTable.updateMemo(updatedMemo);
                if (updatedMemoResponse) {
                    alert('Memo updated successfully!')
                    // const updatedMemos = await memoTable.fetchMemos();
                    // memoGrid.innerHTML = '';
                    // await renderMemoGrid(updatedMemos, memoGrid, '', memoTable, false, true);
                }
            }
        } else {
            console.log('Clipboard is empty');
        }
    });
    return overwriteWithClipboardButton;
}

async function createNewNoteButton(memo, memoTable, memoGrid) {
    const newNoteButton = dv.el('button', '📝', { cls: 'memo-button new-note-button' });
    newNoteButton.addEventListener('click', withCloseDropdowns(async () => {
        await createNewNoteFromMemo(memo);
        await memoTable.archiveMemo(memo.name);
        memoGrid.innerHTML = '';
    }));
    return newNoteButton;
}

async function createNewNoteFromMemo(memo) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const values = {
        title: '',
        body: memo.content,
    };
    const result = await modalForm.openForm("obsidian-form", { values: values });

    if (result) {
        const noteTitle = result.title.value;
        const noteContent = result.body.value;

        // Create the note content with the title and body
        const formattedContent = `# ${noteTitle}\n\n${noteContent}`;

        // Create the new note
        const vaultName = 'main';
        const filePath = `Content/Notes/Memos/${noteTitle}.md`;
        const encodedContent = encodeURIComponent(formattedContent);
        const createNoteCommand = `obsidian://advanced-uri?vault=${vaultName}&filepath=${filePath}&data=${encodedContent}&mode=new`;

        // Open the create note command in a new tab
        window.open(createNoteCommand, '_blank');

        // Reference the new note in the daily note
        const encodedReference = encodeURIComponent(`[[${noteTitle}]]`);
        const dailyNoteCommand = `obsidian://advanced-uri?vault=${vaultName}&daily=true&data=${encodedReference}&mode=append`;

        // Open the newly created note
        const openNoteCommand = `obsidian://advanced-uri?vault=${vaultName}&filepath=${filePath}`;

        // Open the new note in a new tab
        window.open(openNoteCommand, '_blank');
    }
}

async function createAppendToDailyNoteButton(memo, memoTable, memoGrid) {
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

// ========= Event Handling Functions =========


async function openMemoCreateForm(memoTable, memoGrid) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const values = {
        content: '',
        isPinned: false, // Add the isPinned parameter with a default value of false
    };
    const result = await modalForm.openForm("memos-form", { values: values });

    if (result) {
        const newMemo = {
            content: result.content.value,
            visibility: 'VISIBILITY_UNSPECIFIED',
        };
        const createdMemo = await memoTable.createMemo(newMemo);

        // If the memo should be pinned, update it immediately
        if (result.isPinned.value) {
            const updatedMemo = {
                name: createdMemo.name,
                pinned: true,
            };
            await memoTable.updateMemo(updatedMemo);
        }

        return createdMemo;
    }
    return null;
}


async function handleSearch(searchTerm, memoGrid, apiConfig) {
    const memoTable = customJS.createMemoInstance();
    memoTable.setApiConfig(apiConfig);
    const searchUrl = memoTable.getSearchUrlResults(searchTerm);
    await navigator.clipboard.writeText(searchTerm);
    openLink(searchUrl, 'search');
}

async function searchMemos(searchTerm, memoGrid, apiConfig) {
    const memoTable = customJS.createMemoInstance();
    memoTable.setApiConfig(apiConfig);
    const url = `${memoTable.getApiUrlBase()}/memos:search`;
    const response = await memoTable.sendGetRequest(url, { q: searchTerm });
    return response.memos;
}

async function suggestMemo(searchResults) {
    const memoTitles = searchResults.map(memo => memo.content.slice(0, 50));
    const selectedMemoTitle = await app.plugins.plugins.quickadd.api.suggester(memoTitles, searchResults);
    return selectedMemoTitle;
}

async function createProjectFromMemo(memo, memoTable, memoGrid) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const values = {
        content: '',
        description: memo.content,
    };
    const result = await modalForm.openForm("create-task-from-memo", { values: values });

    if (result) {
        const todoistSyncApiConfig = {
            host: "https://api.todoist.com",
            version: "sync/v10",
            token: "20fdade709c084c2e255e56e57d0e53370e8283e"
        };

        const todoistSyncApi = customJS.createTodoistSyncAPIInstance();
        todoistSyncApi.setApiConfig(todoistSyncApiConfig.host, todoistSyncApiConfig.version, todoistSyncApiConfig.token);

        const todoistApiConfig = {
            host: "https://api.todoist.com",
            version: "rest/v2",
            token: "20fdade709c084c2e255e56e57d0e53370e8283e"
        };

        const todoistApi = customJS.createTodoistApiInstance();
        todoistApi.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

        const workspaces = [
            { id: "62769", name: "Work/Job Workspace" },
            { id: "62542", name: "Side Project Workspace" },
            { id: null, name: "Personal Workspace" }
        ];

        const selectedWorkspace = await app.plugins.plugins.quickadd.api.suggester(
            workspaces.map(workspace => workspace.name),
            workspaces
        );

        const projectData = {
            name: result.content.value,
            workspace_id: selectedWorkspace.id
        };

        try {
            const createdProject = await todoistSyncApi.createProjectInWorkspace(projectData);
            const commentData = {
                project_id: createdProject.id,
                content: result.description.value,
            };
            await todoistApi.createComment(commentData);
            await memoTable.archiveMemo(memo.name);
            alert('Project created successfully!')
            // const updatedMemos = await memoTable.fetchMemos();
            // memoGrid.innerHTML = '';
            // await renderMemoGrid(updatedMemos, memoGrid, '', memoTable, false, true);
        } catch (error) {
            console.error('Error creating project or archiving memo:', error);
        }
    }
}

async function createCommentOnTaskButton(memo, memoTable, memoCard) {
    const commentOnTaskButton = dv.el('button', '💬➡️', { cls: 'memo-button comment-on-task-button' });
    commentOnTaskButton.addEventListener('click', withCloseDropdowns(async () => {
        await handleCommentOnTask(memo.content);
        await memoTable.archiveMemo(memo.name);
    }));
    return commentOnTaskButton;
}

async function handleCommentOnTask(focusText) {
    const todoistApi = customJS.createTodoistApiInstance();
    todoistApi.setApiConfig(TODOIST_API_CONFIG.host, TODOIST_API_CONFIG.version, TODOIST_API_CONFIG.token);

    const activeTasks = await todoistApi.getActiveTasks();
    const taskNames = activeTasks.map(task => task.content);
    const selectedTaskName = await app.plugins.plugins.quickadd.api.suggester(taskNames, taskNames);

    if (selectedTaskName) {
        const selectedTask = activeTasks.find(task => task.content === selectedTaskName);
        const defaultComment = focusText.trim();
        const defaultDescription = `Task: ${selectedTask.content}\n\nDescription: ${selectedTask.description || 'No description available.'}`;
        const values = {
            comment: defaultComment,
            description: defaultDescription,
        };
        const result = await app.plugins.plugins.modalforms.api.openForm("comment-form", { values: values });
        const formData = result.getData();

        if (formData && formData.comment) {
            const updateTypes = ["Progress Update", "Next step", "Blocked"];
            const selectedUpdateType = await app.plugins.plugins.quickadd.api.suggester(updateTypes, updateTypes);

            if (selectedUpdateType) {
                let commentWithUpdateType = `${selectedUpdateType}:\n\n${formData.comment}`;
                const clipboardContent = await app.plugins.plugins.quickadd.api.utility.getClipboard();
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const matchedUrl = clipboardContent.match(urlRegex);

                if (matchedUrl) {
                    const referenceLink = `\n\nRef:\n[Reference Link](${matchedUrl[0]})`;
                    commentWithUpdateType += referenceLink;
                }

                await todoistApi.addCommentToTask(selectedTask.id, commentWithUpdateType);
                const taskPermalink = todoistApi.getTaskPermalink(selectedTask.id);
                window.open(taskPermalink, '_blank');
            }
        }
    }
}

async function createTaskFromMemo(memo, memoTable, memoGrid) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const values = {
        content: '',
        description: memo.content,
    };
    const result = await modalForm.openForm("create-task-from-memo", { values: values });

    if (result) {
        const todoistApiConfig = {
            host: "https://api.todoist.com",
            version: "rest/v2",
            token: "20fdade709c084c2e255e56e57d0e53370e8283e"
        };

        const todoist = customJS.createTodoistApiInstance();
        todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

        const memoUrl = memoTable.getMemoUrl(memo);
        const memoLink = `[${memo.name}](${memoUrl})`;
        const taskDescription = `${memoLink}\n\n${result.description.value}`;

        const taskData = {
            content: result.content.value,
            description: taskDescription,
        };

        try {
            const createdTask = await todoist.createTask(taskData);
            await memoTable.archiveMemo(memo.name);

            // Prepend the task link to the memo content
            const taskLink = todoist.getTaskPermalink(createdTask.id);
            const updatedMemoContent = `[Task Link](${taskLink})\n\n${memo.content}`;
            const updatedMemo = {
                name: memo.name,
                content: updatedMemoContent,
            };
            await memoTable.updateMemo(updatedMemo);

            // Open the memo link
            // openLink(memoUrl, memo.name);

            // Open the created task
            openLink(taskLink, createdTask.content);
        } catch (error) {
            console.error('Error creating task or archiving memo:', error);
        }
    }
}


async function openMemoEditForm(memo, memoTable) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const values = {
        content: memo.content,
    };
    const result = await modalForm.openForm("memos-form", { values: values });

    if (result) {
        const updatedMemo = {
            name: memo.name,
            content: result.content.value,
        };
        const updatedMemoResponse = await memoTable.updateMemo(updatedMemo);
        return updatedMemoResponse;
    }
    return null;
}


function hideMemo(memoId, memoCard) {
    hiddenMemos[memoId] = true;
    memoCard.style.display = 'none';

    // Update the hidden memo count
    updateHiddenMemoCount();
}

function updateHiddenMemoCount() {
    const hiddenMemoCount = Object.keys(hiddenMemos).length;
    const hiddenMemoCountElement = document.querySelector('.hidden-memo-count');
    if (hiddenMemoCountElement) {
        hiddenMemoCountElement.textContent = `Hidden Memos: ${hiddenMemoCount}`;
    } else {
        const hiddenMemoCountElement = dv.el('span', `Hidden Memos: ${hiddenMemoCount}`, { cls: 'hidden-memo-count' });
        document.body.appendChild(hiddenMemoCountElement);
    }
}


function createSortingToggleButton(memoTable, container, title, showPinnedFirst) {
    const sortingToggleButton = dv.el('button', showPinnedFirst ? '📌↑' : '⏰↑', { cls: 'memo-button sorting-toggle-button' });
    sortingToggleButton.addEventListener('click', async () => {
        showPinnedFirst = !showPinnedFirst;
        sortingToggleButton.textContent = showPinnedFirst ? '📌↑' : '⏰↑';
        const memos = await memoTable.fetchMemos();
        await renderMemoGrid(memos, container.querySelector('.memo-container'), title, memoTable, showPinnedFirst);
    });
    return sortingToggleButton;
}


// ========= Render Functions =========

// ========= Rendering Functions =========

async function renderSpecificView(mainContainer, viewType, apiConfig, title) {
    let viewsContainer = mainContainer.querySelector('.views-container');
    if (viewsContainer) {
        viewsContainer.innerHTML = '';
    } else {
        viewsContainer = dv.el('div', '', { cls: 'views-container' });
        mainContainer.appendChild(viewsContainer);
    }

    viewsContainer.appendChild(await renderView(viewType, apiConfig, title));
}

async function renderView(viewType, apiConfig, title) {
    const viewWrapper = dv.el('div', '', { cls: 'view-wrapper' });
    const container = dv.el('div', '', { cls: `view-container ${viewType}-container` });
    const loadingIndicator = dv.el('div', 'Loading...', { cls: 'loading-indicator' });
    container.appendChild(loadingIndicator);

    try {
        const memoGrid = await renderMemo(apiConfig, title, container);
        loadingIndicator.remove();
        viewWrapper.appendChild(createSearchContainer(memoGrid, apiConfig));
        viewWrapper.appendChild(memoGrid);
    } catch (error) {
        console.error(`Failed to render ${viewType}:`, error);
        loadingIndicator.textContent = 'Error loading view. Please check the console for details.';
    }

    return viewWrapper;
}

async function renderMemo(apiConfig, title, container) {
    const memoTable = customJS.createMemoInstance();
    memoTable.setApiConfig(apiConfig);
    const memos = await memoTable.fetchMemos();

    // show pinned memos by default
    const headerContainer = dv.el('div', '', { cls: 'header-container' });

    let showPinnedFirst = false; // Default sorting is by update time
    const sortingToggleButton = createSortingToggleButton(memoTable, container, title, showPinnedFirst);
    headerContainer.appendChild(sortingToggleButton);

    const filterButton = createShowOnlyTodayButton(memoTable, container, title);
    const excludeTodayFilterButton = createShowOnlyModifiedTodayButton(memoTable, container, title);
    headerContainer.appendChild(filterButton);
    headerContainer.appendChild(excludeTodayFilterButton);

    const createButton = createMemoButton(memoTable, container);
    headerContainer.appendChild(createButton);

    container.appendChild(headerContainer);

    // Create a new container for the title
    const titleContainer = dv.el('div', '', { cls: 'title-container' });
    const titleEl = dv.el('h2');
    titleEl.textContent = title;
    titleContainer.appendChild(titleEl);
    container.appendChild(titleContainer);

    const memoGrid = dv.el('div', '', { cls: 'memo-grid' });
    await renderMemoGrid(memos, memoGrid, '', memoTable, apiConfig, false, true);
    container.appendChild(memoGrid);

    return container;
}

async function renderMemoGrid(memos, memoGrid, title, memoTable, apiConfig, showPinnedFirst = false, showPinned = true, oldestFirst = false) {
    const existingTitleEl = memoGrid.querySelector('h2');
    if (!existingTitleEl) {
        const titleEl = dv.el('h2', title);
        memoGrid.appendChild(titleEl);
    }

    const existingButtons = memoGrid.querySelectorAll('.memo-button-container');
    if (existingButtons.length === 0) {
        // Add buttons if not present
        const buttonContainer = dv.el('div', '', { cls: 'button-container' });
        // Add other buttons (e.g., createMemoButton, createFilterButton, etc.)
        memoGrid.appendChild(buttonContainer);
    }

    // Clear existing memo cards
    // TODO: fix this
    // view.js:39 Uncaught (in promise) TypeError: Cannot set properties of null (setting 'innerHTML')
    // at createNewMemo (view.js:39:28)
    // at async HTMLButtonElement.eval (view.js:251:9)
    memoGrid.innerHTML = '';

    // TODO: Add a memo grid container if it doesn't exist
    // Why was I doing it this way?
    // let memoGrid = container.querySelector('.memo-grid');
    // if (memoGrid) {
    //     memoGrid.innerHTML = '';
    // } else {
    //     memoGrid = dv.el('div', '', { cls: 'memo-grid' });
    //     container.appendChild(memoGrid);
    // }

    let filteredMemos = showPinned ? memos : memos.filter(memo => !memo.pinned);
    let sortedMemos;

    if (oldestFirst) {
        sortedMemos = sortMemosByUpdateTimeAscending(filteredMemos);
    } else if (showPinnedFirst) {
        sortedMemos = sortMemosByUpdateTime(filteredMemos, true);
    } else {
        sortedMemos = sortMemosByUpdateTime(filteredMemos, false);
    }

    for (const memo of sortedMemos) {
        const memoCard = await createMemoCard(memo, memoTable, memoGrid, apiConfig);
        memoGrid.appendChild(memoCard);
    }
}

// ========= Memo Card Functions =========

/**
 * Create a memo card element.
 * @param {Object} memo - The memo object.
 * @param {Object} memoTable - The memo table instance.
 * @param {HTMLElement} memoGrid - The container element for the memo card.
 * @returns {Promise<HTMLElement>} - The created memo card element.
 */
async function createMemoCard(memo, memoTable, memoContainer, apiConfig) {
    const memoCard = dv.el('div', '', { cls: 'memo-card' });

    // Add a class for pinned memos
    if (memo.pinned) {
        memoCard.classList.add('pinned');
    }

    // Check if the memo is hidden
    if (hiddenMemos[memo.name]) {
        memoCard.style.display = 'none';
    }
    // Add the memo details without absolute positioning
    const memoDetailsHeader = dv.el('div', '', { cls: 'memo-details-header' });
    memoDetailsHeader.appendChild(createMemoDetailsElement(memo, apiConfig));
    memoCard.appendChild(memoDetailsHeader);

    const immediateActionsHeader = await createImmediateActionsHeader(memo, memoTable, memoContainer, memoCard);
    memoCard.appendChild(immediateActionsHeader);

    const contentEl = createMemoContentElement(memo);
    const cardHeader = createMemoCardHeader(memo, memoTable, memoCard);
    memoCard.appendChild(cardHeader);
    memoCard.appendChild(contentEl);
    memoCard.appendChild(dv.el('hr', '', { cls: 'memo-separator' }));

    const textActionsDropdownButton = await createTextActionsDropdownButton(memo, memoTable, memoContainer);
    cardHeader.appendChild(textActionsDropdownButton);

    const todoistDropdownButton = await createTodoistDropdownButton(memo, memoTable, memoCard);
    cardHeader.appendChild(todoistDropdownButton);

    const actionsDropdownButton = await createActionsDropdownButton(memo, memoTable, memoCard);
    cardHeader.appendChild(actionsDropdownButton);

    const gptActionsDropdownButton = await createGPTActionsDropdownButton(memo, memoTable, memoCard);
    cardHeader.appendChild(gptActionsDropdownButton);

    const openInChatGPTButton = await createOpenInChatGPTButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(openInChatGPTButton);

    return memoCard;
}

async function createImmediateActionsHeader(memo, memoTable, memoContainer, memoCard) {
    const immediateActionsHeader = dv.el('div', '', { cls: 'immediate-actions-header' });

    const newNoteButton = await createNewNoteButton(memo, memoTable, memoCard);
    immediateActionsHeader.appendChild(newNoteButton);

    const appendToDailyNoteButton = await createAppendToDailyNoteButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(appendToDailyNoteButton);

    const appendFromClipboardButton = await createAppendFromClipboardButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(appendFromClipboardButton);

    const openMemoButton = await createOpenMemoButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(openMemoButton);

    const editButton = await createEditButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(editButton);

    const bumpButton = await createBumpButton(memo, memoTable, memoContainer);
    immediateActionsHeader.appendChild(bumpButton);

    const hideButton = createHideButton(memo, memoCard);
    immediateActionsHeader.appendChild(hideButton);

    return immediateActionsHeader;
}

function createMemoCardHeader(memo, memoTable, memoCard) {
    const cardHeader = dv.el('div', '', { cls: 'memo-card-header' });
    return cardHeader;
}


function createMemoContentElement(memo) {
    const content = memo.content;
    return dv.el('p', content, { cls: 'memo-content' });
}

function createMemoDetailsElement(memo, apiConfig) {
    const detailsEl = dv.el('div', '', { cls: 'memo-details-container' });

    // TODO: fix this
    // const serverEl = dv.el('p', '', { cls: 'memo-server' });
    // serverEl.textContent = getServerName(apiConfig);
    // detailsEl.appendChild(serverEl);

    const timestampsEl = dv.el('div', '', { cls: 'memo-details' });

    const updateTimeEl = dv.el('p', '', { cls: 'memo-time' });
    updateTimeEl.textContent = `Updated: ${formatRelativeTime(memo.updateTime)}`;
    timestampsEl.appendChild(updateTimeEl);

    const createTimeEl = dv.el('p', '', { cls: 'memo-time' });
    createTimeEl.textContent = `Created: ${formatRelativeTime(memo.createTime)}`;
    timestampsEl.appendChild(createTimeEl);

    detailsEl.appendChild(timestampsEl);

    const commentCountEl = dv.el('p', '', { cls: 'memo-comment-count' });
    const commentCount = memo.relations.filter(relation => relation.type === 'COMMENT').length;
    commentCountEl.textContent = `Comments: ${commentCount}`;
    detailsEl.appendChild(commentCountEl);

    return detailsEl;
}

function getServerName(apiConfig) {
    if (apiConfig === PERSONAL_MEMOS_API_CONFIG) {
        return 'Personal';
    } else if (apiConfig === HOME_MEMOS_API_CONFIG) {
        return 'Home';
    } else if (apiConfig === SIDE_MEMOS_API_CONFIG) {
        return 'Side';
    } else if (apiConfig === WORK_MEMOS_API_CONFIG) {
        return 'Work';
    } else {
        return 'Unknown';
    }
}

async function renderAllMemosView(mainContainer) {
    const viewsContainer = mainContainer.querySelector('.views-container');
    viewsContainer.innerHTML = '';

    const allMemosContainer = dv.el('div', '', { cls: 'all-memos-container' });
    viewsContainer.appendChild(allMemosContainer);

    const memoTable = customJS.createMemoInstance();
    const apiConfigs = [PERSONAL_MEMOS_API_CONFIG, HOME_MEMOS_API_CONFIG, SIDE_MEMOS_API_CONFIG, WORK_MEMOS_API_CONFIG];
    const allMemos = [];

    for (const apiConfig of apiConfigs) {
        memoTable.setApiConfig(apiConfig);
        const memos = await memoTable.fetchMemos();
        for (const memo of memos) {
            allMemos.push({ memo, apiConfig });
        }
    }

    const sortedMemos = allMemos.sort((a, b) => new Date(b.memo.updateTime) - new Date(a.memo.updateTime));

    for (const { memo, apiConfig } of sortedMemos) {
        const memoCard = await createMemoCard(memo, memoTable, allMemosContainer, apiConfig);
        allMemosContainer.appendChild(memoCard);
    }
}

// ========= Main Execution =========

async function createOpenInChatGPTButton(memo, memoTable, memoContainer) {
    const openInChatGPTButtonContainer = dv.el('div', '', { cls: 'memo-button-container chatgpt-dropdown' });

    const dropdownButton = dv.el('button', '💬', { cls: 'memo-button dropdown-button' });
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        const isOpen = dropdownContent.classList.contains('show');

        closeDropdowns();

        if (!isOpen) {
            dropdownContent.classList.add('show');
        }
    });
    openInChatGPTButtonContainer.appendChild(dropdownButton);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });

    const openInChatGPT = async (promptInput, memoContent) => {
        const formattedContent = `"""
${promptInput}
...
${memoContent}
"""`;
        const encodedContent = encodeURIComponent(formattedContent);
        const chatGPTUrl = `https://chat.openai.com/chat?q=${encodedContent}&model=gpt-4`;
        openLink(chatGPTUrl, 'chatgpt');
    };

    const getMemoContentWithComments = async () => {
        const includeComments = await app.plugins.plugins.quickadd.api.yesNoPrompt('Include Comments', 'Do you want to include memo comments for additional context?');

        let memoContent = memo.content;
        if (includeComments) {
            const memoComments = await memoTable.fetchMemoComments(memo.name);
            const commentContent = memoComments.map(comment => comment.content).join('\n');
            memoContent += `\n\nComments:\n${commentContent}`;
        }
        return memoContent;
    };

    const customPromptButton = dv.el('button', 'Custom Prompt', { cls: 'chatgpt-prompt-button' });
    customPromptButton.addEventListener('click', async () => {
        const memoContent = await getMemoContentWithComments();
        const modalForm = app.plugins.plugins.modalforms.api;
        const values = {
            prompt: '',
        };
        const result = await modalForm.openForm("chatgpt-form", { values: values });
        if (result) {
            const promptInput = result.prompt.value;
            await openInChatGPT(promptInput, memoContent);
        }
    });
    dropdownContent.appendChild(customPromptButton);

    const predefinedPrompts = [
        {
            title: 'Summarize',
            prompt: 'Please provide a concise summary of the following memo:'
        },
        {
            title: 'Action Items',
            prompt: 'Please extract any action items or tasks from the following memo:'
        },
        // Add more predefined prompts as needed
    ];

    for (const prompt of predefinedPrompts) {
        const promptButton = dv.el('button', prompt.title, { cls: 'chatgpt-prompt-button' });
        promptButton.addEventListener('click', async () => {
            const memoContent = await getMemoContentWithComments();
            await openInChatGPT(prompt.prompt, memoContent);
        });
        dropdownContent.appendChild(promptButton);
    }

    openInChatGPTButtonContainer.appendChild(dropdownContent);

    return openInChatGPTButtonContainer;
}

async function renderMemoCard(memo, memoTable, memoCard) {
    memoCard.innerHTML = ''; // Clear the existing memo card content
    const updatedMemoCard = await createMemoCard(memo, memoTable, memoCard);
    memoCard.appendChild(updatedMemoCard);
}

function openLink(url, title) {
    if (app.isMobile) {
        window.open(url, '_blank');
    } else {
        const obsidianURI = `obsidian://opengate?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(obsidianURI, '_blank');
    }
}

async function handleGPTAction(memo, promptTitle, prompt) {
    const memoContent = memo.content;
    const promptText = `${prompt}\n\n${memoContent}`;

    const quickadd = app.plugins.plugins.quickadd.api.ai;
    // const models = quickadd.getModels();
    // console.log(models);

    // Choose a valid model name from the available models
    // const modelName = "gpt-4";
    const modelName = "gpt-3.5-turbo";
    const model = { name: modelName };

    const settings = {
        variableName: "gptOutput",
        shouldAssignVariables: true,
        modelOptions: {
            temperature: 0.6,
            max_tokens: 100,
            frequency_penalty: 0.5,
            presence_penalty: 0.5
        },
        showAssistantMessages: true,
        systemPrompt: "Please provide the answer"
    };

    const response = await app.plugins.plugins.quickadd.api.ai.prompt(promptText, model, settings);
    const gptOutput = response.gptOutput;

    // Display the GPT output in a modal
    alert(gptOutput);

    // Copy the GPT output to the clipboard
    await navigator.clipboard.writeText(gptOutput);
}


async function createGPTActionsDropdownButton(memo, memoTable, memoCard) {
    const gptActionsButtonContainer = dv.el('div', '', { cls: 'memo-button-container gpt-actions-dropdown' });

    const dropdownButton = dv.el('button', '🤖', { cls: 'memo-button dropdown-button' });
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        const isOpen = dropdownContent.classList.contains('show');

        closeDropdowns();

        if (!isOpen) {
            dropdownContent.classList.add('show');
        }
    });
    gptActionsButtonContainer.appendChild(dropdownButton);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });

    // Define your prompt categories and prompts here
    const promptCategories = [
        {
            category: 'Summarization',
            prompts: [
                {
                    title: 'Summarize Memo',
                    prompt: 'Please summarize the following memo:'
                },
                {
                    title: 'Rewrite for Clarity',
                    prompt: 'Please rewrite the following memo in a more concise and easy-to-understand manner while preserving the main points:'
                }
            ]
        },
        {
            category: 'Task Management',
            prompts: [
                {
                    title: 'Create Jira Issue',
                    prompt: 'Please create a Jira issue based on the following memo. Include a clear and concise summary, a detailed description, and any relevant details such as the issue type (e.g., bug, task, story), priority, and assignee if applicable.'
                    // Format the response as a JSON object with the following keys: "summary", "description", "issueType", "priority", "assignee".'
                }
                // TODO: create a prompt for asking what the next action is.
                // TODO: create a prompt for identifying what is actionable in the memo.
            ]
        }
    ];

    for (const category of promptCategories) {
        const categoryButton = dv.el('button', category.category, { cls: 'gpt-category-button' });
        categoryButton.addEventListener('click', async () => {
            const promptTitles = category.prompts.map(prompt => prompt.title);
            const selectedPromptTitle = await app.plugins.plugins.quickadd.api.suggester(promptTitles, promptTitles);

            if (selectedPromptTitle) {
                const selectedPrompt = category.prompts.find(prompt => prompt.title === selectedPromptTitle);
                await handleGPTAction(memo, selectedPromptTitle, selectedPrompt.prompt);
            }
        });
        dropdownContent.appendChild(categoryButton);
    }

    gptActionsButtonContainer.appendChild(dropdownContent);

    return gptActionsButtonContainer;
}

// Usage:
const mainContainer = dv.el('div', '', { cls: 'main-container' });
const globalButtonsContainer = createGlobalButtons(mainContainer);
mainContainer.appendChild(globalButtonsContainer);

const viewsContainer = dv.el('div', '', { cls: 'views-container' });
mainContainer.appendChild(viewsContainer);

// Render the work memos by default
await renderSpecificView(mainContainer, 'memoTable', WORK_MEMOS_API_CONFIG, 'Work Memos');

// TODO: should fix the way you reference the main container
// ex: consistent about grid/container/table/card etc.

// TODO: break your your functions down to be more focused so it is easy to modularize when you try it next

// TODO: decouple/adjust the way you are rendering memo cards/grid before you try to modularize again.  

// TODO: break away the memo container update from the buttons before hand

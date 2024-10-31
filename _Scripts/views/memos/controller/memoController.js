
// views/memos/controller/memoController.js

const { hiddenMemos } = require('_Scripts/views/memos/state.js');

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
    window.open(searchUrl, '_blank');
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

        } catch (error) {
            console.error('Error creating project or archiving memo:', error);
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

        const taskData = {
            content: result.content.value,
            description: result.description.value,
        };

        try {
            await todoist.createTask(taskData);
            await memoTable.archiveMemo(memo.name);

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


function hideMemo(dv, memoId, memoCard) {
    hiddenMemos[memoId] = true;
    memoCard.style.display = 'none';

    // Update the hidden memo count
    updateHiddenMemoCount(dv);
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
    openMemoCreateForm,
    handleSearch,
    searchMemos,
    suggestMemo,
    createProjectFromMemo,
    createTaskFromMemo,
    openMemoEditForm,
    hideMemo,
    updateHiddenMemoCount
};

// view.js

const { TodoistApi } = customJS;

const todoistApiConfig = {
    host: "https://api.todoist.com",
    version: "rest/v2",
    token: "20fdade709c084c2e255e56e57d0e53370e8283e"
};

const mainContainer = dv.el('div', '', { cls: 'main-container' });

async function renderTasksFromFilter(filter) {
    const todoist = customJS.createTodoistApiInstance();
    todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

    const tasks = await todoist.getFilteredTasks(filter);

    // Sort tasks by due date
    tasks.sort((a, b) => {
        if (!a.due && !b.due) return 0;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return new Date(a.due.datetime || a.due.date) - new Date(b.due.datetime || b.due.date);
    });

    const tasksContainer = dv.el('div', '', { cls: 'tasks-container' });
    mainContainer.appendChild(tasksContainer);

    const titleEl = dv.el('h2', `Tasks from filter: ${filter}`);
    tasksContainer.appendChild(titleEl);

    const taskGrid = dv.el('div', '', { cls: 'task-grid' });
    tasksContainer.appendChild(taskGrid);

    for (const task of tasks) {
        const taskCard = await createTaskCard(task, todoist);
        taskGrid.appendChild(taskCard);
    }
}

async function createTaskCard(task, todoist) {
    const taskCard = dv.el('div', '', { cls: 'task-card' });

    const taskContentHeader = dv.el('div', '', { cls: 'task-content-header' });
    taskCard.appendChild(taskContentHeader);

    const taskContent = dv.el('div', '', { cls: 'task-content' });
    taskContent.textContent = task.content;
    taskContentHeader.appendChild(taskContent);

    const completeCheckbox = dv.el('input', '', {
        type: 'checkbox',
        cls: 'complete-checkbox',
        checked: task.is_completed,
    });
    completeCheckbox.addEventListener('change', async (event) => {
        if (event.target.checked) {
            await todoist.completeTask(task.id);
        } else {
            // Handle unchecking the checkbox if needed
        }
    });

    // Set checkbox styles based on priority
    const priorityColors = {
        1: { border: '#ff0000', background: '#ff9999' },
        2: { border: '#ffff00', background: '#ffff99' },
        3: { border: '#0000ff', background: '#9999ff' },
        4: { border: '#ffffff', background: '#3b3b3b' },
    };

    const priorityColor = priorityColors[task.priority] || priorityColors[4];
    completeCheckbox.style.borderColor = priorityColor.border;
    completeCheckbox.style.backgroundColor = priorityColor.background;

    taskContentHeader.appendChild(completeCheckbox);

    const taskActionFooter = dv.el('div', '', { cls: 'task-action-footer' });
    taskCard.appendChild(taskActionFooter);

    const dueDateElement = dv.el('div', '', { cls: 'task-due-date' });
    taskActionFooter.appendChild(dueDateElement);

    if (task.due) {
        const dueDate = new Date(task.due.datetime || task.due.date);
        const now = new Date();
        const timeDiff = dueDate - now;
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

        let dueDateText = '';
        let dueDateColor = 'green';

        if (hoursDiff < -3) {
            dueDateText = `Started ${Math.abs(hoursDiff)} hours ago`;
            dueDateColor = 'red';
        } else if (hoursDiff >= -3 && hoursDiff < 0) {
            dueDateText = `Started ${Math.abs(hoursDiff)} hours ago`;
            dueDateColor = 'yellow';
        } else if (hoursDiff === 0) {
            dueDateText = 'Do now';
        } else {
            dueDateText = `Due in ${hoursDiff} hours`;
        }

        const formattedTime = dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        dueDateText += ` (${formattedTime})`;

        dueDateElement.textContent = dueDateText;
        dueDateElement.style.color = dueDateColor;
    } else {
        dueDateElement.textContent = 'No due date';
    }

    // const taskDueDate = dv.el('div', task.due ? task.due.string : 'No due date', { cls: 'task-due-date' });
    // taskActionFooter.appendChild(taskDueDate);

    const dropdownButton = dv.el('div', '', { cls: 'dropdown-button' });
    taskActionFooter.appendChild(dropdownButton);

    const dropdownButtonText = dv.el('span', 'Actions', { cls: 'dropdown-button-text' });
    dropdownButton.appendChild(dropdownButtonText);

    const dropdownContent = dv.el('div', '', { cls: 'dropdown-content' });
    dropdownButton.appendChild(dropdownContent);

    const openLinkOption = dv.el('a', 'Open Link', {
        cls: 'dropdown-option',
        href: `https://todoist.com/showTask?id=${task.id}`,
        target: '_blank',
    });
    dropdownContent.appendChild(openLinkOption);

    const snoozeOption = dv.el('a', 'Snooze', {
        cls: 'dropdown-option',
        href: '#',
    });
    snoozeOption.addEventListener('click', async (event) => {
        event.preventDefault();
        await snoozeIndividualTask(task, todoist);
    });
    dropdownContent.appendChild(snoozeOption);

    const postponeOption = dv.el('a', 'Postpone', {
        cls: 'dropdown-option',
        href: '#',
    });
    postponeOption.addEventListener('click', async (event) => {
        event.preventDefault();
        await postponeTask(task, todoist);
    });
    dropdownContent.appendChild(postponeOption);

    return taskCard;
}

function createTaskContentElement(task) {
    const content = task.content;
    return dv.el('p', content, { cls: 'task-content' });
}
async function renderButtonView() {
    // TODO: need to add the refresh data to the rest of buttons
    const buttonContainer = dv.el('div', '', { cls: 'button-container' });
    mainContainer.appendChild(buttonContainer);

    const postponeOverdueButton = dv.el('button', 'Postpone Overdue Tasks', {
        cls: 'action-button',
        onclick: async () => {
            const todoist = customJS.createTodoistApiInstance();
            todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

            const tasks = await todoist.getFilteredTasks(filter);
            await postponeOverdueTasks(tasks, todoist);
            await refreshData();
        }
    });
    buttonContainer.appendChild(postponeOverdueButton);

    const snoozeOverdueButton = dv.el('button', 'Snooze Overdue Tasks', {
        cls: 'action-button',
        onclick: async () => {
            const todoist = customJS.createTodoistApiInstance();
            todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

            const tasks = await todoist.getFilteredTasks(filter);
            const overdueTasks = tasks.filter(task => task.due && task.due.datetime && isTaskOverdue(task));
            await snoozeOverdueTasks(overdueTasks, todoist);
            await refreshData();
        }
    });
    buttonContainer.appendChild(snoozeOverdueButton);

    const postponeAllButton = dv.el('button', 'Postpone All', {
        cls: 'action-button',
        onclick: async () => {
            const todoist = customJS.createTodoistApiInstance();
            todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

            const tasks = await todoist.getFilteredTasks(filter);
            await postponeAllTasks(tasks, todoist);
            await refreshData();
        }
    });
    buttonContainer.appendChild(postponeAllButton);

    const pushSoonButton = dv.el('button', 'Push Soon Tasks', {
        cls: 'action-button',
        onclick: async () => {
            const todoist = customJS.createTodoistApiInstance();
            todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

            const tasks = await todoist.getFilteredTasks(filter);
            const soonWindow = await selectSoonWindow();
            const soonTasks = tasks.filter(task => task.due && task.due.datetime && isSoonTask(task, soonWindow));
            await pushSoonTasks(soonTasks, todoist);
            await refreshData();
        }
    });
    buttonContainer.appendChild(pushSoonButton);
}

async function postponeOverdueTasks(tasks, todoist) {
    const overdueTasks = tasks.filter(task => task.due && task.due.datetime && isTaskOverdue(task));

    for (const task of overdueTasks) {
        await postponeTask(task, todoist);
    }
}

function isTaskOverdue(task) {
    const now = new Date();
    const dueDateTime = new Date(task.due.datetime);
    return dueDateTime < now;
}

function isSoonTask(task) {
    const now = new Date();
    const dueDateTime = new Date(task.due.datetime);
    const diffInMilliseconds = dueDateTime - now;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours > 0 && diffInHours <= 4;
}


async function snoozeIndividualTask(task, todoist) {
    const snoozeOptions = [
        '30 minutes',
        '1 hour',
        '3 hours',
        '9AM Today',
        '12PM Today',
        '5PM Today',
        '9AM Tomorrow',
        '12PM Tomorrow',
        '5PM Tomorrow'
    ];

    const selectedSnoozeOption = await app.plugins.plugins.quickadd.api.suggester(snoozeOptions, snoozeOptions);

    console.log('Selected Snooze Option:', selectedSnoozeOption);

    if (selectedSnoozeOption) {
        let snoozeDuration;

        switch (selectedSnoozeOption) {
            case '30 minutes':
                snoozeDuration = 30 * 60 * 1000;
                break;
            case '1 hour':
                snoozeDuration = 60 * 60 * 1000;
                break;
            case '3 hours':
                snoozeDuration = 3 * 60 * 60 * 1000;
                break;
            case '9AM Today':
            case '12PM Today':
            case '5PM Today':
            case '9AM Tomorrow':
            case '12PM Tomorrow':
            case '5PM Tomorrow':
                const now = new Date();
                const [hours, minutes] = selectedSnoozeOption.split(' ')[0].split(':');
                const targetDate = new Date(now);
                targetDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
                if (selectedSnoozeOption.includes('Tomorrow')) {
                    targetDate.setDate(targetDate.getDate() + 1);
                }
                snoozeDuration = targetDate.getTime() - now.getTime();
                break;
            default:
                return;
        }

        await snoozeTask(task, todoist, snoozeDuration);
        console.log('Task snoozed successfully');
    }
}

async function snoozeOverdueTasks(overdueTasks, todoist) {
    const snoozeOptions = [
        '30 minutes',
        '1 hour',
        '3 hours',
    ];

    const selectedSnoozeOption = await app.plugins.plugins.quickadd.api.suggester(snoozeOptions, snoozeOptions);

    if (selectedSnoozeOption) {
        const now = new Date();
        let dueDate;

        switch (selectedSnoozeOption) {
            case '30 minutes':
                dueDate = new Date(now.getTime() + 30 * 60 * 1000);
                break;
            case '1 hour':
                dueDate = new Date(now.getTime() + 60 * 60 * 1000);
                break;
            case '3 hours':
                dueDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
                break;
            default:
                return;
        }

        for (const task of overdueTasks) {
            await snoozeTask(task, todoist, dueDate);
        }
    }
}

async function pushSoonTasks(soonTasks, todoist) {
    const pushOptions = [
        '30 minutes',
        '1 hour',
        '3 hours',
    ];

    const selectedPushOption = await app.plugins.plugins.quickadd.api.suggester(pushOptions, pushOptions);

    if (selectedPushOption) {
        let pushDuration;

        switch (selectedPushOption) {
            case '30 minutes':
                pushDuration = 30 * 60 * 1000;
                break;
            case '1 hour':
                pushDuration = 60 * 60 * 1000;
                break;
            case '3 hours':
                pushDuration = 3 * 60 * 60 * 1000;
                break;
            default:
                return;
        }

        for (const task of soonTasks) {
            const currentDueDateTime = new Date(task.due.datetime);
            const newDueDateTime = new Date(currentDueDateTime.getTime() + pushDuration);
            await todoist.updateTaskDueDate(task.id, task.due.string, newDueDateTime.toISOString());
        }
    }
}

async function snoozeTask(task, todoist, snoozeDuration) {
    try {
        const currentDueString = task.due.string;
        const currentDueDateTime = new Date(task.due.datetime);

        console.log(`Current due time: ${currentDueDateTime.toLocaleString()}`);

        if (isTaskOverdue(task)) {
            // If the task is overdue, snooze it based on the current time
            const now = new Date();
            const snoozeDateTime = new Date(now.getTime() + snoozeDuration);
            const snoozeDateTimeISO = snoozeDateTime.toISOString();
            await todoist.updateTaskDueDate(task.id, currentDueString, snoozeDateTimeISO);

            console.log(`Task overdue, snoozed to: ${snoozeDateTime.toLocaleString()}`);
            console.log(`Snooze duration: ${formatDuration(snoozeDuration)}`);
        } else {
            // If the task is not overdue, add the snooze duration to the task's current due date and time
            const snoozeDateTime = new Date(currentDueDateTime.getTime() + snoozeDuration);
            const snoozeDateTimeISO = snoozeDateTime.toISOString();
            await todoist.updateTaskDueDate(task.id, currentDueString, snoozeDateTimeISO);

            console.log(`Task not overdue, rescheduled to: ${snoozeDateTime.toLocaleString()}`);
            console.log(`Snooze duration: ${formatDuration(snoozeDuration)}`);
        }
        console.log('Task snoozed successfully');
    } catch (error) {
        console.error('Error snoozing task:', error);
    }
}

function formatDuration(duration) {
    const hours = Math.floor(duration / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));

    if (hours === 0) {
        return `${minutes} minutes`;
    } else if (minutes === 0) {
        return `${hours} hours`;
    } else {
        return `${hours} hours ${minutes} minutes`;
    }
}

async function postponeAllTasks(tasks, todoist) {
    for (const task of tasks) {
        await postponeTask(task, todoist);
    }
}

async function postponeTask(task, todoist) {
    if (task.due && task.due.string) {
        try {
            const currentDueDateTime = new Date(task.due.datetime);
            console.log(`Current due time: ${currentDueDateTime.toLocaleString()}`);

            if (isHourlyRecurringTask(task)) {
                // If the task has an hourly recurrence pattern, postpone it by adding the specified number of hours
                const dueDate = new Date(task.due.datetime);
                const hoursToAdd = getHoursFromRecurrence(task.due.string);
                dueDate.setHours(dueDate.getHours() + hoursToAdd);
                await todoist.updateTaskDueDate(task.id, task.due.string, dueDate.toISOString());

                console.log(`Task with hourly recurrence postponed to: ${dueDate.toLocaleString()}`);
                console.log(`Postpone duration: ${hoursToAdd} hours`);
            } else if (isTaskOverdue(task)) {
                // If the task is overdue, postpone it to the next occurrence
                await todoist.updateTaskDueString(task.id, task.due.string);

                console.log('Overdue task postponed to the next occurrence');
            } else {
                // If the task is not overdue, postpone it to the next day
                const dueDate = new Date(task.due.datetime);
                dueDate.setDate(dueDate.getDate() + 1);
                await todoist.updateTaskDueDate(task.id, task.due.string, dueDate.toISOString());

                console.log(`Task postponed to the next day: ${dueDate.toLocaleString()}`);
                console.log('Postpone duration: 1 day');
            }

            console.log('Task due date postponed successfully');
        } catch (error) {
            console.error('Error postponing task due date:', error);
        }
    }
}

async function selectSoonWindow() {
    const soonWindowOptions = [
        '1 hour',
        '2 hours',
        '4 hours',
        '12 hours',
    ];

    const selectedSoonWindow = await app.plugins.plugins.quickadd.api.suggester(soonWindowOptions, soonWindowOptions);

    if (selectedSoonWindow) {
        switch (selectedSoonWindow) {
            case '1 hour':
                return 1;
            case '2 hours':
                return 2;
            case '4 hours':
                return 4;
            case '12 hours':
                return 12;
            default:
                return null;
        }
    }

    return null;
}

function isHourlyRecurringTask(task) {
    return task.due && task.due.string && task.due.string.includes('every!') && task.due.string.includes('hour');
}

function getHoursFromRecurrence(recurrenceString) {
    const regex = /every! (\d+) hours/;
    const match = recurrenceString.match(regex);
    return match ? parseInt(match[1], 10) : 0;
}

async function renderRefreshButton() {
    const refreshContainer = dv.el('div', '', { cls: 'refresh-container' });
    mainContainer.insertBefore(refreshContainer, mainContainer.firstChild);

    const refreshButton = dv.el('button', 'Refresh', {
        cls: 'refresh-button',
        onclick: async () => {
            await refreshData();
        }
    });
    refreshContainer.appendChild(refreshButton);
}

async function refreshData() {
    const todoist = customJS.createTodoistApiInstance();
    todoist.setApiConfig(todoistApiConfig.host, todoistApiConfig.version, todoistApiConfig.token);

    // Clear the existing tasks container
    const tasksContainer = mainContainer.querySelector('.tasks-container');
    if (tasksContainer) {
        tasksContainer.remove();
    }

    // Re-render the tasks with the updated data
    await renderTasksFromFilter(filter);
}

// Usage:
await renderRefreshButton();
await renderButtonView();
const filter = 'today & ((#Hourly ⏱️ & recurring & !no time & today) | ((!#Hourly ⏱️ & recurring) & (!no time | (overdue | today))))';
await renderTasksFromFilter(filter);
dv.el('body').appendChild(mainContainer);

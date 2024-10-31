// TODO: rener items from the inbox project (not a filter).

/* Scheduling Enhancements */
// TODO: Postpone to next point in day ex 12pm 5pm etc based on current time
// TODO: Postpone to same time tomorrow (round hour up or down)
// TODO: Resolve parent task's due date, but only if it has the focus label
// TODO: Say how much time for each task until notable time has passed or you have to do it based on due date and times such as 12pm 5pm etc

/* Filter Management and Task Handling */

// OTHER:
// click filter text takes you to the filter.
// TODO: introduce a conclusion on some filter based on when the last comment was. perhaps on the (parents need subtask filter)
// TODO: create a set of filters to handle pulling tasks in (next_action, no due date)
// TODO: include a filter that shows the remaining subtasks/parent tasks only later today.
// Make a tomorrow/rest of day filter. So you can easily see what you already pushed to later today or tomorrow and want to pull back in.
// TODO: do filtering out of tasks that are today but more than an hour yourself.
// TODO: implment show snoozed/Later Today Tasks Area. (this would really just be another filter)
// TODO: fix making sure tasks without due date are not excluded.
// TODO: fix buttons need to display regardless of task details.
// Make all of the filters more simple here (pull in all of today)
// TODO: introduce default showing filter or not (simple)
// TODO: say on the filter next to how many tasks in in it, how many are overdue. what is the latest comment/created date (compare both) (last commented/created).
// TODO: only show if certain criteria (if task created last is within the past day, otherwise don't show)
// TODO: fix snooze buttons not collide with suggestions above it.
// TODO: fix docs not showing up. there is an error in the console.
// TODO: put current due date right above due date buttons.

// TODO: implement a "waiting for" filter. (tasks that are waiting for something else to happen)

// TODO: when postponing, consider allowing to postpone to the nearest part of the day. (12pm, 5pm, 9am, etc)
// consider creating a button that will somehow check your calendar and schedule day based on that. (find that script)
// TODO: update description button.
// TODO: add reminder button.
// TODO: add dynamic coloring to the deadline based on how close it is to the deadline.

// TODO: Prioritize these features at the top of the file

// TODO: make it so it is optional for whether or not when button is pushed that it refreshes the page.(for multiple operations)
// TODO: there should be groups, that have certain buttons in them that you can give to a filter.
// see if there is a way when refreshing a single filter if only that item is refreshed, not the whole page.

// TODO: remove the time from the filter for things like adding labels, because it is not necessary.
// Filter which serves as a labeler should not have or need a time constraint to it like the other filters

// TODO: Turn a task into a project. (if it has subtasks, then it is a project)

// TODO: If something is due toddy,  don't say it was started 20 hours ago like it does now. Say "Started today" or "Started yesterday" for example

// TODO: make a means to bring stuff that is later today, back into the now filter.

// this has a due date, but no time.

// would be awesome to have a global, ability to add something to every query like label:work. So that you can only see work things
// would require cronjob to make sure tasks in workspaces are updated with the label.
// then for every filter wide action you take, it only affects the tasks with that query appended.

// Notes

// ```mermaid
// graph LR
//     A[Incoming Task] --> B{Is it actionable?}
//     B -->|No| C[Trash/Reference/Someday]
//     B -->|Yes| D{Can it be done in <2 mins?}
//     D -->|Yes| E[Do it now]
//     D -->|No| F{Is it a project?}
//     F -->|Yes| G[Define project and next actions]
//     F -->|No| H{Does it have a deadline?}
//     H -->|Yes| I[Set Due Date and Prioritize]
//     H -->|No| J{Requires Waiting?}
//     J -->|Yes| K[Move to Waiting For]
//     J -->|No| L[Add to Next Actions]
// ```

// When do I set the deadline?
// When do I ask what action do I need to take to do this?
// When do I Determine If It's a Project? Is @focus mean it's a project?


// "What's the next action?" This question is the cornerstone of the GTD methodology.
// If the next action is clear and can be done in two minutes or less, do it immediately. (doit)
// If a task can be completed in two minutes or less, do it right away
// Decide as early as you can if (on capture ideally), if is something you can do in 2 minutes or less.

// perhaps use comments to say what the next action is.

// INBOX:
// Is it actionable?
// Can it be done in <2 mins?
// Yes: Do it now
// No: Is it a project?
// Yes: Define project and next actions
// No: Does it have a deadline?
// Yes: Set Due Date and Prioritize
// No: Requires Waiting?
// Yes: Move to Waiting For
// No: Add to Next Actions

// render last few comments at the top, nothing extensive. just a few lines.

// for @doit, don't exclude if it does not have a due date.

// color boxes that need attention based on some criteria

// suggest idea: snoozing if you are waiting on it. or consider adding a new label that indicates what you are "waitingfor"

// consider makign a filter just for @focus so that you can alway go back to project items when you are not attending to other things.
// should basically check a subtask if parent has focus. if it does, then it should be in the filter. (filter would be for all subtasks with next_action)
// would have to stop giving @focus to just everything. Be able to give focus to one off subtasks as well.
// would I need to introduce another label for this?
// perhaps the new label could be called @projectwork or @sprint

// bring back the loading indicator.

// introduce snooze all tasks button. would need a set of buttons for the whole filter.
// Say next to refresh button, when it was last updated.

// BUG: if no description is provided, then the subtask will not be created.

// support "waitingfor" label. (if you are waiting for something to happen before you can do it.)

// add a button to bring items that are later back to now.

// Add a complete parent task button. (will complete all subtasks beneath it.)

// if the item is work, continue to remind yourself to update/create/switch transition of corresponding jira.

// If I was inclined, I could combine a second filter to run everytime, fill out the rest of the "tree".
// because all I would need to know is the parent id and the subtask id.

// need to figure out how to handle due dates, with no time assigned yet. should I have a filter for them?

// Should I handle overdue the same way as in the near future? Like having a Later, but also Earlier today?

// Make alerts, for when you complete a task, or too many comments pile up. to add prompt yourself to add it to jira.

// create a button to prepen to the description (would be nice for links).

// filters that do not render, but have a button for functionality, ex: move all work tasks to 9am on Monday/Next day.
// or move all home/side tasks to 5pm today or the weekend.

// sticky css would be cool for the filter name headers.

// prompt snooze button right after you comment somehow

// can I introduce some kind of obsidian keyboard shortcut/binding to trigger the refresh?

// create new project, out of a task. (maybe first just create new project by itself and then add the task to it.)

// expand upon button clicking to copy the task to the clipboard.

// two smaller buttons, one for permalink to parent, one to child.

// if it is in the work, workspace, then check the description if there is a jira linked. if not, prompt to add one.

// need an email that uses the filter API to get every next_action and displays it to you in a specific way
// all tasks created within the past week first (since they are likely most relevant)
// what they are, and what the last thing you did on them is.

// TODO: make it so you can specify the order and which filters are enabled in the same line.

// Priority

// update hide filter logic along with updating number of tasks in filter on refresh..

// only show the first item in each filter until it is further expanded.

// introduce recurring task filter.

// introduce a filter that does not render but offers a set of buttons to do things like move all work tasks to 9am on Monday.
// ex: postpone all recurring tasks to the next day up until this point in the day.

// offer the ability to comment on top level parent task or subtask.
// and I want these individual buttons to actually render inside the respective section of the task/top level parent/project section of the task details. so that it is next to what makes sense


// introduce HIDDEN section. (for tasks that are not actionable, but you don't want to snooze them.)
// now can you introduce a "Hidden" Section that is under later that the hidden tasks will go. Also provide me with a button for each task to send it back into view

// loading indicator for when the tasks are being loaded.

// stop sending project requests 4 times for each filter.
// it seems at the beginning of my application running, I'm sending like 4 (or however many filters there are) requests to get projects.
// before a task  is even rendered mind you
// And I am not convinced we actually need to do that do we ?
// ...
// Are we able to load

// fix this error when you click a button
// filters.js:1118 Uncaught (in promise) ReferenceError: taskElement is not defined
//     at Object.click (filters.js:1118:58)

// render what section a task is in, and what it is called.

// view code scroll to left and right not squished.

// add append to existing comment

// add comment to top level task/ or project itself.

// if there is every a slack comment inside of a comment
// format it in a specific way. Preferably permalinked with a header of some sort


// extract all links out of comments and always render those though.

// glow specific comments when you click then so you can focus on what you are looking at.

// unrelated: should start displaying project comments in the emails.

// leverage h3/h4 headers inside of task details

// BUG: extra refresh button now on top of the filter?
// BUG: Task not available. (showing up at the bottom of the screen )

// Combine Todoist native filter with top level tasks and subtasks
// Now that your queries are more complex. Now that your queries are more complex

// Should be making the buttons based off of suggestion right next to those suggestions at the end

// could add reminders directly to tasks from a button (which would ideally show up on your phone then)

// is there any kind of ios app that send something to lockscreen via url scheme?
// I think just in shortcuts this is possible, lockscreen notification.

// be able to turn a "focus", next action directly into a task.

// hide focus, clear focus
// mention when you cleared it last.
// metaedit could probably store info here like when you cleared it last.

// FEAT: functionality to search through all tasks, and add a comment to them from obsidian.
// add focus directly to a task as a comment/subtask from focus bar. fuzzy search for the task by name.

// improve: when you click to update focus, fill with current focus in case you want to update it.

// Add the (<number>) back in title of filter.

// do more outside of the file in the const, so it is easier to pass things between classes.

class TodoistFilteredTasks {

  // ----------------------------------------------
  // CSS STYLES
  // ----------------------------------------------

  setupFilters() {
    TodoistFilteredTasks.filterOrder = [
      'DO_IT',
      'INBOX',
      'REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS',
      'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE',
      'NOW_SUBTASKS',
      'CATCH_NEW_SUBTASKS',
    ];
  }

  // class TodoistFilteredTasks {

  config = {
    // TODO: each endpoint should be in config here since you are using
    // multiple endpoints. And will likely use more.
    API_URL: "https://api.todoist.com/rest/v2/tasks",
    API_TOKEN: "20fdade709c084c2e255e56e57d0e53370e8283e",
    COMMENTS_URL: "https://api.todoist.com/rest/v2/comments",
  };

  // ----------------------------------------------
  // PLUGIN PROPERTIES
  // ----------------------------------------------

  get modalForm() {
    return app.plugins.plugins.modalforms.api;
  }

  get createButton() {
    return app.plugins.plugins["buttons"].createButton;
  }

  get quickaddSuggester() {
    app.plugins.plugins.quickadd.api.suggester
  }

  // ----------------------------------------------
  // GETTERS AND SETTERS
  // ----------------------------------------------
  setFilterOrder(filterOrder) {
    TodoistFilteredTasks.filterOrder = filterOrder;
  }

  setFilters(filters) {
    TodoistFilteredTasks.FILTERS = filters;
  }

  setFilterEnabled(filterKey, enabled, order, autoPopulate = true) {
    if (TodoistFilteredTasks.FILTERS[filterKey]) {
      TodoistFilteredTasks.FILTERS[filterKey].enabled = enabled;
      TodoistFilteredTasks.FILTERS[filterKey].autoPopulate = autoPopulate;
      if (order !== undefined) {
        const index = TodoistFilteredTasks.filterOrder.indexOf(filterKey);
        if (index !== -1) {
          TodoistFilteredTasks.filterOrder.splice(index, 1);
        }
        TodoistFilteredTasks.filterOrder.splice(order, 0, filterKey);
      }
    }
  }

  // ----------------------------------------------
  // INITIALIZATION AND SETUP METHODS
  // ----------------------------------------------

  constructor() {
    // this.syncAllData();
    this.setupFilters();
    // this.startFocusRefreshInterval();
    TodoistFilteredTasks.hiddenTasks = {};
  }

  startFocusRefreshInterval() {
    setInterval(async () => {
      const focusText = document.querySelector('.focus-text');
      if (focusText) {
        await this.refreshFocus(focusText);
      }
    }, 60000); // 60000 milliseconds = 1 minute
  }

  // ----------------------------------------------
  // DISPLAY TASK METHODS
  // ----------------------------------------------

  async displayAllFilteredTasks(dv) {
    const { filterOrder } = TodoistFilteredTasks;

    // Assuming dv.container is your app-container
    const contentContainer = dv.el('div');
    contentContainer.className = 'content-container';
    dv.container.appendChild(contentContainer);  // Add content container to the main app container

    const projects = await this.fetchProjects();
    const filterContainers = await this.displayFilterContainers(dv, filterOrder, projects);

    filterContainers.forEach(container => {
      contentContainer.appendChild(container);  // Append to contentContainer instead of dv.container
      container.addEventListener('click', this.handleFilteredTasksClick.bind(this));
    });

    // await this.displayFocusSection(dv);
  }

  async displayFocusSection(dv) {
    const focusSectionContainer = dv.el('div', '', { cls: 'focus-section-container' });
    if (!dv.container.querySelector('.focus-section-container')) {
      dv.container.appendChild(focusSectionContainer);
    }

    const focusTextContainer = dv.el('div', '', { cls: 'focus-text-container show' });
    const focusText = dv.el('div', '', { cls: 'focus-text' });
    focusTextContainer.appendChild(focusText);
    focusSectionContainer.appendChild(focusTextContainer);

    const focusButtonsContainer = dv.el('div', '', { cls: 'focus-buttons-container' });
    dv.container.appendChild(focusButtonsContainer);

    // Creating and adding buttons
    const updateFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Update',
        cls: 'update-focus-button',
      },
      clickOverride: {
        click: this.handleUpdateFocus.bind(this, focusText),
        params: [],
      },
    });

    const refreshFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Refresh',
        cls: 'refresh-focus-button',
      },
      clickOverride: {
        click: this.handleRefreshFocus.bind(this, focusText),
        params: [],
      },
    });

    const clearFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Clear',
        cls: 'clear-focus-button',
      },
      clickOverride: {
        click: this.handleClearFocus.bind(this, focusText),
        params: [],
      },
    });

    const toggleFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Toggle',
        cls: 'toggle-focus-button',
      },
      clickOverride: {
        click: this.handleToggleFocus.bind(this, focusTextContainer, focusSectionContainer),
        params: [],
      },
    });

    const commentOnTaskButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Comment on Task',
        cls: 'comment-on-task-button',
      },
      clickOverride: {
        click: this.handleCommentOnTask.bind(this, focusText),
        params: [],
      },
    });


    await this.refreshFocus(focusText);
  }

  async handleCommentOnTask(focusText) {
    const activeTasks = await this.getActiveTasks();
    const taskNames = activeTasks.map(task => task.content);
    const selectedTaskName = await app.plugins.plugins.quickadd.api.suggester(taskNames, taskNames);

    if (selectedTaskName) {
      const selectedTask = activeTasks.find(task => task.content === selectedTaskName);

      const defaultComment = focusText.textContent.trim();
      const defaultDescription = `Task: ${selectedTask.content}\n\nDescription: ${selectedTask.description || 'No description available.'}`;

      const values = {
        comment: defaultComment,
        description: defaultDescription,
      };

      const result = await this.modalForm.openForm("comment-form", { values: values });
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

          await this.addCommentToTask(selectedTask.id, commentWithUpdateType);
          alert(`Comment added to task: ${selectedTaskName}`);
        }
      }
    }
  }

  async getActiveTasks() {
    const filter = encodeURIComponent('!recurring');
    const url = `https://api.todoist.com/rest/v2/tasks?filter=${filter}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'GET');
    this.ensureValidResponse(response);

    const tasks = await response.json;

    // Sort tasks based on creation date and comment count
    tasks.sort((a, b) => {
      const createdAtA = new Date(a.created_at);
      const createdAtB = new Date(b.created_at);

      if (createdAtA > createdAtB) {
        return -1;
      } else if (createdAtA < createdAtB) {
        return 1;
      } else {
        return b.comment_count - a.comment_count;
      }
    });

    return tasks;
  }

  handleToggleFocus(focusTextContainer, focusSectionContainer) {
    console.log("Toggling focus text container visibility");
    focusTextContainer.classList.toggle('hide');
    focusSectionContainer.classList.toggle('hide');
  }

  async buildFocusSection(dv) {
    const focusSection = dv.el('div', '', { cls: 'focus-section' });

    const focusTextContainer = this.buildFocusTextContainer(dv);
    focusSection.appendChild(focusTextContainer);

    const focusButtonsContainer = this.buildFocusButtonsContainer(dv, focusTextContainer);
    focusSection.appendChild(focusButtonsContainer);

    return focusSection;
  }

  buildFocusTextContainer(dv) {
    const focusTextContainer = dv.el('div', '', { cls: 'focus-text-container' });
    const focusText = dv.el('div', '', { cls: 'focus-text' });
    focusTextContainer.appendChild(focusText);
    return focusTextContainer;
  }

  buildFocusButtonsContainer(dv, focusTextContainer) {
    const focusButtonsContainer = dv.el('div', '', { cls: 'focus-buttons-container' });

    const updateFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Update',
        cls: 'update-focus-button',
      },
      clickOverride: {
        click: this.handleUpdateFocus.bind(this, focusTextContainer.querySelector('.focus-text')),
        params: [],
      },
    });

    const clearFocusButton = this.createButton({
      app,
      el: focusButtonsContainer,
      args: {
        name: 'Clear',
        cls: 'clear-focus-button',
      },
      clickOverride: {
        click: this.handleClearFocus.bind(this, focusTextContainer.querySelector('.focus-text')),
        params: [],
      },
    });

    return focusButtonsContainer;
  }

  async handleUpdateFocus(focusText) {
    const result = await this.modalForm.openForm("focus-form");
    const formData = result.getData();

    if (formData && formData.focus) {
      await this.setFocus(formData.focus);
      focusText.textContent = formData.focus;
    }
  }

  async handleRefreshFocus(focusText) {
    const currentFocus = await this.getFocus();
    focusText.textContent = currentFocus;
  }

  async handleClearFocus(focusText) {
    await this.setFocus('');
    focusText.textContent = '';
  }

  async getFocus() {
    const response = await fetch(`https://ashleyhindle.com/focusanchor/api/get`, {
      method: 'GET',
      headers: {
        'X-Focus-Key': '9F8HCn2GDvXl0iWP',
      },
    });
    return await response.json();
  }

  async setFocus(focus) {
    await fetch(`https://ashleyhindle.com/focusanchor/api/set`, {
      method: 'POST',
      headers: {
        'X-Focus-Key': '9F8HCn2GDvXl0iWP',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `commitment=${encodeURIComponent(focus)}`,
    });
  }

  async refreshFocus(focusText) {
    const currentFocus = await this.getFocus();
    focusText.textContent = currentFocus;
  }

  async displayFilterContainers(dv, filterOrder, projects) {
    const filterContainers = [];

    for (const filterKey of filterOrder) {
      const filter = TodoistFilteredTasks.FILTERS[filterKey];
      if (filter && filter.enabled) {
        let filterContainer;
        if (filter.autoPopulate) {
          filterContainer = await this.displayFilteredTasks(dv, filterKey, projects);
        } else {
          filterContainer = await this.buildFilterContainer(dv, filter, filterKey, projects, 0);
        }
        filterContainers.push(filterContainer);
      }
    }

    return filterContainers;
  }

  async displayFilteredTasks(dv, filterKey, projects, filterContainer) {
    const { FILTERS } = TodoistFilteredTasks;
    const filter = FILTERS[filterKey];

    if (!filter) {
      console.error(`Filter '${filterKey}' not found.`);
      return;
    }

    try {
      const tasksWithComments = await this.getTasksAndComments(filter.query);
      const { includedTasks, excludedTasks } = await this.applyFilterSpecificLogic(filterKey, tasksWithComments);

      if (!filterContainer) {
        filterContainer = await this.buildFilterContainer(dv, filter, filterKey, projects, includedTasks.length);
        dv.container.appendChild(filterContainer);
      } else {
        // Clear the existing filter container
        while (filterContainer.firstChild) {
          filterContainer.removeChild(filterContainer.firstChild);
        }

        // Rebuild the filter container elements
        const filterHeader = this.buildFilterHeader(dv, filter, filterKey);
        filterContainer.appendChild(filterHeader);

        const filterDetails = this.buildFilterDetails(dv, filterKey, includedTasks.length);
        filterContainer.appendChild(filterDetails);
      }

      const tasksContainer = dv.el('div', '', { cls: 'tasks-container' });
      tasksContainer.style.display = filter.defaultFilterExpanded ? 'block' : 'none';
      filterContainer.appendChild(tasksContainer);

      const filterActions = await this.renderFilterActions(dv, filterKey, filterContainer, projects);
      filterContainer.insertBefore(filterActions, tasksContainer);

      await this.displayTasks(dv, tasksContainer, includedTasks, filter, filterKey, projects);

      this.displayDocumentation(dv, filterContainer, filter);
      this.displayLaterTasks(dv, filterContainer, excludedTasks);
    } catch (error) {
      this.handleFilteredTasksError(error, filterKey, dv.container);
    }

    return filterContainer;
  }


  async renderFilterActions(dv, filterKey, filterContainer, projects) {
    const filterActions = dv.el('div', '', { cls: 'filter-actions' });

    // Add default filter actions
    const snoozeAllTasksButton = this.createButton({
      app,
      el: filterActions,
      args: {
        name: '💤',
        cls: 'snooze-all-tasks-button',
      },
      clickOverride: {
        click: async () => {
          await this.snoozeAllTasksInFilter(filterKey, 60);
          const projects = await this.fetchProjects();
          await this.refreshFilteredTasks(dv, filterKey, filterContainer, projects);
        },
        params: []
      }
    });

    // Call filter-specific method to add additional filter actions
    this.renderFilterSpecificActions(dv, filterKey, filterActions, filterContainer, projects);

    return filterActions;
  }

  renderFilterSpecificActions(dv, filterKey, filterActions, filterContainer, projects) {
    switch (filterKey) {
      case 'NOW_SUBTASKS':
        // Add filter-specific actions for the NOW_SUBTASKS filter
        this.renderNowSubtasksFilterActions(dv, filterActions, filterContainer, projects);
        break;
      // Add more cases for other filters as needed
      default:
        break;
    }
  }

  renderNowSubtasksFilterActions(dv, filterActions, filterContainer, projects) {
    const postponeAllTasksButton = this.createButton({
      app,
      el: filterActions,
      args: {
        name: '⏰',
        cls: 'postpone-all-tasks-button',
      },
      clickOverride: {
        click: async () => {
          await this.postponeAllTasksInNowSubtasksFilter(filterContainer);
          const projects = await this.fetchProjects();
          await this.refreshFilteredTasks(dv, 'NOW_SUBTASKS', filterContainer, projects);
        },
        params: []
      }
    });
  }

  // TODO: why is this one not being called anymore?
  renderDefaultFilterActions(dv, filterActions, filterKey, filterContainer) {
    const snoozeAllTasksButton = this.createButton({
      app,
      el: filterActions,
      args: {
        name: '💤',
        cls: 'snooze-all-tasks-button',
      },
      clickOverride: {
        click: async () => {
          await this.snoozeAllTasksInFilter(filterKey, 60);
          await this.refreshFilteredTasks(dv, filterKey, filterContainer, projects);
        },
        params: []
      }
    });
  }


  handleFilteredTasksClick(event) {
    const taskHeader = event.target.closest('.task-header');
    const filterTitle = event.target.closest('.filter-title');
    const docsHeader = event.target.closest('.docs-header');
    const laterHeader = event.target.closest('.later-header');
    const taskInfoContainer = event.target.closest('.task-info-container');

    if (taskHeader || taskInfoContainer) {
      this.toggleTaskExpanded(event.target.closest('[data-task-id]'));
    }

    if (docsHeader) {
      this.toggleDocsExpanded(docsHeader.nextElementSibling);
    }

    if (laterHeader) {
      this.toggleLaterExpanded(laterHeader.nextElementSibling.nextElementSibling);
    }

    if (filterTitle) {
      this.toggleFilterExpanded(filterTitle.closest('.filter-container'));
    }
  }

  toggleTaskExpanded(taskContainer) {
    const taskContentContainer = taskContainer.querySelector('.task-content-container');

    // Remove the 'expanded-task' class from all tasks except the clicked task
    const expandedTasks = taskContainer.closest('.filter-container').querySelectorAll('.expanded-task');
    expandedTasks.forEach(expandedTask => {
      if (expandedTask !== taskContainer) {
        expandedTask.classList.remove('expanded-task');
        const otherTaskContentContainer = expandedTask.querySelector('.task-content-container');
        if (otherTaskContentContainer) {
          otherTaskContentContainer.style.display = 'none';
        }
      }
    });

    // Toggle the clicked task's content container
    if (taskContentContainer) {
      if (taskContentContainer.style.display === 'none') {
        taskContentContainer.style.display = 'block';
        taskContainer.classList.add('expanded-task');
      } else {
        taskContentContainer.style.display = 'none';
        taskContainer.classList.remove('expanded-task');
      }
    }
  }

  toggleDocsExpanded(docsContent) {
    docsContent.style.display = docsContent.style.display === 'none' ? 'block' : 'none';
  }

  toggleLaterExpanded(laterContent) {
    laterContent.style.display = laterContent.style.display === 'none' ? 'block' : 'none';
  }

  toggleFilterExpanded(filterContainer) {
    const tasksContainer = filterContainer.querySelector('.tasks-container');
    const docsContainer = filterContainer.querySelector('.docs-container');
    const laterContainer = filterContainer.querySelector('.later-container');

    const isExpanded = tasksContainer.style.display !== 'none';

    tasksContainer.style.display = isExpanded ? 'none' : 'block';
    docsContainer.style.display = isExpanded ? 'none' : 'block';
    laterContainer.style.display = isExpanded ? 'none' : 'block';

    // Collapse all other filters
    const allFilters = document.querySelectorAll('.filter-container');
    allFilters.forEach(otherFilterContainer => {
      if (otherFilterContainer !== filterContainer) {
        const otherTasksContainer = otherFilterContainer.querySelector('.tasks-container');
        const otherDocsContainer = otherFilterContainer.querySelector('.docs-container');
        const otherLaterContainer = otherFilterContainer.querySelector('.later-container');

        if (otherTasksContainer) {
          otherTasksContainer.style.display = 'none';
        }
        if (otherDocsContainer) {
          otherDocsContainer.style.display = 'none';
        }
        if (otherLaterContainer) {
          otherLaterContainer.style.display = 'none';
        }
      }
    });

    // Update the last touched filter
    this.updateLastTouchedFilter(filterContainer);
  }

  updateLastTouchedFilter(filterContainer) {
    const allFilters = document.querySelectorAll('.filter-container');
    allFilters.forEach(filter => {
      filter.classList.remove('last-touched-filter');
    });

    filterContainer.classList.add('last-touched-filter');
  }


  async displayTasks(dv, tasksContainer, includedTasks, filter, filterKey, projects) {
    tasksContainer.innerHTML = ''; // Clear the tasks container

    for (const { task, comments } of includedTasks) {
      await this.renderTask(dv, tasksContainer, task, comments, filter, filterKey, projects);
    }
  }

  displayDocumentation(dv, filterContainer, filter) {
    this.renderDocumentation(dv, filterContainer, filter);
  }

  displayLaterTasks(dv, filterContainer, excludedTasks) {
    this.renderLaterTasks(dv, filterContainer, excludedTasks);
  }

  handleFilteredTasksError(error, filterKey, tasksContainer) {
    console.error(`Error loading tasks for filter '${filterKey}':`, error);
    this.renderErrorMessage(tasksContainer, 'Error loading tasks. Please try again.');
  }

  // ----------------------------------------------
  // RENDERING METHODS
  // ----------------------------------------------

  async renderFilterActionHeader(dv, filterKey, projects) {
    const filterActionHeader = dv.el('div', '', { cls: 'filter-action-header' });

    const snoozeAllTasksButton = this.createButton({
      app,
      el: filterActionHeader,
      args: {
        name: '💤',
        cls: 'snooze-all-tasks-button',
      },
      clickOverride: {
        click: async () => {
          await this.snoozeAllTasksInFilter(filterKey, 60);
          await this.refreshFilteredTasks(dv, filterKey, filterActionHeader.closest('.filter-container'), projects);
        },
        params: []
      }
    });

    // Call filter-specific method to add additional filter actions
    this.renderFilterSpecificActions(dv, filterKey, filterActionHeader, projects);

    return filterActionHeader;
  }

  async renderTask(dv, container, task, comments, filter, filterKey, projects) {
    if (!task) {
      console.error('Task is undefined. Cannot render task.');
      return;
    }

    const taskElement = dv.el('div', '', { cls: 'task-container container-style', attr: { 'data-task-id': task.id } });

    const taskActionHeaderContainer = dv.el('div', '', { cls: 'task-action-header-container' });
    taskElement.appendChild(taskActionHeaderContainer);

    const taskActionHeader = await this.renderTaskActionHeader(dv, task, filterKey, taskElement);
    taskActionHeaderContainer.appendChild(taskActionHeader);

    const taskHeaderContainer = dv.el('div', '', { cls: 'task-header-container' });
    taskElement.appendChild(taskHeaderContainer);

    const taskHeader = await this.renderTaskHeader(dv, task);
    taskHeaderContainer.appendChild(taskHeader);

    const taskInfoContainer = dv.el('div', '', { cls: 'task-info-container' });
    taskElement.appendChild(taskInfoContainer);

    const taskInfo = await this.renderTaskInfo(dv, task, comments, filter, projects);
    taskInfoContainer.appendChild(taskInfo);

    const separatorLine1 = dv.el('hr', '', { cls: 'separator-line' });
    taskInfoContainer.appendChild(separatorLine1);

    const taskContentContainer = dv.el('div', '', { cls: 'task-content-container' });
    taskContentContainer.style.display = filter.defaultExpanded ? 'block' : 'none';
    taskElement.appendChild(taskContentContainer);

    const separatorLine2 = dv.el('hr', '', { cls: 'separator-line' });
    taskContentContainer.appendChild(separatorLine2);

    const taskDetails = await this.renderTaskDetails(dv, task, filter, filterKey, projects);
    taskContentContainer.appendChild(taskDetails);

    const separatorLine3 = dv.el('hr', '', { cls: 'separator-line' });
    taskContentContainer.appendChild(separatorLine3);

    const actionButtonContainer = dv.el('div', '', { cls: 'task-action-container' });
    taskContentContainer.appendChild(actionButtonContainer);

    actionButtonContainer.appendChild(dv.el('div', 'Actions:', { cls: 'section-title' }));
    actionButtonContainer.appendChild(dv.el('br'));

    await this.renderActionButtons(dv, actionButtonContainer, task, filterKey, projects);

    const separatorLine4 = dv.el('hr', '', { cls: 'separator-line' });
    taskContentContainer.appendChild(separatorLine4);

    const taskConclusions = await this.renderTaskConclusions(dv, task, comments, filterKey);
    taskContentContainer.appendChild(taskConclusions);

    const separatorLine5 = dv.el('hr', '', { cls: 'separator-line' });
    taskContentContainer.appendChild(separatorLine5);

    const taskCommentsContainer = dv.el('div', '', { cls: 'task-comments-container' });
    await this.renderTaskComments(dv, taskCommentsContainer, task);
    taskContentContainer.appendChild(taskCommentsContainer);

    const separatorLine6 = dv.el('hr', '', { cls: 'separator-line' });
    taskInfoContainer.appendChild(separatorLine6);

    container.appendChild(taskElement);
  }

  openLink(url, title) {
    if (app.isMobile) {
      window.open(url, '_blank');
    } else {
      const obsidianURI = `obsidian://opengate?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(obsidianURI, '_blank');
    }
  }

  async renderTaskActionHeader(dv, task, filterKey, taskContainer) {
    const taskActionHeader = dv.el('div', '', { cls: 'task-action-header' });

    const hideTaskButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '🔇',
        cls: 'hide-task-button',
      },
      clickOverride: {
        click: async () => {
          await this.hideTask(task.id, filterKey, taskContainer);
        },
        params: []
      }
    });

    const startSessionButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '▶️',
        cls: 'start-session-button',
      },
      clickOverride: {
        click: () => this.startSessionWithTaskData(task),
        params: []
      }
    });

    const hideOthersButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '🙈',
        cls: 'hide-others-button',
      },
      clickOverride: {
        click: async () => {
          await this.hideAllExceptTask(task.id, filterKey, taskContainer.closest('.filter-container'));
        },
        params: []
      }
    });

    const permalinkButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '🔗',
        cls: 'permalink-button',
      },
      clickOverride: {
        click: () => {
          const todoistPermalinkUrl = `https://todoist.com/showTask?id=${task.id}`;
          this.openLink(todoistPermalinkUrl, task.content);
        },
        params: []
      }
    });

    const setFocusButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '🎯',
        cls: 'set-focus-button',
      },
      clickOverride: {
        click: async () => {
          await this.setFocus(task.content);
          await this.refreshFocus(document.querySelector('.focus-text'));
        },
        params: []
      }
    });

    const commentButton = this.createButton({
      app,
      el: taskActionHeader,
      args: {
        name: '💬',
        cls: 'comment-task-button',
      },
      clickOverride: {
        click: async () => {
          await this.handleCommentTask(dv, task, filterKey, taskContainer);
        },
        params: []
      }
    });

    // Call filter-specific method to add additional task actions
    this.renderTaskSpecificActions(dv, task, filterKey, taskActionHeader);

    return taskActionHeader;
  }

  async handleUpdateFocus(focusText) {
    const result = await this.modalForm.openForm("focus-form");
    const formData = result.getData();

    if (formData && formData.focus) {
      await this.setFocus(formData.focus);
      await this.refreshFocus(focusText);
    }
  }

  async handleClearFocus(focusText) {
    await this.setFocus('');
    focusText.textContent = '';
  }

  async hideTask(taskId, filterKey, taskContainer) {
    if (!TodoistFilteredTasks.hiddenTasks[filterKey]) {
      TodoistFilteredTasks.hiddenTasks[filterKey] = new Set();
    }
    TodoistFilteredTasks.hiddenTasks[filterKey].add(taskId);
    taskContainer.style.display = 'none';

    // Update the hidden task count in the filter details
    const filterContainer = taskContainer.closest('.filter-container');
    this.updateHiddenTaskCount(filterContainer, filterKey);
  }

  async hideAllExceptTask(taskId, filterKey, filterContainer) {
    const tasksContainer = filterContainer.querySelector('.tasks-container');
    const taskElements = tasksContainer.querySelectorAll('.task-container');

    taskElements.forEach(taskElement => {
      const currentTaskId = taskElement.getAttribute('data-task-id');
      if (currentTaskId !== taskId) {
        taskElement.style.display = 'none';
        if (!TodoistFilteredTasks.hiddenTasks[filterKey]) {
          TodoistFilteredTasks.hiddenTasks[filterKey] = new Set();
        }
        TodoistFilteredTasks.hiddenTasks[filterKey].add(currentTaskId);
      }
    });

    this.updateHiddenTaskCount(filterContainer, filterKey);
  }

  updateHiddenTaskCount(filterContainer, filterKey) {
    const hiddenTaskCountElement = filterContainer.querySelector('.hidden-task-count');
    const hiddenTaskCount = TodoistFilteredTasks.hiddenTasks[filterKey]?.size || 0;
    hiddenTaskCountElement.textContent = `Hidden: ${hiddenTaskCount}`;
  }

  renderTaskSpecificActions(dv, task, filterKey, taskActionHeader) {
    switch (filterKey) {
      case 'NOW_SUBTASKS':
        // Add task-specific actions for the NOW_SUBTASKS filter
        break;
      // Add more cases for other filters as needed
      default:
        break;
    }
  }

  async renderTaskHeader(dv, task) {
    const taskHeader = dv.el('div', '', { cls: 'task-header' });
    const taskName = dv.el('div', this.formatTaskName(task.content), { cls: 'task-name' });
    taskHeader.appendChild(taskName);
    return taskHeader;
  }

  async renderTaskInfo(dv, task, comments, filter, projects) {
    const taskInfoContainer = dv.el('div', '', { cls: 'task-info-container' });

    const project = projects.find(project => project.id === task.project_id);
    const projectName = project ? project.name : 'Unknown Project';
    const projectInfoItem = dv.el('div', `Project: ${projectName}`, { cls: 'task-info-item' });
    taskInfoContainer.appendChild(projectInfoItem);

    const creationTimeItem = dv.el('div', `Created: ${this.getRelativeTime(task.created_at)}`, { cls: 'task-info-item' });
    taskInfoContainer.appendChild(creationTimeItem);

    if (task.due) {
      const dueInfoItem = dv.el('div', `${task.due.datetime ? 'Do' : 'Started'}: ${this.getRelativeTime(task.due.datetime || task.due.date)}`, { cls: 'task-info-item' });
      taskInfoContainer.appendChild(dueInfoItem);
    }

    if (filter.fetchTopLevelParentDueDate) {
      const topLevelParentDueDateItem = await this.renderTopLevelParentDueDate(dv, task);
      taskInfoContainer.appendChild(topLevelParentDueDateItem);
    }

    if (comments.length > 0) {
      const latestCommentTime = dv.el('div', `Commented: ${this.getRelativeTime(comments[comments.length - 1].posted_at)}`, { cls: 'task-info-item' });
      taskInfoContainer.appendChild(latestCommentTime);

      const latestCommentLines = comments[comments.length - 1].content.split('\n');
      let truncatedCommentText = '';
      if (latestCommentLines.length > 5) {
        truncatedCommentText = latestCommentLines.slice(0, 3).join('\n') + '\n...\n' + latestCommentLines.slice(-3).join('\n');
      } else {
        truncatedCommentText = latestCommentLines.slice(0, 4).join('\n');
      }
      const latestCommentText = dv.el('div', truncatedCommentText, { cls: 'task-info-item latest-comment-text' });
      taskInfoContainer.appendChild(latestCommentText);

      if (latestCommentLines.length > 6) {
        const moreLinesText = dv.el('div', '...\n', { cls: 'task-info-item more-lines-text' });
        taskInfoContainer.appendChild(moreLinesText);
      }
    }

    return taskInfoContainer;
  }

  async renderTopLevelParentDueDate(dv, task) {
    if (!task) {
      console.error('Task is undefined. Cannot render top-level parent due date.');
      return dv.el('div');
    }

    try {
      const topLevelParentTask = await this.fetchTopLevelParentTask(task.id);
      if (topLevelParentTask.due) {
        const topLevelParentDueDate = topLevelParentTask.due.date;
        const topLevelParentDueDateRelativeText = `Deadline: ${this.getRelativeDueDate(topLevelParentDueDate)}`;
        return dv.el('div', topLevelParentDueDateRelativeText, { cls: 'task-top-level-parent-due-date' });
      }
    } catch (error) {
      console.error('Error fetching top-level parent task:', error);
    }

    return dv.el('div');
  }

  async renderActionButtons(dv, container, task, filterKey, projects) {
    const actionButtonContainer = dv.el('div', '', { cls: 'task-action-container' });
    container.appendChild(actionButtonContainer);
    await this.renderActionButtons(dv, actionButtonContainer, task, filterKey, projects);
  }

  async renderTaskDetails(dv, task, filter, filterKey, projects) {
    const taskDetailsContainer = dv.el('div', '', { cls: 'task-details-container' });

    await this.renderActionButtons(dv, taskDetailsContainer, task, filterKey, projects);
    this.addSeparatorLine(dv, taskDetailsContainer);

    await this.renderProjectDetails(dv, taskDetailsContainer, task);
    this.addSeparatorLine(dv, taskDetailsContainer);

    await this.renderTopLevelParentDetails(dv, taskDetailsContainer, task, filter);
    this.addSeparatorLine(dv, taskDetailsContainer);

    await this.renderTaskDescriptionSection(dv, taskDetailsContainer, task);
    this.addSeparatorLine(dv, taskDetailsContainer);

    await this.renderTaskCommentsSection(dv, taskDetailsContainer, task);
    this.addSeparatorLine(dv, taskDetailsContainer);

    return taskDetailsContainer;
  }

  async renderProjectDetails(dv, container, task) {
    const project = await this.fetchProject(task.project_id);
    if (project) {
      const projectPermalink = await this.renderProjectPermalink(dv, project);
      container.appendChild(projectPermalink);

      await this.renderProjectCommentsSection(dv, container, project);
    } else {
      container.appendChild(dv.el('div', 'You should set a project for this task.', { cls: 'recommendation' }));
    }
  }

  async renderProjectCommentsSection(dv, container, project) {
    const projectComments = await this.fetchProjectComments(project.id);
    if (projectComments.length > 0) {
      container.appendChild(dv.el('div', 'Project Comments:', { cls: 'section-title' }));
      container.appendChild(dv.el('br'));
      const projectCommentsElement = await this.renderComments(dv, projectComments);
      container.appendChild(projectCommentsElement);
    } else {
      container.appendChild(dv.el('div', 'You should add project comments to provide more context.', { cls: 'recommendation' }));
    }
  }

  async renderTopLevelParentDetails(dv, container, task, filter) {
    if (filter.fetchTopLevelParentDueDate) {
      const topLevelParentTask = await this.fetchTopLevelParentTask(task.id);
      const taskPermalink = await this.renderTaskPermalink(dv, task.id);
      container.appendChild(taskPermalink);

      await this.renderTopLevelParentDescriptionSection(dv, container, topLevelParentTask);
      await this.renderTopLevelParentCommentsSection(dv, container, topLevelParentTask);
    }
  }

  async renderTopLevelParentDescriptionSection(dv, container, topLevelParentTask) {
    if (topLevelParentTask.description) {
      container.appendChild(dv.el('div', 'Top Level Parent Description:', { cls: 'section-title' }));
      container.appendChild(dv.el('br'));
      container.appendChild(dv.el('div', topLevelParentTask.description, { cls: 'task-description' }));
    } else {
      container.appendChild(dv.el('div', 'You should add a description to the top-level parent task.', { cls: 'recommendation' }));
    }
  }

  async renderTopLevelParentCommentsSection(dv, container, topLevelParentTask) {
    const topLevelParentCommentsElement = await this.renderTaskComments(dv, { id: topLevelParentTask.id });
    container.appendChild(dv.el('div', 'Top Level Parent Comments:', { cls: 'section-title' }));
    container.appendChild(dv.el('br'));
    container.appendChild(topLevelParentCommentsElement);
  }

  async renderTaskDescriptionSection(dv, container, task) {
    if (task.description) {
      container.appendChild(dv.el('div', 'Task Description:', { cls: 'section-title' }));
      container.appendChild(dv.el('br'));
      container.appendChild(dv.el('div', task.description, { cls: 'task-description' }));
    } else {
      container.appendChild(dv.el('div', 'You should add a description to this task.', { cls: 'recommendation' }));
    }
  }

  async renderTaskCommentsSection(dv, container, task) {
    const taskCommentsElement = await this.renderTaskComments(dv, task);
    container.appendChild(dv.el('div', 'Task Comments:', { cls: 'section-title' }));
    container.appendChild(dv.el('br'));
    container.appendChild(taskCommentsElement);
  }

  async renderTaskComments(dv, task) {
    if (!task || !task.id) {
      // TODO: figure out why this is rendering to the bottom of the page
      return;
    }

    const taskComments = await this.getTaskComments(task.id);
    if (taskComments.length > 0) {
      return await this.renderComments(dv, taskComments);
    } else {
      return dv.el('div', 'You should add comments to this task to track progress or provide updates.', { cls: 'recommendation' });
    }
  }

  async renderComments(dv, comments) {
    const commentsElement = dv.el('div', '', { cls: 'comments-container' });
    comments.forEach(comment => {
      const commentItem = dv.el('div', '', { cls: 'comment-item' });
      const commentTime = dv.el('div', this.getRelativeTime(comment.posted_at), { cls: 'comment-time' });
      const commentText = dv.el('div', comment.content, { cls: 'comment-text' });
      commentItem.appendChild(commentTime);
      commentItem.appendChild(commentText);
      commentsElement.appendChild(commentItem);
    });
    return commentsElement;
  }

  addSeparatorLine(dv, container) {
    const separatorLine = dv.el('hr', '', { cls: 'separator-line' });
    container.appendChild(separatorLine);
    container.appendChild(dv.el('br'));
  }

  async renderTaskConclusions(dv, task, comments, filterKey) {
    const conclusion = await this.generateConclusion(task, comments, filterKey) || "";
    if (!conclusion) return dv.el('div');

    const conclusionsContainer = dv.el('div', '', { cls: 'conclusions-container' });

    conclusionsContainer.appendChild(dv.el('div', 'Conclusions:', { cls: 'section-title' }));
    conclusionsContainer.appendChild(dv.el('br'));

    const conclusionList = dv.el('ul', '', { cls: 'conclusion-list' });

    conclusion.split('\n').forEach(item => {
      if (item.trim()) {
        const conclusionItem = dv.el('li', item, { cls: 'conclusion-item' });
        conclusionList.appendChild(conclusionItem);
      }
    });

    conclusionsContainer.appendChild(conclusionList);

    return conclusionsContainer;
  }

  renderLaterTasks(dv, filterContainer, excludedTasks) {
    const laterContent = filterContainer.querySelector('.later-content');

    if (excludedTasks.length === 0) {
      laterContent.textContent = 'No tasks for later.';
    } else {
      const taskList = dv.el('ul', '', { cls: 'later-task-list' });

      excludedTasks.forEach(({ task }) => {
        const taskItem = dv.el('li', '', { cls: 'later-task-item' });

        const taskText = dv.el('span', task.content, { cls: 'later-task-text' });
        taskItem.appendChild(taskText);

        const taskDueDate = this.renderLaterTaskDueDate(dv, task);
        taskItem.appendChild(taskDueDate);

        const taskLink = dv.el('a', ' (link)', { attr: { href: `https://todoist.com/showTask?id=${task.id}`, target: '_blank' } });
        taskItem.appendChild(taskLink);

        taskList.appendChild(taskItem);
      });

      laterContent.appendChild(taskList);
    }

    this.renderNextItemDueTime(dv, filterContainer, excludedTasks);
  }

  renderLaterTaskDueDate(dv, task) {
    if (task.due) {
      const dueDate = new Date(task.due.datetime || task.due.date);
      const relativeTime = this.getRelativeTime(dueDate);
      return dv.el('span', ` - ${relativeTime}`, { cls: 'later-task-due-date' });
    } else {
      return dv.el('span', ' - No due date', { cls: 'later-task-no-due-date' });
    }
  }

  renderNextItemDueTime(dv, filterContainer, excludedTasks) {
    const nextItemDueTimeElement = filterContainer.querySelector('.next-item-due-time');
    const nextTask = excludedTasks[0]?.task;

    if (nextTask?.due) {
      const relativeTime = this.getRelativeTime(nextTask.due.datetime || nextTask.due.date);
      nextItemDueTimeElement.textContent = `Next item in filter is due ${relativeTime} (${excludedTasks.length} items)`;
    } else {
      nextItemDueTimeElement.textContent = `${excludedTasks.length} items in filter`;
    }
  }

  async renderProjectComments(dv, comments) {
    const projectCommentsContainer = dv.el('div', '', { cls: 'project-comments-container' });

    if (comments.length > 0) {
      projectCommentsContainer.appendChild(dv.el('div', 'Project Comments:', { cls: 'section-title' }));
      projectCommentsContainer.appendChild(dv.el('br'));

      comments.forEach(comment => {
        const commentItem = dv.el('div', '', { cls: 'project-comment-item' });
        const commentTime = dv.el('div', this.getRelativeTime(comment.posted_at), { cls: 'project-comment-time' });
        const commentText = dv.el('div', comment.content, { cls: 'project-comment-text' });
        commentItem.appendChild(commentTime);
        commentItem.appendChild(commentText);
        projectCommentsContainer.appendChild(commentItem);
      });

      projectCommentsContainer.appendChild(dv.el('br'));
    }

    return projectCommentsContainer;
  }

  renderDocumentation(dv, filterContainer, filter) {
    const docsContent = filterContainer.querySelector('.docs-content');
    if (!docsContent) return;

    if (filter.documentation) {
      const documentationContainer = dv.el('div', '', { cls: 'documentation' });

      filter.documentation.split('\n').forEach(line => {
        if (line.startsWith('- ')) {
          const bulletItem = dv.el('div', line.slice(2), { cls: 'documentation-bullet' });
          documentationContainer.appendChild(bulletItem);
        } else {
          const paragraphItem = dv.el('div', line, { cls: 'documentation-paragraph' });
          documentationContainer.appendChild(paragraphItem);
        }
      });

      docsContent.appendChild(documentationContainer);
    } else {
      docsContent.textContent = '';
    }
  }

  // ----------------------------------------------
  // UI CREATION METHODS
  // ----------------------------------------------

  async buildFilterContainer(dv, filter, filterKey, projects, taskCount) {
    const filterContainer = dv.el('div', '', { cls: 'filter-container' });
    filterContainer.setAttribute('data-filter-key', filterKey);

    const filterHeader = this.buildFilterHeader(dv, filter, filterKey);
    filterContainer.appendChild(filterHeader);

    const filterDetails = this.buildFilterDetails(dv, filterKey, taskCount);
    filterContainer.appendChild(filterDetails);

    const docsContainer = this.buildDocsContainer(dv);
    filterContainer.appendChild(docsContainer);

    const laterContainer = this.buildLaterContainer(dv);
    filterContainer.appendChild(laterContainer);

    return filterContainer;
  }

  buildFilterDetails(dv, filterKey, taskCount) {
    const filterDetails = dv.el('div', '', { cls: 'filter-details' });

    const taskCountElement = dv.el('span', `Tasks: ${taskCount}`, { cls: 'task-count' });
    filterDetails.appendChild(taskCountElement);

    const lastRefreshTimeElement = dv.el('span', '', { cls: 'last-refresh-time' });
    filterDetails.appendChild(lastRefreshTimeElement);

    TodoistFilteredTasks.FILTERS[filterKey].lastRefreshTime = new Date();
    this.updateLastRefreshTime(lastRefreshTimeElement, filterKey);

    const hiddenTaskCount = TodoistFilteredTasks.hiddenTasks[filterKey]?.size || 0;
    const hiddenTaskCountElement = dv.el('span', `Hidden: ${hiddenTaskCount}`, { cls: 'hidden-task-count' });
    filterDetails.appendChild(hiddenTaskCountElement);

    return filterDetails;
  }

  buildFilterHeader(dv, filter, filterKey) {
    const filterHeader = dv.el('div', '', { cls: 'filter-header' });

    // Update the filter title to include the task count
    const filterTitle = dv.el('h2', `${filter.title}`, { cls: 'filter-title' });
    filterHeader.appendChild(filterTitle);

    const refreshButton = this.createClickableButton(dv, { name: 'Refresh', cls: 'refresh-button' }, async () => {
      TodoistFilteredTasks.hiddenTasks[filterKey] = new Set();
      const projects = await this.fetchProjects();
      await this.refreshFilteredTasks(dv, filterKey, filterHeader.closest('.filter-container'), projects);
    });

    const refreshVisibleButton = this.createClickableButton(dv, { name: 'Visible', cls: 'refresh-visible-button' }, async () => {
      const projects = await this.fetchProjects();
      await this.refreshVisibleTasks(dv, filterKey, filterHeader.closest('.filter-container'), projects);
    });

    filterHeader.appendChild(refreshVisibleButton);
    filterHeader.appendChild(refreshButton);

    return filterHeader;
  }


  buildLaterContainer(dv) {
    const laterContainer = dv.el('div', '', { cls: 'later-container' });
    const laterHeader = dv.el('div', 'Later', { cls: 'later-header' });
    const nextItemDueTime = dv.el('div', '', { cls: 'next-item-due-time' });
    const laterContent = dv.el('div', '', { cls: 'later-content' });

    laterContainer.appendChild(laterHeader);
    laterContainer.appendChild(nextItemDueTime);
    laterContainer.appendChild(laterContent);

    // Hide the later content by default
    laterContent.style.display = 'none';

    return laterContainer;
  }

  buildDocsContainer(dv) {
    const docsContainer = dv.el('div', '', { cls: 'docs-container' });
    const docsHeader = dv.el('div', 'Docs', { cls: 'docs-header' });
    const docsContent = dv.el('div', '', { cls: 'docs-content' });

    docsContainer.appendChild(docsHeader);
    docsContainer.appendChild(docsContent);

    // Hide the documentation content by default
    docsContent.style.display = 'none';

    return docsContainer;
  }


  // ----------------------------------------------
  // SYNC AND DATA FETCHING METHODS
  // ----------------------------------------------

  async syncAllData() {
    // TODO: get this from config
    const url = 'https://api.todoist.com/sync/v9/sync';
    const headers = {
      ...this.getAuthenticationHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = new URLSearchParams();
    data.append('sync_token', '*');
    data.append('resource_types', JSON.stringify(['all']));

    try {
      const response = await this.sendRequest(url, headers, 'POST', data.toString());
      this.ensureValidResponse(response);
      // TODO: why is this being called more than once when you click the filter?
      console.log('Full sync completed successfully.');
    } catch (error) {
      console.error('Error performing full sync:', error);
    }
  }

  async refreshTasksInAllFilters(dv) {
    const { FILTERS } = TodoistFilteredTasks;
    const filterKeys = Object.keys(FILTERS);

    const projects = await this.fetchProjects();

    for (const filterKey of filterKeys) {
      const filterContainer = dv.container.querySelector(`[data-filter-key="${filterKey}"]`);
      const taskCount = await this.refreshFilteredTasks(dv, filterKey, filterContainer, projects);

      // Update the filter title with the new task count
      const filterTitle = filterContainer.querySelector('.filter-title');
      if (filterTitle) {
        const filter = FILTERS[filterKey];
        filterTitle.textContent = `${filter.title} (${taskCount})`;
      }
    }
  }

  async refreshVisibleTasks(dv, filterKey, filterContainer, projects) {
    const filter = TodoistFilteredTasks.FILTERS[filterKey];
    if (!filter) {
      console.error(`Filter '${filterKey}' not found.`);
      return;
    }

    const tasksContainer = filterContainer.querySelector('.tasks-container');
    tasksContainer.innerHTML = ''; // Clear the tasks container

    const tasksWithComments = await this.getTasksAndComments(filter.query);
    const { includedTasks, excludedTasks } = await this.applyFilterSpecificLogic(filterKey, tasksWithComments);

    for (const { task, comments } of includedTasks) {
      if (!TodoistFilteredTasks.hiddenTasks[filterKey]?.has(task.id)) {
        await this.renderTask(dv, tasksContainer, task, comments, filter, filterKey, projects);
      }
    }

    this.displayLaterTasks(dv, filterContainer, excludedTasks);
  }

  async refreshFilteredTasks(dv, filterKey, filterContainer, projects) {
    const filter = TodoistFilteredTasks.FILTERS[filterKey];
    if (!filter) {
      console.error(`Filter '${filterKey}' not found.`);
      return;
    }

    TodoistFilteredTasks.hiddenTasks[filterKey] = new Set();

    // Create a new filter container
    const newFilterContainer = await this.buildFilterContainer(dv, filter, filterKey, projects, 0);

    // Get the task count for the filter
    const tasksWithComments = await this.getTasksAndComments(filter.query);
    const { includedTasks, excludedTasks } = await this.applyFilterSpecificLogic(filterKey, tasksWithComments);
    const taskCount = includedTasks.length;

    // Update the task count in the new filter container
    const filterDetails = newFilterContainer.querySelector('.filter-details');
    const taskCountElement = filterDetails.querySelector('.task-count');
    taskCountElement.textContent = `Tasks: ${taskCount}`;

    // Update the last refresh time in the new filter container
    const lastRefreshTimeElement = filterDetails.querySelector('.last-refresh-time');
    TodoistFilteredTasks.FILTERS[filterKey].lastRefreshTime = new Date();
    this.updateLastRefreshTime(lastRefreshTimeElement, filterKey);

    // Create a new tasks container and append it to the new filter container
    const tasksContainer = dv.el('div', '', { cls: 'tasks-container' });
    tasksContainer.style.display = filter.defaultFilterExpanded ? 'block' : 'none';
    newFilterContainer.appendChild(tasksContainer);

    // Display the tasks in the new filter container
    await this.displayTasks(dv, tasksContainer, includedTasks, filter, filterKey, projects);

    // Replace the existing filter container with the new one
    filterContainer.parentNode.replaceChild(newFilterContainer, filterContainer);

    // Attach event listener to the new filter container
    newFilterContainer.addEventListener('click', this.handleFilteredTasksClick.bind(this));
  }

  // ----------------------------------------------
  // API REQUEST METHODS
  // ----------------------------------------------

  async getFilteredTasks(filter) {
    const encodedFilter = encodeURIComponent(filter);
    const url = `${this.config.API_URL}?filter=${encodedFilter}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'GET');
    this.ensureValidResponse(response);

    return response.json;
  }

  async getTaskComments(taskId) {
    const url = `${this.config.COMMENTS_URL}?task_id=${taskId}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers);
    this.ensureValidResponse(response);

    return response.json;
  }

  async getTasksAndComments(filter) {
    const filteredTasks = await this.getFilteredTasks(filter);
    const tasksWithComments = await Promise.all(
      filteredTasks.map(async (task) => {
        const comments = await this.getTaskComments(task.id);
        return { task, comments };
      })
    );
    return tasksWithComments;
  }

  async fetchProjects() {
    const url = 'https://api.todoist.com/rest/v2/projects';
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'GET');
    this.ensureValidResponse(response);

    return response.json;
  }

  async fetchProject(projectId) {
    if (!projectId) {
      console.warn('Project ID is undefined. Skipping project fetch.');
      return null;
    }

    const url = `https://api.todoist.com/rest/v2/projects/${projectId}`;
    const headers = this.getAuthenticationHeaders();

    try {
      const response = await this.sendRequest(url, headers, 'GET');
      this.ensureValidResponse(response);
      return response.json;
    } catch (error) {
      console.error(`Error fetching project with ID ${projectId}:`, error);
      return null;
    }
  }

  async fetchProjectComments(projectId) {
    const url = `https://api.todoist.com/rest/v2/comments?project_id=${projectId}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'GET');
    this.ensureValidResponse(response);

    return response.json;
  }

  async fetchSections(projectId) {
    const url = `https://api.todoist.com/rest/v2/sections?project_id=${projectId}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'GET');
    this.ensureValidResponse(response);

    return response.json;
  }

  async sendRequest(url, headers, method, body) {
    console.log(`Sending request to ${url} with method ${method} and body ${JSON.stringify(body)}`);

    return await requestUrl({
      url: url,
      headers: headers,
      method: method,
      body: body
    });
  }

  getAuthenticationHeaders() {
    return {
      "Authorization": `Bearer ${this.config.API_TOKEN}`
    };
  }

  ensureValidResponse(response, expectedStatus = 200) {
    if (response.status !== expectedStatus) {
      throw new Error(`Request failed, status ${response.status}`);
    }
  }

  // ----------------------------------------------
  // URL SCHEME METHODS
  // ----------------------------------------------

  async startSessionWithTaskData(task) {
    const intent = encodeURIComponent(task.content);
    const notes = encodeURIComponent(await this.getTaskNotesForSession(task));

    const urlScheme = `session:///start?intent=${intent}&notes=${notes}`;
    window.open(urlScheme, '_blank');
  }

  async getTaskNotesForSession(task) {
    let notes = '';

    if (task.description) {
      notes += task.description + '\n\n';
    }

    const comments = await this.getTaskComments(task.id);
    comments.sort((a, b) => new Date(a.posted_at) - new Date(b.posted_at));

    comments.forEach(comment => {
      notes += `[${this.formatDateTime(comment.posted_at)}] ${comment.content}\n`;
    });

    return notes.trim();
  }

  // ----------------------------------------------
  // TASK UPDATE AND MANIPULATION METHODS
  // ----------------------------------------------

  async postponeAllTasksInNowSubtasksFilter(filterContainer) {
    const tasksContainer = filterContainer.querySelector('.tasks-container');
    const includedTasks = tasksContainer.querySelectorAll('[data-task-id]');

    const laterContent = filterContainer.querySelector('.later-content');
    const excludedTasks = laterContent.querySelectorAll('.later-task-item');

    const allTasks = [...includedTasks, ...excludedTasks];

    for (const taskElement of allTasks) {
      const taskId = taskElement.getAttribute('data-task-id');
      if (taskId) {
        await this.updateTaskDueDateTimeTomorrow9AM(taskId);
      }
    }
  }

  async updateTaskDueDateTimeTomorrow9AM(taskId) {
    const tomorrow9AM = new Date();
    tomorrow9AM.setDate(tomorrow9AM.getDate() + 1);
    tomorrow9AM.setHours(9, 0, 0, 0);
    const dueDateTime = tomorrow9AM.toISOString();
    await this.updateTaskDueDate(taskId, dueDateTime);
  }

  // TODO: move this url to the config
  async moveTaskToProjectAndSection(taskId, projectId, sectionId = null) {
    const url = 'https://api.todoist.com/sync/v9/sync';
    const headers = {
      ...this.getAuthenticationHeaders(),
      'Content-Type': 'application/json'
    };

    const data = {
      commands: [
        {
          type: 'item_move',
          args: { id: taskId, project_id: projectId },
          uuid: this.generateUUID()
        }
      ]
    };

    const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
    this.ensureValidResponse(response);

    return response.status === 200;
  }

  async setDueDateTime(taskId, daysFromNow, hours) {
    const now = new Date();
    const dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysFromNow, hours, 0, 0);
    const dueDateTime = dueDate.toISOString();
    await this.updateTaskDueDate(taskId, dueDateTime);
  }


  async updateTaskDueDate(taskId, dueDate) {
    const url = 'https://api.todoist.com/sync/v10/sync';
    const headers = {
      ...this.getAuthenticationHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    let dueObject;

    if (typeof dueDate === 'number') {
      // If dueDate is a number, calculate the due date as minutes from now.
      const futureTime = new Date(new Date().getTime() + dueDate * 60 * 1000);
      dueObject = { date: futureTime.toISOString() };
    } else if (typeof dueDate === 'string') {
      // If dueDate is a string, assume it's a human-readable due date string.
      dueObject = { string: dueDate };
    } else {
      throw new Error('dueDate must be a number of minutes or a human-readable due date string');
    }

    const data = {
      commands: JSON.stringify([
        {
          type: 'item_update',
          uuid: this.generateUUID(),
          args: {
            id: taskId,
            due: dueObject
          }
        }
      ])
    };

    const response = await this.sendRequest(url, headers, 'POST', new URLSearchParams(data).toString());
    this.ensureValidResponse(response);

    return response.json;
  }


  async clearTaskDueDate(taskId) {
    const url = 'https://api.todoist.com/sync/v10/sync';
    const headers = {
      ...this.getAuthenticationHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
      commands: JSON.stringify([
        {
          type: 'item_update',
          uuid: this.generateUUID(),
          args: {
            id: taskId,
            due: null
          }
        }
      ])
    };

    const response = await this.sendRequest(url, headers, 'POST', new URLSearchParams(data).toString());
    this.ensureValidResponse(response);

    return response.json;
  }

  async updateTaskLabels(taskId, labelsToAdd) {
    const url = `${this.config.API_URL}/${taskId}`;
    const headers = {
      ...this.getAuthenticationHeaders(),
      "Content-Type": "application/json",
      "X-Request-Id": this.generateUUID()
    };

    const taskResponse = await this.sendRequest(`${this.config.API_URL}/${taskId}`, headers, 'GET');
    this.ensureValidResponse(taskResponse);
    const task = await taskResponse.json;

    const currentLabels = task.labels;
    const updatedLabels = [...new Set([...currentLabels, ...labelsToAdd])];

    const data = JSON.stringify({
      labels: updatedLabels
    });

    const response = await this.sendRequest(url, headers, 'POST', data);
    this.ensureValidResponse(response);

    return response.json;
  }

  async addCommentToTask(taskId, commentContent) {
    const url = this.config.COMMENTS_URL;
    const headers = {
      ...this.getAuthenticationHeaders(),
      "Content-Type": "application/json",
      "X-Request-Id": this.generateUUID()
    };
    const data = {
      task_id: taskId,
      content: commentContent
    };

    const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
    this.ensureValidResponse(response);

    return response.json;
  }

  async addCommentToTopLevelTask(task) {
    const topLevelParentTask = await this.fetchTopLevelParentTask(task.id);
    if (topLevelParentTask) {
      const result = await this.modalForm.openForm("comment-form");
      const formData = result.getData();

      if (formData && formData.comment) {
        await this.addCommentToTask(topLevelParentTask.id, formData.comment);
      }
    } else {
      console.log('The current task is already the top-level task.');
    }
  }

  async addCommentToProject(task) {
    const project = await this.fetchProject(task.project_id);
    if (project) {
      const result = await this.modalForm.openForm("comment-form");
      const formData = result.getData();

      if (formData && formData.comment) {
        await this.addCommentToProjectAPI(project.id, formData.comment);
      }
    } else {
      console.log('The task does not have a project assigned.');
    }
  }

  async addCommentToProjectAPI(projectId, commentContent) {
    const url = this.config.COMMENTS_URL;
    const headers = {
      ...this.getAuthenticationHeaders(),
      "Content-Type": "application/json",
      "X-Request-Id": this.generateUUID()
    };
    const data = {
      project_id: projectId,
      content: commentContent
    };

    const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
    this.ensureValidResponse(response);

    return response.json;
  }

  async addSubtaskToTask(taskId, subtaskName, subtaskDescription, doNow) {
    const url = this.config.API_URL;
    const headers = {
      ...this.getAuthenticationHeaders(),
      "Content-Type": "application/json",
      "X-Request-Id": this.generateUUID()
    };
    const comments = await this.getTaskComments(taskId);

    const latestComment = comments.length > 0 ? comments[comments.length - 1].content : null;

    let finalSubtaskDescription = subtaskDescription || "";

    if (latestComment) {
      if (subtaskDescription) {
        finalSubtaskDescription += "\n\n---\n\n" + latestComment;
      } else {
        finalSubtaskDescription = latestComment;
      }
    }

    const data = {
      parent_id: taskId,
      content: subtaskName,
      description: finalSubtaskDescription,
      due_string: doNow ? "today" : null
    };

    const response = await this.sendRequest(url, headers, 'POST', JSON.stringify(data));
    this.ensureValidResponse(response);

    return response.json;
  }

  async completeTask(taskId) {
    const url = `${this.config.API_URL}/${taskId}/close`;
    const headers = {
      ...this.getAuthenticationHeaders(),
      "X-Request-Id": this.generateUUID()
    };

    const response = await this.sendRequest(url, headers, 'POST');
    this.ensureValidResponse(response, 204);
  }

  async deleteTask(taskId) {
    const url = `${this.config.API_URL}/${taskId}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers, 'DELETE');
    this.ensureValidResponse(response, 204);
  }

  async addFollowUpCommentToTask(taskId) {
    const commentContent = 'Follow up on this task';
    await this.addCommentToTask(taskId, commentContent);
  }

  async fetchTopLevelParentTask(taskId) {
    // TODO: consider just passing the whole parent task object around with everything else?
    const url = `${this.config.API_URL}/${taskId}`;
    const headers = this.getAuthenticationHeaders();

    const response = await this.sendRequest(url, headers);
    this.ensureValidResponse(response);

    const task = await response.json;

    if (task.parent_id) {
      return this.fetchTopLevelParentTask(task.parent_id);
    }

    return task;
  }

  async snoozeAllTasksInFilter(filterKey, snoozeMinutes) {
    const filter = TodoistFilteredTasks.FILTERS[filterKey];
    const tasksWithComments = await this.getTasksAndComments(filter.query);
    const { includedTasks } = await this.applyFilterSpecificLogic(filterKey, tasksWithComments);

    for (const { task } of includedTasks) {
      await this.updateTaskDueDate(task.id, snoozeMinutes);
    }
  }

  async snoozeOtherTasksInFilter(taskId, filterKey, snoozeMinutes) {
    const filter = TodoistFilteredTasks.FILTERS[filterKey];
    const includeTasksWithinMinutes = filter.includeTasksWithinMinutes || 60; // Default to 60 if not set

    const tasksWithComments = await this.getTasksAndComments(filter.query);
    const currentTime = new Date();

    const tasksToSnooze = tasksWithComments.filter(({ task }) => {
      if (task.id === taskId) {
        return false; // Exclude the current task
      }

      if (task.due) {
        const dueDate = new Date(task.due.datetime || task.due.date);
        const timeDiff = dueDate.getTime() - currentTime.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        return minutesDiff <= includeTasksWithinMinutes;
      }

      return false;
    });

    for (const { task } of tasksToSnooze) {
      await this.updateTaskDueDate(task.id, snoozeMinutes);
    }

    await this.updateTaskDueDate(taskId, 0);
  }

  async copyTaskDetailsToClipboard(task) {
    const comments = await this.getTaskComments(task.id);

    // Sort comments in chronological order
    comments.sort((a, b) => new Date(a.posted_at) - new Date(b.posted_at));

    let taskDetails = `Title: ${task.content}\n\n`;

    if (task.description) {
      taskDetails += `Description:\n${task.description}\n\n`;
    }

    if (comments.length > 0) {
      taskDetails += 'Comments:\n';
      for (const comment of comments) {
        const relativeTime = this.getRelativeTime(comment.posted_at);
        taskDetails += `[${relativeTime}] ${comment.content}\n`;
      }
    }

    await navigator.clipboard.writeText(taskDetails);

    // alert('Task details copied to clipboard!');
  }

  // ----------------------------------------------
  // BUTTON ACTION HANDLING METHODS
  // ----------------------------------------------

  async handleAddSubtask(dv, task, filterKey, actionButtonContainer) {
    const modalForm = app.plugins.plugins.modalforms.api;
    const result = await this.modalForm.openForm("subtask-form");
    const formData = result.getData();

    if (formData && formData.subtaskName) {
      const doNow = formData.doNow === "true";
      await this.addSubtaskToTask(task.id, formData.subtaskName, formData.subtaskDescription || "", doNow);
      // await this.refreshFilteredTasks(dv, filterKey, filterContainer, projects);
    }
  }

  async handleCommentTask(dv, task, filterKey, taskContainer) {
    const result = await this.modalForm.openForm("comment-form");
    const formData = result.getData();

    if (formData && formData.comment) {
      await this.addCommentToTask(task.id, formData.comment);
      // const projects = await this.fetchProjects();
      // await this.refreshFilteredTasks(dv, filterKey, taskContainer.closest('.filter-container'), projects);
    }
  }

  async handleAddComment(dv, task, filterKey, actionButtonContainer) {
    const result = await this.modalForm.openForm("comment-form");
    const formData = result.getData();

    if (formData && formData.comment) {
      await this.addCommentToTask(task.id, formData.comment);
      // await this.refreshFilteredTasks(dv, filterKey, filterContainer, projects);
    }
  }

  createPermalinkButton(task) {
    const taskPermalink = `https://todoist.com/showTask?id=${task.id}`;
    return `<a href="${taskPermalink}" target="_blank" class="permalink-button">Permalink</a>`;
  }

  async renderProjectPermalink(dv, task) {
    const project = await this.fetchProject(task.project_id);
    if (project) {
      const projectPermalink = `https://todoist.com/app/project/${project.id}`;
      const projectPermalinkElement = dv.el('a', `Project: ${project.name}`, { attr: { href: projectPermalink, target: '_blank' }, cls: 'project-permalink' });
      return projectPermalinkElement;
    }
    return dv.el('div');
  }

  async renderTaskPermalink(dv, task) {
    const taskPermalink = `https://todoist.com/showTask?id=${task.id}`;
    const taskPermalinkElement = dv.el('a', 'Permalink', { attr: { href: taskPermalink, target: '_blank' }, cls: 'task-permalink' });
    return taskPermalinkElement;
  }

  createSyncButton(dv) {
    const syncButton = this.createClickableButton(dv, { name: 'Sync', cls: 'sync-button' }, async () => {
      await this.syncAllData();
    });
    return syncButton;
  }

  createRefreshFiltersButton(dv) {
    const refreshFiltersButton = this.createClickableButton(dv, { name: 'Refresh All Filters', cls: 'refresh-filters-button' }, async () => {
      await this.refreshTasksInAllFilters(dv);
    });
    return refreshFiltersButton;
  }

  createClickableButton(dv, buttonConfig, clickHandler) {
    return this.createButton({
      app,
      el: dv.container,
      args: buttonConfig,
      clickOverride: {
        click: clickHandler,
        params: []
      }
    });
  }

  hasValidEnding(projectName) {
    const validEndings = ['---', '=--', '-=-', '--=', '==-', '=-=', '-==', '==='];
    return validEndings.some(ending => projectName.endsWith(ending));
  }

  async handleProjectSelection(taskId) {
    const projects = await this.fetchProjects();
    const filteredProjects = projects.filter(project => this.hasValidEnding(project.name));
    const projectNames = filteredProjects.map(project => project.name);
    const selectedProjectName = await app.plugins.plugins.quickadd.api.suggester(projectNames, projectNames);

    if (!selectedProjectName) {
      console.log('No project selected');
      return;
    }

    const selectedProject = filteredProjects.find(project => project.name === selectedProjectName);
    if (!selectedProject) {
      console.log('Selected project not found');
      return;
    }

    await this.handleSectionSelection(taskId, selectedProject);
  }

  async handleSectionSelection(taskId, selectedProject) {
    const sections = await this.fetchSections(selectedProject.id);
    const sectionNames = ['No Section', ...sections.map(section => section.name)];
    const selectedSectionName = await app.plugins.plugins.quickadd.api.suggester(sectionNames, sectionNames);

    if (!selectedSectionName) {
      console.log('No section selected');
      return;
    }

    if (selectedSectionName === 'No Section') {
      await this.moveTaskToProjectAndSection(taskId, selectedProject.id);
      alert(`Task moved to project: ${selectedProject.name}`);
    } else {
      const selectedSection = sections.find(section => section.name === selectedSectionName);
      await this.moveTaskToProjectAndSection(taskId, selectedProject.id, selectedSection.id);
      alert(`Task moved to project: ${selectedProject.name}, section: ${selectedSectionName}`);
    }
  }

  async handleLabelSelection(taskId) {
    const availableLabels = ['doit', 'focus', 'waiting', 'next_action', 'someday'];
    const selectedLabels = await app.plugins.plugins.quickadd.api.checkboxPrompt(availableLabels, []);

    if (selectedLabels.length === 0) {
      console.log('No labels selected');
      return;
    }

    await this.updateTaskLabels(taskId, selectedLabels);
    alert(`Labels added to the task: ${selectedLabels.join(', ')}`);
  }

  // ----------------------------------------------
  // BUTTON SPECIFIC RENDERING METHODS
  // ----------------------------------------------

  async renderButton(dv, actionButtonContainer, config, filterKey, projects) {
    const button = dv.el('button', config.name, { cls: 'task-action-button' });
    button.addEventListener('click', async () => {
      await config.action();
      if (config.refreshAfterClick) {
        await this.refreshFilteredTasks(dv, filterKey, actionButtonContainer.closest('.filter-container'), projects);
      }
    });
    actionButtonContainer.appendChild(button);
  }

  async renderDropdown(dv, actionButtonContainer, config, filterKey, projects) {
    const dropdownContainer = dv.el('div', '', { cls: 'task-action-dropdown-container' });
    const dropdownToggle = dv.el('button', config.name, { cls: 'task-action-dropdown-toggle' });
    dropdownContainer.appendChild(dropdownToggle);

    const dropdownItemsContainer = dv.el('div', '', { cls: 'task-action-dropdown-items' });
    dropdownContainer.appendChild(dropdownItemsContainer);

    config.actions.forEach(actionConfig => {
      const item = dv.el('button', actionConfig.name, { cls: 'task-action-dropdown-item' });
      item.addEventListener('click', async () => {
        await actionConfig.action();
        if (config.refreshAfterClick) {
          await this.refreshFilteredTasks(dv, filterKey, actionButtonContainer.closest('.filter-container'), projects);
        }
        dropdownItemsContainer.classList.remove('show');
      });
      dropdownItemsContainer.appendChild(item);
    });

    dropdownToggle.addEventListener('click', () => {
      dropdownItemsContainer.classList.toggle('show');
    });

    actionButtonContainer.appendChild(dropdownContainer);
  }

  async renderActionButtons(dv, actionButtonContainer, task, filterKey, projects) {
    const { globalButtonConfigs, filterSpecificButtonConfigs } = this.getButtonConfigs(task, filterKey, dv, actionButtonContainer);

    actionButtonContainer.innerHTML = '';

    const globalButtonsContainer = dv.el('div', '', { cls: 'global-buttons-container' });
    actionButtonContainer.appendChild(globalButtonsContainer);

    for (const config of globalButtonConfigs) {
      if (config.type === 'button') {
        await this.renderButton(dv, globalButtonsContainer, config, filterKey);
      } else if (config.type === 'dropdown') {
        await this.renderDropdown(dv, globalButtonsContainer, config, filterKey);
      }
    }

    if (filterSpecificButtonConfigs.length > 0) {
      const separator = dv.el('div', '', { cls: 'button-separator' });
      actionButtonContainer.appendChild(separator);

      const filterSpecificButtonsContainer = dv.el('div', '', { cls: 'filter-specific-buttons-container' });
      actionButtonContainer.appendChild(filterSpecificButtonsContainer);

      for (const config of filterSpecificButtonConfigs) {
        if (config.type === 'button') {
          await this.renderButton(dv, filterSpecificButtonsContainer, config, filterKey, projects);
        }
      }
    }
  }

  // ----------------------------------------------
  // BUTTON CONFIGURATION METHODS
  // ----------------------------------------------

  getFilterSpecificButtonConfigs(task, filterKey, commonActions) {
    switch (filterKey) {
      case 'INBOX':
        return this.getInboxButtonConfigs(task, commonActions);
      case 'REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS':
        return this.getRemainingTasksWithoutDoitAndFocusLabelsButtonConfigs(task, commonActions);
      case 'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE':
        return this.getCatchParentNeedSubtaskOrCompleteButtonConfigs(task, commonActions);
      default:
        return [];
    }
  }

  getButtonConfigs(task, filterKey, dv, actionButtonContainer) {
    const commonActions = {
      deleteTask: () => this.deleteTask(task.id),
      completeTask: () => this.completeTask(task.id),
      removeTaskDueDate: () => this.clearTaskDueDate(task.id),
      updateToToday: () => this.updateTaskDueDate(task.id, "today"),
      setDueDateTime: (days, hours) => () => this.setDueDateTime(task.id, days, hours),
      updateTaskDueDateTime: (minutes) => () => this.updateTaskDueDate(task.id, minutes),
      addComment: () => this.handleAddComment(dv, task, filterKey, actionButtonContainer),
      addSubtask: () => this.handleAddSubtask(dv, task, filterKey, actionButtonContainer)
    };

    const globalButtonConfigs = [
      ...this.getGlobalDropdownButtons(task, commonActions),
    ];

    const filterSpecificButtonConfigs = this.getFilterSpecificButtonConfigs(task, filterKey, commonActions);

    return { globalButtonConfigs, filterSpecificButtonConfigs };
  }

  // ----------------------------------------------
  // DROPDOWN CONFIGURATION METHODS
  // ----------------------------------------------

  getGlobalDropdownButtons(task, commonActions) {
    return [
      {
        name: 'Add Comment',
        type: 'button',
        action: () => commonActions.addComment(),
        refreshAfterClick: false
      },
      {
        name: 'Add Comment to Top-Level Task',
        type: 'button',
        action: () => this.addCommentToTopLevelTask(task),
        refreshAfterClick: false
      },
      {
        name: 'Add Comment to Project',
        type: 'button',
        action: () => this.addCommentToProject(task),
        refreshAfterClick: false
      },
      {
        name: 'Follow Up',
        type: 'button',
        action: () => this.addFollowUpCommentToTask(task.id),
        refreshAfterClick: false
      },
      {
        name: 'Copy Task Details',
        type: 'button',
        action: () => this.copyTaskDetailsToClipboard(task),
        refreshAfterClick: false
      },
      {
        name: 'Global Actions',
        type: 'dropdown',
        actions: [
          { name: 'Complete Task', action: commonActions.completeTask, refreshAfterClick: false },
          { name: 'Delete Task', action: commonActions.deleteTask, refreshAfterClick: false },
        ]
      },
      this.getTaskManagementDropdownConfig(task, commonActions),
      this.getTimeButtonDropdownConfig(task, commonActions),
      this.getSnoozeButtonDropdownConfig(task, commonActions)
    ];
  }

  getTaskManagementDropdownConfig(task, commonActions) {
    return {
      name: 'Task Management',
      type: 'dropdown',
      actions: [
        { name: "Add Subtask", action: commonActions.addSubtask, refreshAfterClick: false }
      ]
    };
  }

  getManageLabelsDropdownConfig(task, commonActions) {
    return {
      name: 'Manage Labels',
      type: 'dropdown',
      actions: [
        { name: "Add 'doit' Label", action: () => commonActions.addDoit(), refreshAfterClick: false },
        { name: "Add 'focus' Label", action: () => commonActions.addFocus(), refreshAfterClick: false }
      ]
    };
  }

  getTimeButtonDropdownConfig(task, commonActions) {
    const actions = [
      { name: 'Do Now', action: commonActions.updateTaskDueDateTime(0), refreshAfterClick: false },
      { name: 'Do Today', action: commonActions.updateToToday, refreshAfterClick: false },
      { name: 'Remove Due Date', action: commonActions.removeTaskDueDate, refreshAfterClick: false },
      { name: '9AM Today', action: commonActions.setDueDateTime(0, 9), refreshAfterClick: false },
      { name: '12PM Today', action: commonActions.setDueDateTime(0, 12), refreshAfterClick: false },
      { name: '5PM Today', action: commonActions.setDueDateTime(0, 17), refreshAfterClick: false },
      { name: '9AM Tomorrow', action: commonActions.setDueDateTime(1, 9), refreshAfterClick: false },
      { name: '12PM Tomorrow', action: commonActions.setDueDateTime(1, 12), refreshAfterClick: false },
      { name: '5PM Tomorrow', action: commonActions.setDueDateTime(1, 17), refreshAfterClick: false },
    ];

    return {
      name: 'Set Do Time',
      type: 'dropdown',
      actions
    };
  }

  getSnoozeButtonDropdownConfig(task, commonActions) {
    return {
      name: 'Snooze this Task',
      type: 'dropdown',
      actions: [
        { name: '30 Minutes', action: commonActions.updateTaskDueDateTime(30), refreshAfterClick: false },
        { name: '1 Hour', action: commonActions.updateTaskDueDateTime(60), refreshAfterClick: false },
        { name: '3 Hours', action: commonActions.updateTaskDueDateTime(180), refreshAfterClick: false },
      ]
    };
  }

  getSnoozeOtherTasksDropdownConfig(task, filterKey) {
    return {
      name: 'Snooze Other Tasks',
      type: 'dropdown',
      actions: [
        { name: 'Snooze Others by 30 Minutes', action: () => this.snoozeOtherTasksInFilter(task.id, filterKey, 30), refreshAfterClick: false },
        { name: 'Snooze Others by 1 Hour', action: () => this.snoozeOtherTasksInFilter(task.id, filterKey, 60), refreshAfterClick: false },
        { name: 'Snooze Others by 2 Hours', action: () => this.snoozeOtherTasksInFilter(task.id, filterKey, 120), refreshAfterClick: false },
      ]
    };
  }

  // ----------------------------------------------
  // FILTER SPECIFIC BUTTON CONFIG METHODS
  // ----------------------------------------------

  getInboxButtonConfigs(task, commonActions) {
    return [
      {
        name: 'Move To Project',
        type: 'button',
        action: () => this.handleProjectSelection(task.id),
        refreshAfterClick: false
      },
      {
        name: 'Add Labels',
        type: 'button',
        action: () => this.handleLabelSelection(task.id),
        refreshAfterClick: false
      }
    ];
  }

  getRemainingTasksWithoutDoitAndFocusLabelsButtonConfigs(task, commonActions) {
    return [
      this.getManageLabelsDropdownConfig(task, commonActions),
      this.getSnoozeOtherTasksDropdownConfig(task, 'REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS')
    ];
  }

  getCatchParentNeedSubtaskOrCompleteButtonConfigs(task, commonActions) {
    return [
      this.getManageLabelsDropdownConfig(task, commonActions),
      this.getSnoozeOtherTasksDropdownConfig(task, 'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE')
    ];
  }

  // ----------------------------------------------
  // FILTER SPECIFIC LOGIC METHODS
  // ----------------------------------------------

  async applyFilterSpecificLogic(filterKey, tasksWithComments) {
    switch (filterKey) {
      case 'DO_IT':
        return this.applyDoItFilterLogic(tasksWithComments);
      case 'INBOX':
        return this.applyInboxFilterLogic(tasksWithComments);
      case 'CATCH_NEW_SUBTASKS':
        return this.applyCatchNewSubtasksFilterLogic(tasksWithComments);
      case 'NOW_SUBTASKS':
        return this.applyNowSubtasksFilterLogic(tasksWithComments);
      case 'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE':
        return this.applyCatchParentNeedSubtaskOrCompleteFilterLogic(tasksWithComments);
      default:
        return this.separateIncludedAndExcludedTasks(tasksWithComments, tasksWithComments);
    }
  }

  async applyDoItFilterLogic(tasksWithComments) {
    let filteredTasks = this.sortTasksByLatestDate(tasksWithComments);
    filteredTasks = this.applyFilterExclusions('DO_IT', filteredTasks);
    return this.separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks);
  }

  async applyInboxFilterLogic(tasksWithComments) {
    let filteredTasks = this.sortTasksByLatestDate(tasksWithComments);
    filteredTasks = this.applyFilterExclusions('INBOX', filteredTasks);
    return this.separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks);
  }

  async applyCatchNewSubtasksFilterLogic(tasksWithComments) {
    let filteredTasks = this.sortTasksByLatestDate(tasksWithComments);
    filteredTasks = this.applyFilterExclusions('CATCH_NEW_SUBTASKS', filteredTasks);
    return this.separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks);
  }

  async applyNowSubtasksFilterLogic(tasksWithComments) {
    let filteredTasks = this.sortTasksByLatestDate(tasksWithComments);
    filteredTasks = this.applyFilterExclusions('NOW_SUBTASKS', filteredTasks);
    return this.separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks);
  }

  async applyCatchParentNeedSubtaskOrCompleteFilterLogic(tasksWithComments) {
    let filteredTasks = this.sortTasksByLatestDate(tasksWithComments);
    filteredTasks = this.applyFilterExclusions('CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE', filteredTasks);
    return this.separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks);
  }

  // ----------------------------------------------
  // SORTING/FILTERING METHODS
  // ----------------------------------------------

  separateIncludedAndExcludedTasks(tasksWithComments, filteredTasks) {
    const includedTasks = filteredTasks;
    const excludedTasks = tasksWithComments.filter(({ task }) => !filteredTasks.some(t => t.task.id === task.id));
    return { includedTasks, excludedTasks };
  }

  sortTasksByLatestDate(tasks) {
    return tasks.sort((a, b) => {
      const latestDateA = a.comments.length > 0
        ? Math.max(new Date(a.comments[a.comments.length - 1].posted_at), new Date(a.task.created_at))
        : new Date(a.task.created_at);

      const latestDateB = b.comments.length > 0
        ? Math.max(new Date(b.comments[b.comments.length - 1].posted_at), new Date(b.task.created_at))
        : new Date(b.task.created_at);

      return latestDateB - latestDateA;
    });
  }

  applyFilterExclusions(filterKey, tasksWithComments) {
    const excludeTasksAfterMinutes = TodoistFilteredTasks.FILTERS[filterKey].excludeTasksAfterMinutes;
    if (excludeTasksAfterMinutes !== undefined) {
      return this.filterTasksByDueTime(tasksWithComments, excludeTasksAfterMinutes);
    }
    return tasksWithComments;
  }

  filterTasksByDueTime(tasksWithComments, excludeTasksAfterMinutes) {
    const currentTime = new Date();

    const filteredTasks = tasksWithComments.filter(({ task }) => {
      if (!task.due) {
        return true; // Include tasks without a due date
      }

      const dueDateTime = new Date(task.due.datetime || task.due.date);
      const timeDiff = dueDateTime.getTime() - currentTime.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      return minutesDiff < excludeTasksAfterMinutes;
    });

    return filteredTasks;
  }

  // ----------------------------------------------
  // UTILITY METHODS
  // ----------------------------------------------

  // TIME AND DATE METHODS
  getRelativeTime(dateString) {
    const now = Date.now();
    const date = new Date(dateString).getTime();
    const delta = date - now;
    const absDelta = Math.abs(delta);

    if (absDelta < 60 * 1000) {
      return 'just now';
    } else if (absDelta < 60 * 60 * 1000) {
      const minutes = Math.floor(absDelta / (60 * 1000));
      return `${minutes} minute(s) ${delta < 0 ? 'ago' : 'from now'}`;
    } else if (absDelta < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(absDelta / (60 * 60 * 1000));
      const minutes = Math.floor((absDelta % (60 * 60 * 1000)) / (60 * 1000));
      return `${hours} hour(s) and ${minutes} minute(s) ${delta < 0 ? 'ago' : 'from now'}`;
    } else {
      const days = Math.floor(absDelta / (24 * 60 * 60 * 1000));
      const hours = Math.floor((absDelta % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      return `${days} day(s) and ${hours} hour(s) ${delta < 0 ? 'ago' : 'from now'}`;
    }
  }

  getRelativeDueDate(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDateOnly = new Date(dueDate);

    const diffTime = dueDateOnly.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "tomorrow";
    } else if (diffDays === -1) {
      return "yesterday";
    } else if (diffDays > 1) {
      return `in ${diffDays} day(s)`;
    } else {
      return `${Math.abs(diffDays)} day(s) ago`;
    }
  }

  formatDateTime(datetimeString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(datetimeString);
    return date.toLocaleDateString('en-US', options);
  }

  // ----------------------------------------------
  // UI UTILITY METHODS
  // ----------------------------------------------

  setLastTouchedTask(taskContainer) {
    const lastTouchedTask = document.querySelector('.last-touched-task');
    if (lastTouchedTask) {
      lastTouchedTask.classList.remove('last-touched-task');
    }
    taskContainer.classList.add('last-touched-task');
  }

  setLastTouchedFilter(filterContainer) {
    const lastTouchedFilter = document.querySelector('.last-touched-filter');
    if (lastTouchedFilter) {
      lastTouchedFilter.classList.remove('last-touched-filter');
    }
    filterContainer.classList.add('last-touched-filter');
  }

  // MISC METHODS

  updateLastRefreshTime(element, filterKey) {
    const lastRefreshTime = TodoistFilteredTasks.FILTERS[filterKey].lastRefreshTime;
    const relativeTime = this.getRelativeTime(lastRefreshTime);
    element.textContent = `Last Refresh: ${relativeTime}`;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  formatTaskName(taskName) {
    const taskHierarchy = taskName.split(' > ').reverse();
    const lines = [];

    function formatLines(parts, prefix = '', isFirst = true) {
      if (parts.length === 0) return;

      const last = parts.length - 1;
      for (let i = 0; i < parts.length; i++) {
        const isLast = i === last;
        const connector = isFirst && isLast ? '└── ' : (isLast ? '└── ' : '├── ');
        const newPrefix = isFirst && isLast ? (prefix + '    ') : (isLast ? prefix + '    ' : prefix + '│   ');

        lines.push(prefix + connector + parts[i]);
        formatLines(parts.slice(i + 1), newPrefix, false);
        break;
      }
    }

    formatLines(taskHierarchy);
    return lines.join('\n');
  }

  // ----------------------------------------------
  // INSIGHT/SUGGESTION GENERATION METHODS
  // ----------------------------------------------
  // TODO: consider making groups of insights and suggestions, so that you can easily add them to a filter.

  async generateConclusion(task, comments, filterKey) {
    switch (filterKey) {
      case 'NOW_SUBTASKS':
        return this.generateNowSubtasksConclusion(task, comments);
      case 'INBOX':
        return this.generateInboxConclusion(task, comments);
      case 'CATCH_NEW_SUBTASKS':
        return this.generateCatchNewSubtasksConclusion(task, comments);
      case 'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE':
        return this.generateCatchParentNeedSubtaskConclusion(task, comments);
      default:
        return '';
    }
  }

  // Insights
  generateDueDateInsight(task) {
    if (!task.due) {
      return "Insight: Consider setting a due date for this task to help with prioritization and planning.\n";
    }
    return "";
  }

  generateCommentInsight(comments) {
    if (comments.length === 0) {
      return "Insight: Add some comments to provide more context or track progress on this task.\n";
    }
    return "";
  }

  generateDescriptionInsight(task) {
    if (!task.description) {
      return "Insight: There is no description for this task. Consider adding a relevant link or description to clarify what needs to be done.\n";
    }
    return "";
  }

  generateOldTaskInsight(task) {
    const taskCreationDate = new Date(task.created);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - taskCreationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 2) {
      return "Insight: The task's creation date is older than 2 days. It's recommended to check if this task is done. If so, consider completing it.\n";
    }
    return "";
  }

  // Suggestions
  generateLabelSuggestion(task) {
    const focusLabel = task.labels.includes("focus");
    const doitLabel = task.labels.includes("doit");

    if (!focusLabel && !doitLabel) {
      return "Suggestion: Consider adding either the `focus` or `doit` label to this task.\n";
    }
    return "";
  }


  // ----------------------------------------------
  // CONCLUSION GENERATION METHODS
  // ----------------------------------------------

  async generateNowSubtasksConclusion(task, comments) {
    const dueDateRecommendation = this.generateDueDateInsight(task);
    const labelRecommendation = this.generateLabelSuggestion(task);

    return dueDateRecommendation + labelRecommendation;
  }

  async generateCatchNewSubtasksConclusion(task, comments) {
    const dueDateRecommendation = this.generateDueDateInsight(task);
    const descriptionRecommendation = this.generateDescriptionInsight(task);

    return (dueDateRecommendation + descriptionRecommendation).trim();
  }

  async generateRemainingTasksWithoutDoitAndFocusLabelsConclusion(task, comments) {
    const labelRecommendation = this.generateLabelSuggestion(task);
    return labelRecommendation;
  }

  async generateCatchParentNeedSubtaskConclusion(task, comments) {
    const commentRecommendation = this.generateCommentInsight(comments);
    const oldTaskRecommendation = this.generateOldTaskInsight(task);

    return commentRecommendation + oldTaskRecommendation;
  }

  async generateInboxConclusion(task, comments) {
    const dueDateRecommendation = this.generateDueDateInsight(task);
    const labelRecommendation = this.generateLabelSuggestion(task);

    return dueDateRecommendation + labelRecommendation;
  }

  async generateDoItConclusion(task, comments) {
    const dueDateRecommendation = this.generateDueDateInsight(task);
    const labelRecommendation = this.generateLabelSuggestion(task);

    return dueDateRecommendation + labelRecommendation;
  }

  async generateGenericConclusion(task, comments) {
    const dueDateRecommendation = this.generateDueDateInsight(task);
    const commentRecommendation = this.generateCommentInsight(comments);

    return (dueDateRecommendation + commentRecommendation).trim();
  }
}

const { TodoistFilteredTasks } = customJS;

// Create an instance of the FilterConfigurations class
const filterConfigurations = customJS.createFilterConfigurationsInstance();

// Get the filter configurations from the FilterConfigurations instance
const { filterOrder, filters } = filterConfigurations.getFilterConfigurations();

// TODO: Someday!
// const todoistAPI = customJS.createTodoistAPIInstance();
// Get the tasks from the Todoist API
// const tasks = await todoistAPI.getFilteredTasks(filters.DO_IT);

// Set the filter order and filters in the TodoistFilteredTasks class
TodoistFilteredTasks.setFilterOrder(filterOrder);
TodoistFilteredTasks.setFilters(filters);

// Enable the desired filters
TodoistFilteredTasks.setFilterEnabled('DO_IT', true, 0, false);
TodoistFilteredTasks.setFilterEnabled('INBOX', true, 1, false);
TodoistFilteredTasks.setFilterEnabled('REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS', false, 2, false);
TodoistFilteredTasks.setFilterEnabled('CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE', true, 3, false);
TodoistFilteredTasks.setFilterEnabled('NOW_SUBTASKS', true, 4, false);
TodoistFilteredTasks.setFilterEnabled('CATCH_NEW_SUBTASKS', true, 5, false);

// Display the filtered tasks
TodoistFilteredTasks.displayAllFilteredTasks(dv);

class FilterConfigurations {
    getFilterConfigurations() {
        const filterOrder = [
            'DO_IT',
            'INBOX',
            'REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS',
            'CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE',
            'NOW_SUBTASKS',
            'CATCH_NEW_SUBTASKS',
        ];

        // ----------------------------------------------
        // FILTERS
        // ----------------------------------------------
        const filters = {
            NOW_SUBTASKS: {
                query: "!recurring & subtask & @next_action & (overdue | due today)",
                title: "🟣 Now Subtasks",
                defaultExpanded: false,
                excludeTasksAfterMinutes: 20,
                fetchTopLevelParentDueDate: true,
                defaultFilterExpanded: true,
                includeTasksWithinMinutes: 60,
                documentation: 'This is what you need to do next, and what you are working on right now.\n' +
                    'There should realistically not be too many of these at once, if there is, you should throw it back to catch new subtasks.'
            },
            CATCH_NEW_SUBTASKS: {
                query: "!recurring & subtask & @next_action & no date",
                title: "🟣 Catch/Pull In New Subtasks",
                defaultExpanded: false,
                defaultFilterExpanded: false,
                fetchTopLevelParentDueDate: false,
                excludeTasksAfterMinutes: 60,
                includeTasksWithinMinutes: 60,
                documentation: 'This is how you should process CATCH_NEW_SUBTASKS.\n' +
                    '- Only dip here if you are looking for something to do next, and you have no other subtasks to do.\n'
            },
            CATCH_PARENT_NEED_SUBTASK_OR_COMPLETE: {
                query: "!recurring & !subtask & @next_action & !@doit & (due today | overdue)",
                title: "🟢 Parent Tasks Done?",
                defaultExpanded: false,
                defaultFilterExpanded: true,
                fetchTopLevelParentDueDate: false,
                excludeTasksAfterMinutes: 120,
                includeTasksWithinMinutes: 60,
                documentation: 'This is how you should process CATCH_PARENT_NEED_SUBTASK.\n' +
                    '- Need Subtask or They are Done (or do it)\n' +
                    '- This where parents tasks will go if they are being caught after their last subtask is finished\n' +
                    '- Either create a new subtask or complete the task if it is done.\n' +
                    'It also catches tasks that could either be 1 action, in which case give it the doit label, or it needs a subtask.'
            },
            REMAINING_TASKS_WITHOUT_DOIT_AND_FOCUS_LABELS: {
                query: "!recurring & !subtask & !@next_action & !@doit & !@focus & (due today | overdue)",
                title: "Remaining Tasks Without 'doit' Label",
                defaultExpanded: false,
                defaultFilterExpanded: true, // True.
                fetchTopLevelParentDueDate: false,
                excludeTasksAfterMinutes: 60,
                includeTasksWithinMinutes: 60,
                documentation: 'This is how you should process NOW.\n',
            },
            INBOX: {
                query: "project:inbox & !@doit",
                title: "Inbox",
                defaultExpanded: false,
                defaultFilterExpanded: true,
                fetchTopLevelParentDueDate: false,
                excludeTasksAfterMinutes: 60,
                includeTasksWithinMinutes: 60,
                documentation: 'This is how you should process INBOX.\n',
            },
            DO_IT: {
                query: "!recurring & !subtask & @doit & (overdue | due today | no date)",
                title: "Do it Now",
                defaultExpanded: false,
                defaultFilterExpanded: true,
                fetchTopLevelParentDueDate: false,
                excludeTasksAfterMinutes: 15,
                includeTasksWithinMinutes: 90,
                documentation: 'This is how you should process INBOX.\n' +
                    'or snooze to a time when you know you can do it.\n'
            },
        };
        return { filterOrder, filters };
    }
}

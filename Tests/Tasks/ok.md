---
id: 10
starred: false
status: Triage
type: note
tags:
  - zettel
cssclasses: 
obsidianUIMode: source
obsidianEditingMode: live
template: "[[Default]]"
publish: false
description: 
context: ""
created: 20230125201408
modified: 20230904133938
source: 
aliases:
  - Tasks
  - "20230125201408"
linter-yaml-title-alias: Tasks
title: Tasks
labels:
  - 
date created: Wednesday, January 25th 2023, 8:14:08 pm
project: ""
search: 
permalink: 
projects:
  - 
---
  


# Tasks



[[Sample Tasks#Sample Tasks|Sample Tasks]]  
`_tests/Tasks/`

- <https://obsidian-tasks-group.github.io/obsidian-tasks/queries/examples/>
- <https://obsidian-tasks-group.github.io/obsidian-tasks/quick-reference/>


## Group By Status Name
```tasks
path includes _tests/Tasks/
group by status.name
short mode
explain
```

## Get Status Name

```tasks
short mode
status.name includes idea
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

```tasks
short mode
status.name includes forward
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

```tasks
not done
short mode
status.name includes question
sort by filename reverse
limit 5
```

```tasks
short mode
status.name includes cancel
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

```tasks
short mode
status.name includes progress
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

```tasks
short mode
status.name includes Todo
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

```tasks
short mode
status.name includes Done
sort by filename reverse
limit 5
path includes _tests/Tasks/
```

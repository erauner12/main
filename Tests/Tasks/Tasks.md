---
starred: false
status: "Triage"
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
created: 20230125085559
modified: 20230904133938
source: 
aliases:
  - Tasks
linter-yaml-title-alias: Tasks
title: Tasks
labels:
  - 
date created: Wednesday, January 25th 2023, 8:56:00 am
project: ''
search: 
permalink: 
projects:
  - 
id: 01H70JG64Q0QBWM7E1Y6YAS6PM
---

[[Toggle List Callouts]]

# Tasks
## Current Task Implementation
### In Use

[[Toggle Link|Next Status Configuration]]

```
- [>] `>` Forwarded
- [x] `x` Regular
- [?] `?` Question
- [c] `c` Choice (or cons?)
- [-] `-` Cancelled
- [/] `/` In Progress
```

### Not in Use

```
- [~] testing
- [<] Scheduling
- [!] Important
- [*] Star
- ["] Quote
- [b] Bookmark
- [i] Information
- [S] Savings
- [I] Idea
- [p] Pros
- [k] Key
- [w] Win
- [u] Up
- [d] Down
- [f] Fire
- [l] Location
```



## Task Reference
### Task Types

Any of your custom statuses can be set to these states

| Character | Name        |
|:--------- |:----------- |
| ` `       | To Do       |
| `/`       | In Progress |
| `x`       | Done        |
| `-`       | Cancelled   |

### All

| character | Purpose     |
|:--------- |:----------- |
| `X`       | Done        |
| `-`       | Canceled    |
| `>`       | Forwarded   |
| `?`       | Question    |
| `!`       | Important   |
| `*`       | Star        |
| `"`       | Quote       |
| `b`       | Bookmark    |
| `i`       | Information |
| `S`       | Savings     |
| `I`       | Idea        |
| `p`       | Pros        |
| `c`       | Cons        |
| `k`       | Key         |
| `w`       | Win         |
| `u`       | Up          |
| `d`       | Down        |
| `f`       | Fire        |
| `l`       | Location    |

## Query Usage Examples
### Dataview
```dataview
task
from "202301061547"
where status = "i"
```

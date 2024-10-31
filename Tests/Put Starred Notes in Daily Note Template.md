---
starred: false
status: "Triage"
type: note
tags:
  - context/side
cssclasses: 
obsidianUIMode: source
obsidianEditingMode: live
template: "[[Default]]"
publish: false
description: 
context: ""
created: 20230123115658
modified: 20230904133938
source: https://forum.obsidian.md/t/list-of-starred-notes-using-inline-js/38931/2
aliases:
  - Put Starred Notes in Daily Note Template
linter-yaml-title-alias: Put Starred Notes in Daily Note Template
title: Put Starred Notes in Daily Note Template
labels:
  - 
uid: 54ee259e-71e1-43ef-9de6-0772b51b1100
processed-path: Inbox/Processed
date created: Monday, January 23rd 2023, 11:56:58 am
project: ''
search: 
permalink: 
id: 01H70JG66V8YG2HFHZFN5HAPEW
---
# Put Starred Notes in Daily Note Template


## Dataviewjs Route

<https://forum.obsidian.md/t/list-of-starred-notes-using-inline-js/38931/2>

```Bash
dv.fileLink(p.file.name, false, p.file.aliases[0] ? p.file.aliases[0] : p.file.name)
```


## Regular Dataview Route

```dataview
TABLE WITHOUT ID link(file.link, aliases) as "Note"
WHERE file.starred
SORT file.mtime DESC
```

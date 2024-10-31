---
starred: false
status: "Triage"
type: note
tags:
  - 
cssclasses: 
obsidianUIMode: source
obsidianEditingMode: live
template: "[[Default]]"
publish: false
description: 
context: ""
created: 20230106161234
modified: 20230904133938
source: 
aliases:
  - List Callouts and toggleList
linter-yaml-title-alias: List Callouts and toggleList
title: List Callouts and toggleList
labels:
  - 
date created: Friday, January 6th 2023, 4:12:34 pm
project: ''
search: 
permalink: 
id: 01H70JG65MABQXBYK8VEBY84B1
---


# List Callouts and toggleList

- [x] ! decide here whether or not you want you should be pairing up tasks / list callouts status in terms of functionality  
<https://github.com/mgmeyers/obsidian-list-callouts>

- <https://github.com/mgmeyers/obsidian-list-callouts/issues/28>  

<https://github.com/thingnotok/obsidian-toggle-list>

## Callout
### In Use
- ? test question
- ! test important
- $ solved
- ~ test doc
- & forward



#### Raindrop or Readwise
- ? here is a template for running across all DC BE nodes
	- insert tag after to test %%to-process%%

### Not in Use

- test
- @ person
- % not sure yet




### Test Question
```dataview
TABLE WITHOUT ID Lists.text AS "highlight", link(Lists.link, meta(Lists.section).subpath) AS "Section" 
WHERE file.path = this.file.path 
FLATTEN file.lists AS Lists 
WHERE contains(Lists.text, "? ") or contains(Lists.text, "~ ") or contains(Lists.text, "! ")
```

#### Raindrop or Readwise Aggregate
```dataview
TABLE WITHOUT ID Lists.text AS "highlight", link(Lists.link, meta(Lists.section).subpath) AS "Section"
FROM #to-process
WHERE file.path = this.file.path
FLATTEN file.lists AS Lists 
WHERE contains(Lists.text, "? ") or contains(Lists.text, "~ ") or contains(Lists.text, "! ")
```
- use `to-process` tag because then after you remove the tag. You'll still be gathering every incoming item (from automated sources)[^1]


## Task and Callout Merge

[[_tests/Tasks/Tasks#Tasks]]

```

- 
- ~ 
- ? 
- $ 
- % 
- & 
- ! 
- @
```

```
- 
- ~ 
- [*] 
- $ 
- [S] 
- ? 
- [?] 
- ! 
- [!] 
- & 
- [<] 
- [-] 
- [x]
```
- [ ] took all the checkboxes out until I can develop the rest of the workflow for storing thing I want to do in the future (that I don't want to send to todoist yet)

### Each Transition Meaning

#### Informational
```
- ~ 
- [i] 
```
- test

#### Question
```
- ? 
- [?] 
```
- test

#### Did it

```
- $ 
- [p] 
```
- test

#### Not Doing Anymore

```
- % 
- [-] 
```
- test

#### Do Later

```
- & 
- [<] 
```
- test

#### Important

```
- ! 
- [!] 
```
- test

#### Something Someone Said

```
- @ 
- ["] 
```
- test


#### Complete

```
- [x]
```
- Thing is done (this is also what allows to get out of done status)




- [x] write down which each one means [*](https://todoist.com/showTask?id=6572399121) ^90bb6
- ~ allows me to cycle through and bring attention to certain lines in an outline, and immediately make it actionable (without sending to todoist yet)
	- each list callout symbol is paired to an actionable symbol
		- I only want to place it in an actionable place if I want to take action on it
		- [i] but I also sometimes just want to call attention to a line without making it actionable[^2]

[^2]: to avoid things getting messy and creating more processing workload for me. Best of both worlds

---
starred: false
status: "Triage"
type: note
tags:
  - projects
  - 'DCR-Farm-title: Test Resources'
cssclasses: 
obsidianUIMode: source
obsidianEditingMode: live
template: "[[Default]]"
publish: false
description: 
context: ""
created: 20230201112145
modified: 20230904133938
source: 
aliases:
  - Test Resources
linter-yaml-title-alias: Test Resources
title: Test Resources
labels:
  - 
date created: Wednesday, February 1st 2023, 11:21:45 am
project: ''
search: 
permalink: 
id: 01H70JG66BJZXTCX5WKSN5N0V0
---

```dataview
list 
where contains(projects, "DCR-Farm----")
```

>[!info]  
> The following code block allows you to "freeze" the Dataview query result above into HTML.  
> If you use Obsidian Publish, this will allow you to publish the resource list as it is above.  
> I recommend running this, **after** you finish a project and are ready to commit it to _PARA/Archive.  
> To use: open command pallette, remove the spaces between < % and *, run "Templater: Replace all templates in Active File", and remove the triple backticks.

```dataview
TABLE project
FROM #context/test 
WHERE contains(file.frontmatter.project,"DCR Farm ---")
```

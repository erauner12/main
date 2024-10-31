---
id: 9
guid: GUID-80
publish: false
starred: false
status: "Triage"
type: note
tags:
  - 
cssclasses: 
obsidianUIMode: source
obsidianEditingMode: live
template: "[[Default]]"
description: ""
created: 20230914181447
modified: 20230914183000
aliases:
  - Tasks Within a Note
linter-yaml-title-alias: Tasks Within a Note
title: Tasks Within a Note
---

# Tasks Within a Note



## Summary of Tasks Within This Note

```dataviewjs
function callout(text, type) {
    const allText = `> [!${type}]\n` + text;
    const lines = allText.split('\n');
    return lines.join('\n> ') + '\n'
}

const query = `
not done
path includes ${dv.current().file.path}
# you can add any number of extra Tasks instructions, for example:
group by heading
`;

dv.paragraph(callout('```tasks\n' + query + '\n```', 'todo'));

```


- [x] Testing ✅ 2023-09-14
- [ ] Another




---

[[2023-09-14]]

#type/test

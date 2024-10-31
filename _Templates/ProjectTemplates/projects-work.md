---
id: 10
status: Triage
tags:
  - <% await tp.system.suggester(["projects/Work", "projects/Home", "projects/Side"], ["projects/Work", "projects/Home", "projects/Side"]) %>
type: Project
project: <% await tp.user.choose_project(tp) %>
done: false
exclude-from-project: false
template: "[[projects-work]]"
number: ""
---

```meta-bind
INPUT[editor(title(What is your number?)):number]
```

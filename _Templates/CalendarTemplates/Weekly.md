---
id: 10
up: "[[{{date:YYYY-MM}}]]"
template: "[[Weekly]]"
month: "[[{{date:YYYY-MM}}]]"
week: "[[{{date:gggg}}-W{{date:W}}]]"
yearly: "[[{{date:YYYY}}]]"
quarterly: "[[{{date:YYYY}}-Q{{date:Q}}]]"
tags:
  - periodic/weekly
---

# {{date:[Week] ww gggg}}

## Goals


## Retro

- ? What went well this week?
- $ 


---

What could be adjusted?

- ? Create a task to adjust these items
- $ 

---

- ? What should I stop doing?
- $ 


---

What should I start doing?

- ? Create a task to plan these items in more detail
- $ 

## Open Projects

## Note Review

```
LIST
FROM ""
WHERE file.day <= date({{date:YYYY-MM-DD}}) AND file.day >= date({{date:YYYY-MM-DD}}) - dur(7days)
SORT file.day ASC
```

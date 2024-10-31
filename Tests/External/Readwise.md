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
created: 20230107153345
modified: 20230904133938
source: 
aliases:
  - Readwise Test Template Notes
linter-yaml-title-alias: Readwise Test Template Notes
title: Readwise Test Template Notes
labels:
  - 
date created: Thursday, December 8th 2022, 5:14:37 pm
project: ''
search: 
permalink: 
cssclass: wide-page
id: 01H70JG67M71RZTTVFBATZPRZ4
---

If you use Readwise, you'll be able to have resources auto sync from Kindle + the web. They'll end up in the `/Readwise` directory.

<http://jinja.quantprogramming.com/>

# Readwise Test Template Notes

- [ ] find online jinja beautify or equivalent (there is a bug here, it will not create the task with taskbone)

# Readwise Jinja

## Dataview Test (should Have One item)
```
list from "Readwise"
```
- add `dataview` to test

The following settings can be set in the [Obsidian Export Settings in Readwise](https://readwise.io/export/obsidian/preferences)

## File Name Formatting

```
{{book_id}}
```

## Page Title Formatting

```

```
- purposely empty

## Page Metadata Formatting

```
--author: {% if author %}{{author|replace("@","")}}{% endif %}
fullTitle: {{full_title|replace(":"," - ")|replace("#","")}}
category: #{{category}}
from: {{source}}
date: [[{{date}}]]
time: {{time}}
{% if image_url -%}
imageURL: {{image_url}}
{% endif -%}
{% if book_id -%}
bookID: {{book_id}}
{% endif -%}
{% if document_tags -%}
documentTags: {% for tag in document_tags %}#{{tag}} {% endfor %}
{% endif -%}
{% if url -%}
source: {{url}}
tags: [ to-process ]
{% endif -%}
projects: []
---

# {{ title|replace(":"," - ")|replace("#","") }}
```
- `title` is applied here[^1]

## Highlights Header Formatting

```
{% if is_new_page %}
## Highlights 
{% elif has_new_highlights -%}
## New highlights added {{date|date('F j, Y')}} at {{time}} 
{% endif -%}
```


## Highlight Formatting

```
---

- {{ highlight_text }}{% if highlight_location and highlight_location_url %}([{{highlight_location}}]({{highlight_location_url}})), [Open in Readwise](https://readwise.io/open/{{highlight_id}}){% elif highlight_location %} ({{highlight_location}}){% endif %}{% if highlight_tags %}
    - Tagged: {% for tag in highlight_tags %} #{{tag|replace(" ","-")}} {% endfor %}{% endif %}{% if highlight_note %}
    - Note: {{ highlight_note }}{% endif %}
^rw{{highlight_id}} #to-process

---
```

### Unique Values

![[Pasted image 20230110154420.png]]

```Bash
- {{ highlight_text }}{% if highlight_location and highlight_location_url %}([{{highlight_location}}]
```

```Bash
- Note: {{ highlight_note }}{% endif %}
^rw{{highlight_id}} #to-process
```

## YAML Front Matter

```

```
- purposely blank

## Sync Notification
```
- [[{{date|date('Y-m-d')}}]] {{time}} — Synced {{num_highlights}} highlight{{num_highlights|pluralize}} from {{num_books}} document{{num_books|pluralize}}.
{% for book in books %}    - {{ book.num_highlights_added}} highlights from {{ book.title }}
{% endfor %}
```

[^1]: don't remember why. had a good reason though

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
created: 20230110115635
modified: 20230904133938
source: 
aliases:
  - Raindrop
linter-yaml-title-alias: Raindrop
title: Raindrop
labels:
  - 
date created: Tuesday, January 10th 2023, 11:56:35 am
project: ''
search: 
permalink: 
cssclass: wide-page
id: 01H70JG66K0FB2XFTN11AQHD18
---
# Raindrop

- [x] need to use nunchucks template to [replace characters](https://mozilla.github.io/nunjucks/templating.html#replace) such as `|` ✅ 2023-01-25
	- $ use [readwise export template](https://readwise.io/export/obsidian/preferences) to use what you have found so far
	- `|replace(":"," - ")`
	- `|replace("#","")`
	- `|replace("|","")`


## Controlled by Plugin Code

```
raindrop_id: 499465274
raindrop_last_update: 2023-01-10T17:17:19.203Z
```

## Metadata Template

```jinja2
{% if id %}uid: {{id}}{% endif %}
{% if link %}source: {{link}}{% endif %}
{% if tags|length %}tags:
{%for tag in tags %}
{{tag}}{% endfor %}{%
endif %}
```


## Incoming Data Template



```jinja2
{% if is_new_article %}
# Metadata
{% if link %}Source URL:: {{link}}{% endif %}
{% if tags|length %}Topics:: {{ tags | join(", ") }}{% endif %}

---
# {{title}}

{% if excerpt %}{{excerpt}}{% endif %}

## Highlights
{% endif -%}{% for highlight in highlights %}
{% if highlight.color == "red" -%}
    {%set callout = "danger" -%}
{%elif highlight.color == "blue" -%}
    {%set callout = "info" -%}
{%elif highlight.color == "green" -%}
    {%set callout = "check" -%}
{%else -%}
    {%set callout = "quote" -%}
{%endif -%}
> [!{{callout}}]+ Updated on {{highlight.lastUpdate}}
>
> {{highlight.text.split("\n") | join("\n>")}}
{% if highlight.note -%}> - ~{{highlight.note}} #to-process {%endif %}

{%endfor -%}
```

## Article Metadata
```
{{id}} (number) Article identifier

{{is_new_article}} (bool) - New file indicator

{{title}} (string) Title

{{excerpt}} (string) - Article excerpt

{{link}} (string) - Link to source

{{highlights}} (string) List of your Highlights

{{tags}} (string) List of tag

{{cover}} (string) - Article cover-

{{created}} (string) - Created on

{(type}} (string) - Article type

{{important}} (bool) Favorite article
```

## Collection
```
{{title}} (string) Collection title
```

## Highlight

```

{{id}} (string) - Highlight identifier

{{text}} (string) Text

{{color}} (string) - Highlight color

{{created}} (string) - Created on

{{lastUpdate}} (string) - Updated on

{{note}} (string) - Annotation
```

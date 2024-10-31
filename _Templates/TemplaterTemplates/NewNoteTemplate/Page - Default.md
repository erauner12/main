---
guid: <% await app.insertIncrementalId('GUID') %>
---

%%
date:: [[<% tp.date.now("YYYY-MM-DD") %>]]
parent:: {{link}}
#context<% tp.file.cursor(0) %>
#type<% tp.file.cursor(1) %>
%%


# Changeme

<% tp.file.cursor(2) %>

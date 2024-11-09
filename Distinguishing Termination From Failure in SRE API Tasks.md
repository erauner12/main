---
created: 20241105201023
modified: 2024-11-05T20:12:47-06:00
aliases:
  - Distinguishing Termination From Failure in SRE API Tasks
linter-yaml-title-alias: Distinguishing Termination From Failure in SRE API Tasks
title: Distinguishing Termination From Failure in SRE API Tasks
id: 76712231
---

# Distinguishing Termination From Failure in SRE API Tasks

If a task is terminated or interrupted, we can use this state to filter and only display tasks that have genuinely failed.

```mermaid
graph TD
    A[Task Status] --> B[Terminated]
    A --> C[Interrupted]
    A --> D[Failed]
    B --> E[Filter Tasks]
    C --> E
    E --> F[Display Genuine Failures]
```

---

- [ ] Create a jira for Kamil for this

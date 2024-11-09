---
created: 20241104122413
modified: 2024-11-04T12:24:32-06:00
aliases:
  - Dynamic Frontend Hackathon Script
linter-yaml-title-alias: Dynamic Frontend Hackathon Script
title: Dynamic Frontend Hackathon Script
id: 76712212
---
# Dynamic Frontend Hackathon Script

The next slide will cover creating the new FE, explaining the steps, hours spent, and the process in about two minutes. Then we'll discuss creating a new FE with the FE summoner. We'll give a brief introduction to the dynamic FE concept.

We should keep the content in proper sequence: first present the problem and explain what it takes to create an FE currently. The solution should come after explaining the problem and the current way of creating FEs. While the process involves making changes to XML files, we'll just talk about this without showing anything.

Since the demo takes some real time, we'll start by showing what the cluster under stress looks like - the baseline. We'll initiate the SRE API that will start the FE summoner, then return to the presentation flow. We want to show the topology live, demonstrating the before and after states.

For the demo timing, we need to finish within 10 minutes. We'll modify some slides with more catchy names and walk through them efficiently. We might get 15 minutes, but we should be prepared for the shorter timeframe. We'll do a full dress rehearsal tomorrow.

Regarding questions, we anticipate inquiries about the user perspective and integration with other shared services. Architecture-level questions might include connections to Zookeeper and secure tasks. We'll add a slide about next steps to address these points proactively.

For implementation, we're using a simple stateful set, similar to the farmers that are already running in production. While there are complexities to consider regarding configuration and property files, we'll keep the demo focused on the core functionality rather than diving into those details.

---

**Introduction + Problem**

- Present the problem: the current challenges in creating a new Frontend
- Explain the manual, time-consuming process and resources required for current FE setup.
- Mention necessary steps and hours typically spent (without detailed visuals).
- **Solution: FE Summoner**
    - Introduce the concept of dynamic FEs and the "FE Summoner" as a solution.
    - Describe the benefits and efficiency gains of this approach.
    - Briefly explain how the FE Summoner automates and simplifies the FE creation process.
        - Simple Statefulset, focusing on core frontend functionality and skipping complex configuration.

**Demo Baseline: Current State**

- Show the current cluster in a "stressed" state (baseline) to set the scene.
- Highlight how FEs are managed manually, showing the need for dynamic scaling.
- Right after Sergio shows the output from current cluster, Evan will apply the from current cluster, Evan will apply the changes manually.
    - Show the live cluster topology, showing the "before" state.

**Live Demo: FE Summoner in Action**

- Trigger the SRE API via slack to start the FE Summoner

**Usecases**

**Questions & Next Steps**

- Add a slide for this

// MzQ5MDk2NjYwNjEzOh8bEy9FGuzbcSmR6YBAtNAB/gho

// for the new jira instance

const PROJECT_KEY_OR_ID = "SREPROVNG"; // Replace with your project key or ID

dv.container.classList.add("cards");
dv.container.classList.add("table-100");
dv.container.classList.add("table-max");
dv.container.classList.add("table-wide");
dv.container.classList.add("cards-16-9");
dv.container.classList.add("cards-cols-1");

const activeSprint = await $ji.macro.getActiveSprint(PROJECT_KEY_OR_ID);

if (!activeSprint) {
  dv.paragraph("No active sprint found for the project.");
} else {
  const QUERY = `assignee = currentUser() AND status = 'In Progress' AND sprint = ${activeSprint.id}`;
  const FIELDS = ["key", "summary", "description", "status", "assignee", "created"];

  const results = await $ji.base.getSearchResults(QUERY, { fields: FIELDS });

  function openLink(url, title) {
    if (app.isMobile) {
      window.open(url, '_blank');
    } else {
      const obsidianURI = `obsidian://opengate?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(obsidianURI, '_blank');
    }
  }

  function createOpenButton(issue) {
    const openButton = dv.el('button', 'Open JIRA', { cls: 'open-button' });
    openButton.addEventListener('click', () => {
      openLink(`https://jira.medallia.com/browse/${issue.key}`, issue.fields.summary);
    });
    return openButton;
  }

  function createCopyButton(issue) {
    const copyButton = dv.el('button', 'Copy JIRA ID', { cls: 'copy-button' });
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(issue.key)
        .then(() => {
          console.log(`Copied ${issue.key} to clipboard`);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    });
    return copyButton;
  }

  function createOpenNoteButton(issue) {
    const openNoteButton = dv.el('button', 'Open Note', { cls: 'open-note-button' });
    openNoteButton.addEventListener('click', async () => {
      const noteFile = app.vault.getAbstractFileByPath(`${issue.key}.md`);
      if (!noteFile) {
        await app.vault.create(`${issue.key}.md`, '');
      }
      const leaf = app.workspace.splitActiveLeaf('vertical');
      await leaf.openFile(app.vault.getAbstractFileByPath(`${issue.key}.md`));
    });
    return openNoteButton;
  }

  function createCopySummaryDescButton(issue) {
    const copySummaryDescButton = dv.el('button', 'Copy Summary & Desc', { cls: 'copy-summary-desc-button' });
    copySummaryDescButton.addEventListener('click', () => {
      const summaryAndDesc = `${issue.fields.summary}\n\n${issue.fields.description}`;
      navigator.clipboard.writeText(summaryAndDesc)
        .then(() => {
          console.log(`Copied summary and description for ${issue.key} to clipboard`);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    });
    return copySummaryDescButton;
  }

  if (results.issues.length === 0) {
    dv.paragraph("No issues found in the active sprint.");
  } else {
    const table = dv.table(["Key", "Open", "Copy", "Open Note", "Copy Summary & Desc", "Summary", "Description", "Status", "Assignee", "Created"], results.issues.map(issue => [
      issue.key,
      createOpenButton(issue),
      createCopyButton(issue),
      createOpenNoteButton(issue),
      createCopySummaryDescButton(issue),
      issue.fields.summary,
      issue.fields.description,
      issue.fields.status.name,
      issue.fields.assignee ? issue.fields.assignee.displayName : "-",
      new Date(issue.fields.created).toLocaleDateString()
    ]), {
    });

    dv.paragraph(`Total issues in the active sprint: ${results.total}`);
  }
}

// TODO: Add a filter for "Created for Others" and "Created by Me"
// TODO: show your epics

class Daily {
  displayDailyNotes(dv, specifiedDate, modifiedLimit = 5, excludeFolders = []) {
    const formatDate = date => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Chicago',
      };
      return date.toLocaleDateString('en-US', options);
    };

    const formatTime = date => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Chicago',
      };
      return date.toLocaleTimeString('en-US', options);
    };

    const extractPathWithoutFileName = filePath => {
      const parts = filePath.split('/');
      parts.pop();
      return parts.length > 0 ? parts.join('/') : '/';
    };

    const getCentralTimeDate = dateString => {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day, 6));
    };

    const noteDate = formatDate(getCentralTimeDate(specifiedDate));

    const isExcluded = path => {
      for (const folder of excludeFolders) {
        if (path.startsWith(folder)) {
          return true;
        }
      }
      return false;
    };


    // TODO: swap out file.ctime and mtimt with frontmatter date
    // will need to convert from "YYYYMMDDHHmmss" to Date object first
    const createdTodayFiles = dv.pages().where(p => {
      const createdDate = formatDate(new Date(p.file.ctime));
      return noteDate === createdDate && !isExcluded(p.file.path);
    });

    let modifiedTodayFiles = dv
      .pages()
      .filter(p => p.file && p.file.mtime && p.file.ctime)
      .where(p => {
        const modifiedDate = formatDate(new Date(p.file.mtime));
        return (
          noteDate === modifiedDate &&
          formatDate(new Date(p.file.ctime)) !== noteDate &&
          !isExcluded(p.file.path)
        );
      });

    let allFilesToday = [...createdTodayFiles, ...modifiedTodayFiles];

    allFilesToday.sort((a, b) => {
      if (b.file && b.file.mtime && a.file && a.file.mtime) {
        return new Date(b.file.mtime).getTime() - new Date(a.file.mtime).getTime();
      }
      return 0;
    });

    dv.header(3, 'Obsidian Notes - Created Today');
    dv.table(
      ['File', 'Path'],
      createdTodayFiles.map(p => [
        `${p.title ? `[[${p.file.name}|${p.title}]]` : p.file.link}`,
        extractPathWithoutFileName(p.file.path),
      ])
    );

    allFilesToday = allFilesToday.slice(0, modifiedLimit);
    dv.header(3, 'Obsidian Notes - Latest Modified Today');
    dv.table(
      ['File', 'Path', 'Time Modified', 'Created Today'],
      allFilesToday.map(p => [
        `${p.title ? `[[${p.file.name}|${p.title}]]` : p.file.link}`,
        extractPathWithoutFileName(p.file.path),
        formatTime(new Date(p.file.mtime)),
        formatDate(new Date(p.file.ctime)) === noteDate ? '✅' : '', // Check if created today,
      ])
    );

    dv.header(3, 'Obsidian Tasks - Created Today');
    const filteredTasks = createdTodayFiles.file.tasks
      .where(t => t)
    
    dv.table(
      ['Task', 'File', 'Path'],
      filteredTasks.map(t => [
        t.text,
        t.link,
      ])
    );

  }
}

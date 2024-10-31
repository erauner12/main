class Periodic {

    pullInlineField(dv, page, fieldName, title) {
        if (page[fieldName]) {
            const items = Array.isArray(page[fieldName]) ? page[fieldName] : [page[fieldName]];
            const nonEmptyItems = items.filter(item => !!item);
            if (nonEmptyItems.length > 0) {
                const listItems = nonEmptyItems.map(item => `- ${item}`).join('\n');
                return `\n**${title}:**\n${listItems}`;
            }
        }
        return ''; // return empty string instead of null
    }


    // TODO: pass the string date. ex:
    // var today = new Date("{{date:YYYY-MM-DD}}");
    pullTodayGoal(dv) {
        const today = dv.luxon.DateTime.now().toISODate();
        // Get the page for today
        const page = dv.page(`Calendar/Daily/${today}.md`);
        // Extract the data for today
        const items = this.pullInlineField(dv, page, "dailygoal", "Today's Goal");
        // Display the data
        if (items) { // check if items is truthy
            return dv.paragraph(items);
        }
        return ''; // return empty string instead of null
    }


    pullYesterdayGoal(dv) {
        const yesterday = dv.luxon.DateTime.now().minus({days: 1}).toISODate();
        // Get the page for yesterday
        const page = dv.page(`Calendar/Daily/${yesterday}.md`);
        // Extract the data for yesterday
        const data = this.pullInlineField(dv, page, "dailygoal", "Yesterday's Goal");
        // Display the data
        if (data) { // check if data is truthy
            return dv.paragraph(data);
        }
        return ''; // return empty string instead of null
    }

    pullWeeklyGoal(dv) { // Get the current date
        const now = dv.luxon.DateTime.now();
        // Get the start of the week (Sunday) (add 1)
        const sunday = now.plus({days: 1}).startOf('week');
        // Get the file path for the weekly note
        const filePath = `Calendar/Weekly/${
            sunday.year
        }-W${
            sunday.weekNumber.toString().padStart(2, '0')
        }.md`;
        console.log(filePath)
        // Get the page for the weekly note
        const page = dv.page(filePath);
        // Extract the data for Sunday
        const data = this.pullInlineField(dv, page, "weeklygoal", "Weekly Goal");
        // Display the data
        if (data) { // check if data is truthy
            return dv.paragraph(data);
        }
        return ''; // return empty string instead of null
    }

    pullMonthlyGoal(dv) {
        const now = dv.luxon.DateTime.now();
        // Get the file path for the monthly note
        const filePath = `Calendar/Monthly/${
            now.toFormat("yyyy-MM")
        }.md`;
        console.log(filePath)
        // Get the page for the monthly note
        const page = dv.page(filePath);
        // Extract the data for the month
        const data = this.pullInlineField(dv, page, "monthlygoal", "Monthly Goal");
        // Display the data
        if (data) { // check if data is truthy
            return dv.paragraph(data);
        }
        return ''; // return empty string instead of null
    }

    pullQuarterlyGoal(dv) {
        const now = dv.luxon.DateTime.now();
        // Get the quarter number
        const quarter = Math.ceil(now.month / 3);
        // Get the file path for the quarterly note
        const filePath = `Calendar/Quarterly/${
            now.year
        }-Q${quarter}.md`;
        console.log(filePath)
        // Get the page for the quarterly note
        const page = dv.page(filePath);
        // Extract the data for the quarter
        const data = this.pullInlineField(dv, page, "quarterlygoal", "Quarterly Goal");
        // Display the data
        if (data) { // check if data is truthy
            return dv.paragraph(data);
        }
        return ''; // return empty string instead of null
    }


    async pullDataviewQuery(dv) {
        const {fieldModifier: f} = app.plugins.plugins["metadata-menu"].api;

        const data = await Promise.all(dv.pages('#daily').filter(p => !p.file.path.includes("_Templates")).map(async p => [
            p.file.link, await f(dv, p, "dailygoal")
        ]));

        return dv.table([
            "File", "Daily Goal",
        ], data.reverse());
    }


}

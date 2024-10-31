class Computed {
    displayObsidianLink(dv, target) {
        return dv.el("div", `[[${target}]]`);
    }

    // Get Custom URL
    displayCustomUrl(dv, target) {
        var title = "";
        var url = "";
        if (target == "raindrop-unsorted") {
            title = "Raindrop Unsorted";
            url = `https://app.raindrop.io/my/-1`;
        } else if (target == "readwise-search") {
            title = "Readwise Search";
            url = `https://readwise.io/search`;
        } else {
            title = "Change Me";
            url = `https://google.com`;
        }
        return dv.el("div", `[${title}](${url})`);
    }
}

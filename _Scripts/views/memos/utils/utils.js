// utils.js

function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}

function formatRelativeTime(timestamp) {
    const currentTime = Date.now();
    const targetTime = new Date(timestamp).getTime();
    const elapsedTime = currentTime - targetTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    const currentDate = new Date(currentTime);
    const targetDate = new Date(targetTime);

    const isSameHour = hours === 0 && currentDate.toDateString() === targetDate.toDateString();
    const isSameDay = currentDate.toDateString() === targetDate.toDateString();
    const isSameWeek = getWeekNumber(currentDate) === getWeekNumber(targetDate);
    const isLastWeek = getWeekNumber(currentDate) - getWeekNumber(targetDate) === 1;
    const isSameMonth = currentDate.getMonth() === targetDate.getMonth() && currentDate.getFullYear() === targetDate.getFullYear();
    const isLastMonth = currentDate.getMonth() - targetDate.getMonth() === 1 || (currentDate.getMonth() === 0 && targetDate.getMonth() === 11 && currentDate.getFullYear() - targetDate.getFullYear() === 1);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const formatDate = (date) => {
        return `(${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)})`;
    };

    if (isSameHour) {
        return `(Today) ${minutes}m ago at ${formatTime(targetDate)}`;
    } else if (isSameDay) {
        return `(Today) ${hours}h ago at ${formatTime(targetDate)}`;
    } else if (days === 1) {
        return `(Yesterday) ${formatTime(targetDate)}`;
    } else if (isSameWeek) {
        return `(This week) ${days}d ago on ${formatWeekday(targetDate)} at ${formatTime(targetDate)}`;
    } else if (isLastWeek) {
        return `(Last week) ${days}d ago on ${formatWeekday(targetDate)} at ${formatTime(targetDate)}`;
    } else if (isSameMonth) {
        return `(This month) ${days}d ago on ${formatWeekday(targetDate)} at ${formatTime(targetDate)}`;
    } else if (isLastMonth) {
        return `(Last month) on ${targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
        if (weeks > 1) {
            return `${weeks}w ago on ${formatWeekday(targetDate)} at ${formatTime(targetDate)} ${formatDate(targetDate)}`;
        } else {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            return `${days}d ago on ${targetDate.toLocaleDateString('en-US', options)}`;
        }
    }
}

function formatWeekday(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date.getDay()];
}

function sortMemosByUpdateTime(memos, showPinnedFirst = false) {
    if (showPinnedFirst) {
        const pinnedMemos = memos.filter(memo => memo.pinned);
        const unpinnedMemos = memos.filter(memo => !memo.pinned);
        pinnedMemos.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
        unpinnedMemos.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
        return [...pinnedMemos, ...unpinnedMemos];
    } else {
        return memos.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
    }
}

function filterMemosByCreationDate(memos, selectedDay) {
    const startOfDay = new Date(selectedDay);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDay);
    endOfDay.setHours(23, 59, 59, 999);

    return memos.filter(memo => {
        const memoCreateTime = new Date(memo.createTime);
        return memoCreateTime >= startOfDay && memoCreateTime <= endOfDay;
    });
}

function filterMemosByModificationDate(memos, selectedDay) {
    const startOfDay = new Date(selectedDay);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDay);
    endOfDay.setHours(23, 59, 59, 999);

    return memos.filter(memo => {
        const memoUpdateTime = new Date(memo.updateTime);
        const memoCreateTime = new Date(memo.createTime);
        return memoUpdateTime >= startOfDay && memoUpdateTime <= endOfDay && memoCreateTime < startOfDay;
    });
}

function sortMemosByUpdateTimeAscending(memos) {
    return memos.sort((a, b) => new Date(a.updateTime) - new Date(b.updateTime));
}

module.exports = {
    formatRelativeTime: formatRelativeTime,
    sortMemosByUpdateTime: sortMemosByUpdateTime,
    filterMemosByCreationDate: filterMemosByCreationDate,
    filterMemosByModificationDate: filterMemosByModificationDate,
    sortMemosByUpdateTimeAscending: sortMemosByUpdateTimeAscending
};

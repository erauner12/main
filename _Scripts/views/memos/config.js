// config.js

const SIDE_MEMOS_API_CONFIG = {
    host: "https://sidememos.erauner.synology.me",
    version: "api/v2",
    token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiZXJhdW5lciIsImlzcyI6Im1lbW9zIiwic3ViIjoiMSIsImF1ZCI6WyJ1c2VyLmFjY2Vzcy10b2tlbiJdLCJpYXQiOjE3MTM2NDMxNTZ9.mq10qVJnIFFHvYab6Un1sQitQyZ1Vj759iNS40AvOTE"
};

const WORK_MEMOS_API_CONFIG = {
    host: "https://workmemos.erauner.synology.me",
    version: "api/v2",
    token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiZXJhdW5lciIsImlzcyI6Im1lbW9zIiwic3ViIjoiMSIsImF1ZCI6WyJ1c2VyLmFjY2Vzcy10b2tlbiJdLCJpYXQiOjE3MTM2NDMyMDl9.GQNa9MFE5sx9xtRonM-Ql1ieVEdDIn4If667Vw2ntOY"
};

const HOME_MEMOS_API_CONFIG = {
    host: "https://homememos.erauner.synology.me",
    version: "api/v2",
    token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiIiwiaXNzIjoibWVtb3MiLCJzdWIiOiIxIiwiYXVkIjpbInVzZXIuYWNjZXNzLXRva2VuIl0sImV4cCI6MTcxNDgzOTQ1MCwiaWF0IjoxNzE0MjM0NjUwfQ.OHEFKvwYJKusqg8g4bFvDfKXlBUuLb1Lw8MJKtYd3Qc"
};

const PERSONAL_MEMOS_API_CONFIG = {
    host: "https://memos.erauner.synology.me",
    version: "api/v2",
    token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiZXJhdW5lciIsImlzcyI6Im1lbW9zIiwic3ViIjoiMSIsImF1ZCI6WyJ1c2VyLmFjY2Vzcy10b2tlbiJdLCJpYXQiOjE3MDc4NTAwODZ9._RF2E87G2CLrUpM2mVbHCfR_9We7UcIVPNuGAuGthAk"
};

const TODOIST_API_CONFIG = {
    host: "https://api.todoist.com",
    version: "rest/v2",
    token: "20fdade709c084c2e255e56e57d0e53370e8283e"
};

module.exports = {
    SIDE_MEMOS_API_CONFIG: SIDE_MEMOS_API_CONFIG,
    WORK_MEMOS_API_CONFIG: WORK_MEMOS_API_CONFIG,
    HOME_MEMOS_API_CONFIG: HOME_MEMOS_API_CONFIG,
    PERSONAL_MEMOS_API_CONFIG: PERSONAL_MEMOS_API_CONFIG,
    TODOIST_API_CONFIG: TODOIST_API_CONFIG
};

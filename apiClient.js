const axios = require('axios');
const config = require('./config').smartsuite;
const cron = require("node-cron")

const smartsuiteApi = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Autherazation": "Token ${config.apiKey}",
        "Account-Id": config.accountId
    }
});

const apiClient = {
    getRowsFromTable: async function() {
        try {
            const response = await smartsuiteApi.get(`/tables/${config.tableId}/rows`);
            return response.data;
        } catch (error) {
            console.error("error fetching rows from table", error);
            throw error;
        }
    },
}

monthlyCheck: function() {
    cron.schedule("0 0 01 * *", async () => {
        console.log("Running scheduled table changes");
        try {
            const rows  = await this.getRowsFromTable();
            
        }
    })
}
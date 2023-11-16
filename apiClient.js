const axios = require('axios');
const config = require('./config').smartsuite;

const smartsuiteApi = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Autheraization": "Token ${config.apiKey}",
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

module.exports = apiClient;
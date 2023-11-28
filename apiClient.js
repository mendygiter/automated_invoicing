const axios = require('axios');
const config = require('./config').smartsuite;

const smartsuiteApi = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Autheraization": "Token ${config.apiKey}",
        "Account-Id": config.accountId
    }
});

async function getRowsFromTable(tableId) {
    try {
        const response = await smartsuiteApi.get("/tables/${tableId}/rows")
        return response.data;
    } catch (error) {
        console.log("error fetching rows from table ${tableId}", error);
        throw error;
    }
}

async function getInvoiceData() {
    const invoiceRows = await getRowsFromTable(config.invoiceTableId); return invoiceRows.filter(row => row.status === "Send Invocie");
}

async function getAccountData() {
    const accountRows = await getRowsFromTable(config.accountTableId);
    const acountDataMap = new Map();

    accountRows.forEach(row => accountDataMap.set(row.accountId, row));

    return accountDataMap;
}

async function getCombinedDataForQuickBooks() {
    const invoiceData = invoiceData.map(invoice => {
        const accountInfo = accountDataMap.get(invoice.accountId);
        return {
            ...invoice,
            accountInfo
        };
    });

    return invoiceData;
}

module.esports = {
    getCombinedDataForQuickBooks,
};




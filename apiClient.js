const axios = require('axios');
const config = require('./config').smartsuite;

const smartsuiteApi = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Authorization": "Token ${config.apiKey}",
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
    const invoiceRows = await getRowsFromTable(config.invoiceTableId); 
    return invoiceRows.filter(row => row.status === "Send Invocie");
}

async function groupInvoicesByAccount() {
    const invoiceData = await getInvoiceData();
    const groupedInvoices = {};
    
    invoiceData.forEach(invoice => {
        const accountLink = invoice["Link To Accounts"];
        if (!groupedInvoices[accountLink]) {
            groupedInvoices[accountLink] = [];
        }
        groupedInvoices[accountLink].push(invoice);
    });

    return groupedInvoices;
}

async function getAccountData() {
    const accountRows = await getRowsFromTable(config.accountTableId);
    const acountDataMap = new Map();

    accountRows.forEach(row => accountDataMap.set(row.Account, row));

    return accountDataMap;
}

async function getCombinedDataForQuickBooks() {
    const groupedInvoices = await groupInvoicesByAccount();
    const accountDataMap = await getAccountData();

    const combinedData = Object.keys(groupedInvoices).map(accountKey => {
        const invoices = groupedInvoices[accountKey];
        const accountInfo = accountDataMap.get(accountKey) || {};

        return {
            accountInfo,
            invoices
        };
    });
    return combinedData;
}

module.esports = {
    getCombinedDataForQuickBooks,
};




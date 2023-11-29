require("dotenv").config();

module.exports = { 
    smartsuite: {
        accountId: process.env.Account_ID,
        apiKey: process.env.smartsuite_Private_Key,
        invoiceTableID: process.env.INVOICE_TABLE_ID,
        accountTableID: process.env.ACCOUNT_TABLE_ID,
    },
    pdf: {
        templatePath: process.env.TEMPLATE,
    }
};
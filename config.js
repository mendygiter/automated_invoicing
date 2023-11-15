require("dotenv").config();

module.exports = { 
    smartsuite: {
        accountId: process.env.Account_ID,
        apiKey: process.env.smartsuite_Private_Key,
        tableId: process.env.Table_ID,
    },
    pdf: {
        templatePath: process.env.TEMPLATE,
    }
};
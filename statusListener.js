const apiClient = require("./apiClient");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

function checkForStatusUpdate() {
    apiClient.getRowsFromTable()
    .then(rows => {
        const rowsToSendInvoice = rows.filter(row => row.status === "send invoice");

        if (rowsToSendInvoice.length > 0) {
            console.log("Found ${rowsToSendInvoice.length} rows to proccess");
            saveRowsAsJson(rowsToSendInvoice)
        } else {
            console.log("no new rows to proccess");
        }
    })

    .catch(error => {
        console.error("Error in checking for status update:", error);
    });

    function saveRowsAsJson(rows) {
        const filePath = path.join(__dirname, "rowsToSendInvoice.json");
        fs.writeFile(filePath, JSON.stringify(rows, null, 2), err => {
            
        })
    }
}
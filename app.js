const schedule = require("node-schedule");
const proccessManager = require("/proccessManager");

schedule.scheduleJob("0 0 1, 10, 20 * *", () => {console.log("scheduled proccess starting.");
proccessManager.runProccess();

});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
let lunarPayment = new client_1.LunarPaymentClient({
    appKey: "e2f19bda-98e1-4490-848f-faf2eb456fc5"
});
async function run() {
    let merchant = await lunarPayment.getMerchant();
    console.log("Merchant ID", merchant.id);
    console.log("Merchant name", merchant.name);
    let identity = await lunarPayment.getIdentity();
    console.log("Identity ID", identity.id);
    let result = await lunarPayment.transactions.fetch("6335fdf119fc1256f3f08d47");
    console.log("result", JSON.stringify(result, null, 4));
    let lines = await lunarPayment.lines.fetch("6338c57dd5048f7898c62989");
    console.log("lines", JSON.stringify(lines, null, 4));
}
run();

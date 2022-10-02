"use strict";
let paylike = require('paylike')("e2f19bda-98e1-4490-848f-faf2eb456fc5");
const merchantId = "62e14669cec418671e038cc4";
async function run() {
    // stream all transactions to a HTTP response (interop with a classic Node.js
    // stream)
    var toStream = require('pull-stream-to-stream');
    let JSONStream = require('JSONStream');
    let es = require('event-stream');
    toStream(paylike.merchants.transactions.find(merchantId).since(new Date()).keepAlive())
        .pipe(JSONStream.stringify())
        .pipe(es.mapSync(function (data) {
        console.log("data: ", data);
        return data;
    }));
}
run();

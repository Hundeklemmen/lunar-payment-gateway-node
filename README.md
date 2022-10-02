# Lunar Payments
3rd party Node.js api client to community with the Danish payment gateway `Lunar Online Payments` https://lunar.app/

## Installation
```bash
npm i lunar-payments --save
```

## Example
```ts
import { LunarPaymentClient } from "lunar-payments";
// or
const { LunarPaymentClient } = require("lunar-payments").default;

let lunarPayment = new LunarPaymentClient({
    appKey: "",
    merchantId: "", // Optional, it will be fetched from Lunar and cached if not provided
});

const transactionID = "Transaction ID here";
const lineID = "Line ID here";



let merchant = await lunarPayment.getMerchant();
console.log("Merchant ID", merchant.id);
console.log("Merchant name", merchant.name);


let identity = await lunarPayment.getIdentity();
console.log("Identity ID", identity.id);


let transaction = await lunarPayment.transactions.fetch(transactionID);

console.log("result", transaction)


let lines = await lunarPayment.lines.fetch(lineID);
console.log("lines", lines)
```


### Where to find appKey?
You can find the appKey in your Lunar busness account dashboard. Go to Online Payments -> Complete your registration -> App Key


### Where to find merchantId?
*It is recommended that you provide the merchantId in the constructor of the LunarPaymentClient, so the client does not have to fetch it from Lunar every time the client is instantiated.*

Easiest way to retrieve the merchantId is by using the `getMerchant` method. The method will return the merchant object, which contains the merchantId.

```ts
let merchant = await lunarPayment.getMerchant();
console.log("Merchant ID", merchant.id);
```

### Supported features
- [x] Transactions
    - [x] List transactions
    - [x] Fetch transaction
    - [x] Capture transaction
    - [x] Refund transaction
    - [x] Void transaction
- [x] Lines
    - [x] List lines
    - [x] Fetch line
- [x] Fetch identity
- [x] Fetch merchant


### Suggestions
If you have any suggestions, please create an issue or a pull request.
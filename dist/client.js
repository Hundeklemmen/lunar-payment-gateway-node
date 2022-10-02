"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarPaymentClient = void 0;
const undici_1 = require("undici");
const pagination_1 = require("./pagination");
const lines_1 = require("./lines");
const transactions_1 = require("./transactions");
class LunarPaymentClient {
    constructor(options) {
        this.base = LunarPaymentClient.API_BASE;
        Object.assign(this, options);
        this.transactions = new transactions_1.Transactions(this);
        this.lines = new lines_1.Lines(this);
    }
    async _request(endpoint, options = {}, pagination) {
        var _a;
        if (pagination) {
            let pag = new pagination_1.Pagination().sanitize(pagination);
            let query = new URLSearchParams(Object.entries(pag)
                .filter(([_k, v]) => v !== undefined)
                .map(([k, v]) => ([k, v.toString()])));
            endpoint += `?${query.toString()}`;
        }
        const headers = new undici_1.Headers((_a = options.headers) !== null && _a !== void 0 ? _a : {});
        headers.append("Authorization", `Basic ${Buffer.from(":" + this.appKey).toString("base64")}`);
        options.headers = headers;
        console.log("Request", this.base + endpoint, options);
        const result = await (0, undici_1.fetch)(this.base + endpoint, options);
        let data = await result.json();
        console.log("Data");
        return data;
    }
    /*
        Identity
    */
    async getIdentity() {
        if (this.identity)
            return this.identity;
        const { identity } = await this._request("me");
        this.identity = identity;
        return identity;
    }
    /*
        Merchant
    */
    async getMerchant() {
        if (this.merchant)
            return this.merchant;
        const identityInformation = await this.getIdentity();
        let merchants = await this._request(`identities/${identityInformation.id}/merchants?limit=1`);
        let merchantData = merchants[0];
        if (!merchantData)
            throw new Error("No merchant found");
        this.merchant = merchantData;
        this.merchantId = merchantData.id;
        return merchantData;
    }
    async getMerchantId() {
        if (this.merchantId)
            return this.merchantId;
        const merchant = await this.getMerchant();
        return merchant.id;
    }
}
exports.LunarPaymentClient = LunarPaymentClient;
LunarPaymentClient.API_BASE = "https://api.paylike.io/";

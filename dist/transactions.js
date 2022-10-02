"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const undici_1 = require("undici");
class Transactions {
    constructor(client) {
        this.client = client;
    }
    ;
    async _request(id, type, options, requirements = []) {
        var _a;
        const requestOptions = options;
        if (!requirements.every(requirement => requirement in options)) {
            const transaction = await this.fetch(id);
            for (const requirement of requirements) {
                (_a = requestOptions[requirement]) !== null && _a !== void 0 ? _a : (requestOptions[requirement] = transaction[requirement]);
            }
        }
        const { transaction } = await this.client._request("transactions/" + id + "/" + type, {
            method: "POST",
            headers: new undici_1.Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(requestOptions)
        });
        return transaction;
    }
    async list(options) {
        const merchantId = await this.client.getMerchantId();
        return await this.client._request(`merchants/${merchantId}/transactions`, {
            method: "GET"
        }, options);
    }
    async fetch(id) {
        const { transaction } = await this.client._request("transactions/" + id, {
            method: "GET"
        });
        return transaction;
    }
    capture(id, options = {}) {
        return this._request(id, "captures", options, ["amount", "currency", "descriptor"]);
    }
    refund(id, options = {}) {
        return this._request(id, "refunds", options, ["amount", "descriptor"]);
    }
    void(id, options = {}) {
        return this._request(id, "voids", options, ["amount"]);
    }
}
exports.Transactions = Transactions;

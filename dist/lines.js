"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lines = void 0;
class Lines {
    constructor(client) {
        this.client = client;
    }
    ;
    async list(options) {
        const merchantId = await this.client.getMerchantId();
        if (!options.limit)
            options.limit = 50;
        return await this.client._request(`merchants/${merchantId}/lines`, {
            method: "GET"
        }, options);
    }
    async fetch(id) {
        const { line } = await this.client._request("lines/" + id, {
            method: "GET"
        });
        return line;
    }
}
exports.Lines = Lines;

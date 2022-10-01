import { Headers } from "undici";
import type { LunarPaymentClient } from "./client";
import type { PaginationOptions } from "./payloads/pagination";
import type { GetTransactionsResponse, GetTransactionResponse, CaptureOptions, RefundOptions, VoidOptions, Transaction } from "./payloads/transactions";

export class Transactions {
    constructor(private client: LunarPaymentClient) {};

    async _request<Options>(id: string, type: string, options: Options, requirements: (keyof Transaction)[] = []) {
        const requestOptions: any = options;
        if (!requirements.every(requirement => requirement in options)) {
            const transaction = await this.fetch(id);

            for (const requirement of requirements) {
                requestOptions[requirement] ??= transaction[requirement];
            }
        }

        const { transaction } = await this.client._request<GetTransactionResponse>("transactions/" + id + "/" + type, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(requestOptions)
        });
        return transaction;
    }

    async list(options: PaginationOptions) {
        const merchantId = await this.client.getMerchantId();
        return await this.client._request<GetTransactionsResponse>(`merchants/${merchantId}/transactions`, {
            method: "GET"
        }, options);
    }

    async fetch(id: string) {
        const { transaction } = await this.client._request<GetTransactionResponse>("transactions/" + id, {
            method: "GET"
        });
        return transaction;
    }

    capture(id: string, options: CaptureOptions = {}) {
        return this._request(id, "captures", options, ["amount", "currency", "descriptor"]);
    }

    refund(id: string, options: RefundOptions = {}) {
        return this._request(id, "refunds", options, ["amount", "descriptor"]);
    }

    void(id: string, options: VoidOptions = {}) {
        return this._request(id, "voids", options, ["amount"]);
    }
}

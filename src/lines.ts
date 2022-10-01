import type { LunarPaymentClient } from "./client";
import type { PaginationOptions } from "./payloads/pagination";
import type { LineOptions, GetLinesResponse, GetLineResponse } from "./payloads/lines";

export class Lines {
    constructor(private client: LunarPaymentClient) {};


    async list(options: LineOptions) {
        const merchantId = await this.client.getMerchantId();
        if(!options.limit) options.limit = 50;
        return await this.client._request<GetLinesResponse>(`merchants/${merchantId}/lines`, {
            method: "GET"
        }, options as PaginationOptions);
    }

    async fetch(id: string) {
        const { line } = await this.client._request<GetLineResponse>("lines/" + id, {
            method: "GET"
        });
        return line;
    }
}

import { fetch, Headers, type RequestInit } from "undici";
import { Pagination } from "./pagination";
import type { GetIdentityResponse, Identity } from "./payloads/identity";
import type { GetMerchantsResponse, Merchant } from "./payloads/merchants";
import type { PaginationOptions } from "./payloads/pagination";
import { Lines } from "./lines";
import { Transactions } from "./transactions";

export class LunarPaymentClient implements LunarPaymentClientOptions {
    public readonly base = LunarPaymentClient.API_BASE;
    public identity?: Identity;
    public merchant?: Merchant;
    public merchantId?: string;
    public readonly appKey!: string;
    public readonly transactions: Transactions;
    public readonly lines: Lines;

    static API_BASE = "https://api.paylike.io/";

    constructor(options: LunarPaymentClientOptions) {
        Object.assign(this, options);
        this.transactions = new Transactions(this);
        this.lines = new Lines(this);
    }

    async _request<Response>(endpoint: string, options: RequestInit = {}, pagination?: PaginationOptions): Promise<Response> {
        if(pagination) {
            let pag = new Pagination().sanitize(pagination);

            let query = new URLSearchParams(
                Object.entries(pag)
                    .filter(([_k, v]) => v !== undefined)
                    .map(([k, v]) => ([k, v!.toString()]))
            );
            endpoint += `?${query.toString()}`
        }
        
        const headers = new Headers(options.headers ?? {});
        headers.append("Authorization", `Basic ${Buffer.from(":"+this.appKey).toString("base64")}`)
        options.headers = headers;

        console.log("Request", this.base + endpoint, options)
        const result = await fetch(this.base + endpoint, options);
        let data = await result.json() as Promise<Response>;

        console.log("Data")
        return data;
    }

    /*
        Identity
    */

    async getIdentity(): Promise<Identity> {
        if (this.identity) return this.identity;
        const { identity } = await this._request<GetIdentityResponse>("me")
        this.identity = identity;
        return identity;
    }

    /*
        Merchant
    */

    async getMerchant(): Promise<Merchant> {
        if (this.merchant) return this.merchant;
        const identityInformation = await this.getIdentity();
        
        let merchants = await this._request<GetMerchantsResponse>(`identities/${identityInformation.id}/merchants?limit=1`); 
        let merchantData = merchants[0];
        if (!merchantData) throw new Error("No merchant found");
        this.merchant = merchantData;
        this.merchantId = merchantData.id;
        return merchantData;
    }

    async getMerchantId() {
        if (this.merchantId) return this.merchantId;

        const merchant = await this.getMerchant();
        return merchant.id;
    }
}

export interface LunarPaymentClientOptions {
    merchantId?: string;
    appKey: string;
}

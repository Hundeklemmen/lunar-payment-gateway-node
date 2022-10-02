import { type RequestInit } from "undici";
import type { Identity } from "./payloads/identity";
import type { Merchant } from "./payloads/merchants";
import type { PaginationOptions } from "./payloads/pagination";
import { Lines } from "./lines";
import { Transactions } from "./transactions";
export declare class LunarPaymentClient implements LunarPaymentClientOptions {
    readonly base: string;
    identity?: Identity;
    merchant?: Merchant;
    merchantId?: string;
    readonly appKey: string;
    readonly transactions: Transactions;
    readonly lines: Lines;
    static API_BASE: string;
    constructor(options: LunarPaymentClientOptions);
    _request<Response>(endpoint: string, options?: RequestInit, pagination?: PaginationOptions): Promise<Response>;
    getIdentity(): Promise<Identity>;
    getMerchant(): Promise<Merchant>;
    getMerchantId(): Promise<string>;
}
export interface LunarPaymentClientOptions {
    merchantId?: string;
    appKey: string;
}
//# sourceMappingURL=client.d.ts.map
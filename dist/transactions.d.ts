import type { LunarPaymentClient } from "./client";
import type { PaginationOptions } from "./payloads/pagination";
import type { GetTransactionsResponse, CaptureOptions, RefundOptions, VoidOptions, Transaction } from "./payloads/transactions";
export declare class Transactions {
    private client;
    constructor(client: LunarPaymentClient);
    _request<Options>(id: string, type: string, options: Options, requirements?: (keyof Transaction)[]): Promise<Transaction>;
    list(options: PaginationOptions): Promise<GetTransactionsResponse>;
    fetch(id: string): Promise<Transaction>;
    capture(id: string, options?: CaptureOptions): Promise<Transaction>;
    refund(id: string, options?: RefundOptions): Promise<Transaction>;
    void(id: string, options?: VoidOptions): Promise<Transaction>;
}
//# sourceMappingURL=transactions.d.ts.map
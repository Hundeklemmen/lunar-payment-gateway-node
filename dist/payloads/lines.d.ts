export declare type GetLinesResponse = Line[];
export interface GetLineResponse {
    line: Line;
}
export interface LineOptions {
    limit?: number;
}
export interface Line {
    id: string;
    created: string;
    merchantId: string;
    balance: number;
    fee: number;
    transactionId: string;
    amount: Amount;
    capture: boolean;
    test: boolean;
}
export interface Amount {
    amount: number;
    currency: string;
}
//# sourceMappingURL=lines.d.ts.map
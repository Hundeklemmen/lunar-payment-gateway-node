export interface GetTransactionResponse {
    transaction: Transaction;
}

export type GetTransactionsResponse = Transaction[];

export interface Transaction {
    id: string;
    test: boolean;
    merchantId: string;
    created: string;
    amount: number;
    refundedAmount: number;
    capturedAmount: number;
    voidedAmount: number;
    pendingAmount: number;
    disputedAmount: number;
    card: Card;
    tds: string;
    currency: string;
    custom: Custom;
    recurring: boolean;
    successful: boolean;
    error: boolean;
    descriptor: string;
    trail: TrailItem[];
}

export interface Card {
    bin: string;
    last4: string;
    expiry: string;
    code: Code;
    scheme: string;
}

export interface Code {
    present: boolean;
    matches: null;
}

export interface Custom {
    name: string;
    amount: string;
}

export interface TrailItem {
    fee: Fee;
    amount: number;
    balance: number;
    created: string;
    capture: boolean;
    descriptor: string;
    lineId: string;
}

export interface Fee {
    flat: number;
    rate: number;
}




export interface CaptureOptions {
    amount?: number;
    currency?: string;
    descriptor?: string;
}

export interface RefundOptions {
    amount?: number;
    descriptor?: string;
}

export interface VoidOptions {
    amount?: number;
}
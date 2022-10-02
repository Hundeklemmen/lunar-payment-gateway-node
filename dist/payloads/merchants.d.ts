export interface GetMerchantsRequest {
    limit: number;
}
export declare type GetMerchantsResponse = Merchant[];
export interface Merchant {
    id: string;
    created: string;
    name: string;
    currency: string;
    test: boolean;
    key: string;
    descriptor: string;
    website: string;
    email: string;
    company: Company;
    claim: Claim;
    balance: number;
    bank: Bank;
    pricing: Pricing;
    tds: Tds;
    minBalance: number;
}
export interface Company {
    country: string;
    number: string;
}
export interface Claim {
    canVoid: boolean;
    canCapture: boolean;
    canRefund: boolean;
}
export interface Bank {
    iban: string;
}
export interface Pricing {
    flat: Flat;
    rate: number;
    dispute: Dispute;
    transfer: Transfer;
}
export interface Flat {
    currency: string;
    amount: number;
}
export interface Dispute {
    currency: string;
    amount: number;
}
export interface Transfer {
    toCard: ToCard;
}
export interface ToCard {
    flat: Flat;
    rate: number;
}
export interface Tds {
    mode: string;
}
//# sourceMappingURL=merchants.d.ts.map
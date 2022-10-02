import type { LunarPaymentClient } from "./client";
import type { LineOptions, GetLinesResponse } from "./payloads/lines";
export declare class Lines {
    private client;
    constructor(client: LunarPaymentClient);
    list(options: LineOptions): Promise<GetLinesResponse>;
    fetch(id: string): Promise<import("./payloads/lines").Line>;
}
//# sourceMappingURL=lines.d.ts.map
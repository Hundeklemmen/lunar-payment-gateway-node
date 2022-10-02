import type { PaginationOptions } from "./payloads/pagination";
import ObjectID from "bson-objectid";
export declare class Pagination {
    constructor();
    convertDate(date: Date | string): string | ObjectID;
    sanitize(options: PaginationOptions): {
        limit: number;
        after: string | ObjectID | undefined;
        before: string | ObjectID | undefined;
    };
}
//# sourceMappingURL=pagination.d.ts.map
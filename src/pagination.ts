import type { PaginationOptions } from "./payloads/pagination";
import ObjectID from "bson-objectid";

export class Pagination {
    constructor() {};


    convertDate(date: Date | string) {
        if (typeof date === "string") return date;
        else if (date instanceof Date) return ObjectID.createFromTime(date.getTime() / 1000);
        else throw new Error("Invalid date");
    }

    sanitize(options: PaginationOptions) {
        const after = options.after ? this.convertDate(options.after) : undefined
        const before = options.before ? this.convertDate(options.before) : undefined;
        return {
            limit: options.limit,
            after,
            before
        }

    }
}

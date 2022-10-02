"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const tslib_1 = require("tslib");
const bson_objectid_1 = tslib_1.__importDefault(require("bson-objectid"));
class Pagination {
    constructor() { }
    ;
    convertDate(date) {
        if (typeof date === "string")
            return date;
        else if (date instanceof Date)
            return bson_objectid_1.default.createFromTime(date.getTime() / 1000);
        else
            throw new Error("Invalid date");
    }
    sanitize(options) {
        const after = options.after ? this.convertDate(options.after) : undefined;
        const before = options.before ? this.convertDate(options.before) : undefined;
        return {
            limit: options.limit,
            after,
            before
        };
    }
}
exports.Pagination = Pagination;

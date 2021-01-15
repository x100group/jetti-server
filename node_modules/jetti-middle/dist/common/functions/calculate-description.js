"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateDescription(description, date, code, group = '') {
    const Group = group ? '(' + group + ')' : '';
    const value = `${description} ${Group} #${code}, ${date ?
        new Date(date).toISOString() :
        (new Date()).toISOString()}`;
    return value;
}
exports.calculateDescription = calculateDescription;
//# sourceMappingURL=calculate-description.js.map
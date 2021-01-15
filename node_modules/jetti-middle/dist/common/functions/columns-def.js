"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_list_1 = require("../classes/form-list");
exports.NUMBER_STYLE = { 'width': '100px', 'text-align': 'right' };
exports.BOOLEAN_STYLE = { 'width': '90px', 'text-align': 'center' };
exports.DATETIME_STYLE = { 'width': '135px', 'text-align': 'center' };
exports.DEFAULT_STYLE = { 'width': '200px', 'min-width': '200px', 'max-width': '200px' };
exports.ENUM_STYLE = { 'width': '170px' };
function buildColumnDef(view, settings) {
    const columnDef = [];
    Object.keys(view).filter(property => view[property] && view[property]['type'] !== 'table').map((field) => {
        const prop = view[field];
        const hidden = !!prop['hiddenInList'] || !!prop['hidden'];
        const order = hidden ? -1 : prop['order'] * 1 || 999;
        const label = (prop['label'] || field.toString()).toLowerCase();
        const type = prop['type'] || 'string';
        const readOnly = !!prop['readOnly'];
        const required = !!prop['required'];
        const owner = prop['owner'] || null;
        const totals = prop['totals'] * 1;
        let style = prop['style'];
        if (type === 'number' && !style)
            style = exports.NUMBER_STYLE;
        else if (type === 'boolean' && !style)
            style = exports.BOOLEAN_STYLE;
        else if (type === 'datetime' && !style)
            style = exports.DATETIME_STYLE;
        else if (type === 'enum' && !style)
            style = exports.ENUM_STYLE;
        let value = prop['value'];
        if (type === 'enum') {
            value = [{ label: '', value: null }, ...(value || []).map((el) => ({ label: el, value: el }))];
        }
        style = style || exports.DEFAULT_STYLE;
        columnDef.push({
            field, type, label, hidden, order, style, required, readOnly, totals, owner, value,
            filter: settings.filter.find(f => f.left === field) || new form_list_1.FormListFilter(field),
            sort: settings.order.find(f => f.field === field) || new form_list_1.FormListOrder(field),
            headerStyle: Object.assign(Object.assign({}, style), { 'text-align': 'center' })
        });
    });
    columnDef.filter(c => c.type === 'string').forEach(c => c.filter.center = 'like');
    return columnDef.sort((a, b) => a.order - b.order);
}
exports.buildColumnDef = buildColumnDef;
//# sourceMappingURL=columns-def.js.map
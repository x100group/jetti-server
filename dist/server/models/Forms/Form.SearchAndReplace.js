"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.FormSearchAndReplace = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let FormSearchAndReplace = class FormSearchAndReplace extends jetti_middle_1.FormBase {
    constructor() {
        super(...arguments);
        this.OldValue = null;
        this.OldValueExchangeCode = '';
        this.OldValueExchangeBase = '';
        this.NewValue = null;
        this.NewValueExchangeCode = '';
        this.NewValueExchangeBase = '';
        this.ReplaceExchangeCode = false;
        this.SearchResult = [new SearchResult()];
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'Types.Catalog', label: 'Searched value' }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "OldValue", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Old value exchange code', readOnly: true }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "OldValueExchangeCode", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Old value exchange base', readOnly: true }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "OldValueExchangeBase", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Types.Catalog', label: 'New value' }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "NewValue", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'New value exchange code', readOnly: true }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "NewValueExchangeCode", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'New value exchange base', readOnly: true }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "NewValueExchangeBase", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Replace exchange code' }),
    __metadata("design:type", Object)
], FormSearchAndReplace.prototype, "ReplaceExchangeCode", void 0);
__decorate([
    jetti_middle_2.Props({
        type: 'table', label: 'Search result', readOnly: true,
    }),
    __metadata("design:type", Array)
], FormSearchAndReplace.prototype, "SearchResult", void 0);
FormSearchAndReplace = __decorate([
    jetti_middle_1.JForm({
        type: 'Form.SearchAndReplace',
        description: 'Search and replace',
        icon: 'fab fa-searchengin',
        menu: 'Search & replace',
    })
], FormSearchAndReplace);
exports.FormSearchAndReplace = FormSearchAndReplace;
class SearchResult {
    constructor() {
        this.Source = '';
        this.Type = '';
        this.Records = 0;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], SearchResult.prototype, "Source", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Type' }),
    __metadata("design:type", Object)
], SearchResult.prototype, "Type", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', totals: 1 }),
    __metadata("design:type", Object)
], SearchResult.prototype, "Records", void 0);
exports.SearchResult = SearchResult;
//# sourceMappingURL=Form.SearchAndReplace.js.map
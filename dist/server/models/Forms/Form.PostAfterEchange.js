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
exports.PostAfterEchange = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let PostAfterEchange = class PostAfterEchange extends jetti_middle_1.FormBase {
    constructor() {
        super(...arguments);
        this.company = null;
        this.StartDate = null;
        this.EndDate = null;
        this.Operation = null;
        this.rePost = false;
        this.Companys = [new CompanyRow()];
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Company', order: 1 }),
    __metadata("design:type", Object)
], PostAfterEchange.prototype, "company", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'date', order: 2 }),
    __metadata("design:type", Object)
], PostAfterEchange.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'date', order: 3 }),
    __metadata("design:type", Object)
], PostAfterEchange.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Operation', order: 4 }),
    __metadata("design:type", Object)
], PostAfterEchange.prototype, "Operation", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', order: 5 }),
    __metadata("design:type", Object)
], PostAfterEchange.prototype, "rePost", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table' }),
    __metadata("design:type", Array)
], PostAfterEchange.prototype, "Companys", void 0);
PostAfterEchange = __decorate([
    jetti_middle_1.JForm({
        type: 'Form.PostAfterEchange',
        description: 'Post after IIKO',
        icon: 'fas fa-hammer',
        menu: 'Post after IIKO'
    })
], PostAfterEchange);
exports.PostAfterEchange = PostAfterEchange;
class CompanyRow {
    constructor() {
        this.company = null;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Company', order: 1 }),
    __metadata("design:type", Object)
], CompanyRow.prototype, "company", void 0);
//# sourceMappingURL=Form.PostAfterEchange.js.map
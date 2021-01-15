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
exports.CatalogForms = void 0;
const jetti_middle_1 = require("jetti-middle");
const form_factory_1 = require("../Forms/form.factory");
let CatalogForms = class CatalogForms extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
    }
    QueryList() {
        const list = [];
        form_factory_1.RegisteredForms.forEach(el => {
            const f = new el();
            list.push({ type: f.type, description: f.Prop().description });
        });
        return jetti_middle_1.buildSubcountQueryList(list);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Forms', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogForms.prototype, "parent", void 0);
CatalogForms = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Forms',
        description: 'Form types',
        icon: '',
        menu: 'Form types',
    })
], CatalogForms);
exports.CatalogForms = CatalogForms;
//# sourceMappingURL=Catalog.Forms.js.map
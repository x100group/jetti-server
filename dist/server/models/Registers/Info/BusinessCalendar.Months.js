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
exports.RegisterInfoBusinessCalendarMonths = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoBusinessCalendarMonths = class RegisterInfoBusinessCalendarMonths extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.BusinessCalendar = null;
        this.TotalDay = '';
        this.WorkDay = '';
        this.WorkHours40 = '';
        this.WorkHours36 = '';
        this.WorkHours24 = '';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessCalendar', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "BusinessCalendar", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true, resource: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "TotalDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true, resource: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "WorkDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "WorkHours40", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "WorkHours36", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoBusinessCalendarMonths.prototype, "WorkHours24", void 0);
RegisterInfoBusinessCalendarMonths = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.BusinessCalendar.Months',
        description: 'Business calendar (months)',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoBusinessCalendarMonths);
exports.RegisterInfoBusinessCalendarMonths = RegisterInfoBusinessCalendarMonths;
//# sourceMappingURL=BusinessCalendar.Months.js.map
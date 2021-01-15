"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBusinessProcessTasks = void 0;
const jetti_middle_1 = require("jetti-middle");
let FormBusinessProcessTasks = class FormBusinessProcessTasks extends jetti_middle_1.FormBase {
};
FormBusinessProcessTasks = __decorate([
    jetti_middle_1.JForm({
        type: 'Form.BusinessProcessTasks',
        description: 'Мои задачи',
        icon: 'fas fa-tasks',
        menu: 'Список задач',
    })
], FormBusinessProcessTasks);
exports.FormBusinessProcessTasks = FormBusinessProcessTasks;
//# sourceMappingURL=Form.BusinessProcessTasks.js.map
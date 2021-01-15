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
exports.FormQueueManager = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let FormQueueManager = class FormQueueManager extends jetti_middle_1.FormBase {
    constructor() {
        super(...arguments);
        this.company = null;
        this.StartDate = null;
        this.EndDate = null;
        this.Status = 'all';
        this.QueueId = 'JETTI';
        this.Repeatable = [new Repeatable()];
        this.CustomTask = null;
        this.MethodName = 'executeTask';
        this.CronExpression = '';
        this.Delay = 0;
        this.Every = 0;
        this.JobName = '';
        this.Attempts = 3;
        this.JobsStat = [new JobsStat()];
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Company', order: 1, hidden: true }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "company", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'date', order: 2, label: 'Начало', panel: 'Журнал задач' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'date', order: 3, label: 'Окончание', panel: 'Журнал задач' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'enum', order: 4, label: 'Состояние', value: ['all', 'completed', 'waiting', 'active', 'delayed', 'failed'], panel: 'Журнал задач' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "Status", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'enum', order: 4, label: 'Очередь', value: ['JETTI', 'IS'], panel: 'Журнал задач' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "QueueId", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', label: 'Повторяющиеся', panel: 'Повторяющиеся' }),
    __metadata("design:type", Array)
], FormQueueManager.prototype, "Repeatable", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Document.Operation', order: 6, label: 'Задание', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "CustomTask", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', order: 7, label: 'Имя метода', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "MethodName", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', order: 8, label: 'Расписание (Cron expression)', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "CronExpression", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', order: 9, label: 'Начать через # минут', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "Delay", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', order: 9, label: 'Повторять каждые # минут', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "Every", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', order: 9, label: 'Наименование', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "JobName", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', order: 9, label: 'Попыток', panel: 'Новая задача' }),
    __metadata("design:type", Object)
], FormQueueManager.prototype, "Attempts", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Журнал задач' }),
    __metadata("design:type", Array)
], FormQueueManager.prototype, "JobsStat", void 0);
FormQueueManager = __decorate([
    jetti_middle_1.JForm({
        type: 'Form.QueueManager',
        description: 'Queue manager',
        icon: 'fas fa-hammer',
        menu: 'Queue manager'
    })
], FormQueueManager);
exports.FormQueueManager = FormQueueManager;
class JobsStat {
    constructor() {
        this.selected = '';
        this.status = '';
        this.description = '';
        this.id = '';
        this.progress = 0;
        this.processedOn = '';
        this.finishedOn = '';
        this.duration = '';
        this.code = '';
        this.jobid = '';
        this.cron = '';
        this.attempts = '';
        this.info = '';
        this.TaskOperation = '';
        this.failedReason = '';
        // status
        // progress,
        // attemptsMade,
        // failedReason,
        // progressOn,
        // finishedOn
        // durationSeconds, user,
        // processId,
        // TaskOperation,
        // id,
        // description,
        // jobid,
        // delay,
        // attempts,
        // count,
        // cron,
        // startDate
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: ' ' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "selected", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Состояние' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "status", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Наименование' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "description", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Вид задачи' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "id", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', readOnly: true, label: 'Выполнено, %' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "progress", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'datetime', readOnly: true, label: 'Начало' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "processedOn", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'datetime', readOnly: true, label: 'Завершение' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "finishedOn", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Продолжительность' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "duration", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Код (внутр)' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "code", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'ID (внутр)' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "jobid", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Cron' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "cron", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', readOnly: true, label: 'Попыток' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "attempts", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Описание' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "info", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Document.Operation', readOnly: true, label: 'Операция' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "TaskOperation", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Текст ошибки' }),
    __metadata("design:type", Object)
], JobsStat.prototype, "failedReason", void 0);
class Repeatable {
    constructor() {
        this.flag = false;
        this.name = '';
        this.next = null;
        this.cron = '';
        this.endDate = null;
        this.everyMin = 0;
        this.everyString = '';
        this.info = '';
        this.id = '';
        this.key = '';
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Пометка' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "flag", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Наименование' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "name", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'datetime', label: 'Следующее' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "next", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Расписание (Cron expression)' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "cron", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'datetime', label: 'Дата окончания' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "endDate", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number', label: 'Каждые # мин' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "everyMin", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', label: 'Повторять через' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "everyString", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Описание' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "info", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "id", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Repeatable.prototype, "key", void 0);
//# sourceMappingURL=Form.QueueManager.js.map
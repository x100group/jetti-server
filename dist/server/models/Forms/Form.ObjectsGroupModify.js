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
exports.ColumnMatching = exports.PropSettings = exports.ObjectsList = exports.SelectedObject = exports.ErrorRow = exports.RecieverProp = exports.FormObjectsGroupModify = exports.errorKinds = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
var errorKinds;
(function (errorKinds) {
    errorKinds["ObjectNotFound"] = "Object not found";
    errorKinds["OnSave"] = "On save";
    errorKinds["IncorrectType"] = "Incorrect type";
    errorKinds["IncorrectTablePartLength"] = "Incorrect table part length";
})(errorKinds = exports.errorKinds || (exports.errorKinds = {}));
let FormObjectsGroupModify = class FormObjectsGroupModify extends jetti_middle_1.FormBase {
    constructor() {
        super(...arguments);
        this.Mode = 'MODIFY';
        this.Text = '';
        this.OperationType = null;
        this.CatalogType = '';
        this.CheckTypes = true;
        this.ClearTableParts = false;
        this.SaveInAdminMode = false;
        this.ColumnsSeparator = '\t';
        this.RowsSeparator = '\n';
        this.UsePreview = true;
        this.SaveWithoutPost = true;
        this.ChangeProcessing = null;
        this.PropSettings = [new PropSettings()];
        this.ColumnsMatching = [new ColumnMatching()];
        this.SelectedObjects = [new SelectedObject()];
        this.ObjectsList = [new ObjectsList()];
        this.Errors = [new ErrorRow()];
        this.RecieverProps = [new RecieverProp()];
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'enum', value: ['LOAD', 'MODIFY'], label: 'Режим', panel: 'Тип объектов' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "Mode", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', controlType: 'textarea', panel: 'Загрузка из CSV', label: 'CSV' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "Text", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Operation', panel: 'Тип объектов', label: 'Тип: операция' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Types.Object', panel: 'Тип объектов', label: 'Тип: справочник' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "CatalogType", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', panel: 'Параметры загрузки', fieldset: 'Загрузка', label: 'Проверять соответствие типов' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "CheckTypes", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', panel: 'Параметры загрузки', fieldset: 'Загрузка', label: 'Очищать табличые части' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "ClearTableParts", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', panel: 'Параметры загрузки', fieldset: 'Загрузка', label: 'Запись с полными правами' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "SaveInAdminMode", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', panel: 'Параметры загрузки', fieldset: 'Загрузка', label: 'Разделитель колонк' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "ColumnsSeparator", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', panel: 'Параметры загрузки', fieldset: 'Загрузка', label: 'Разделитель строк' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "RowsSeparator", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', panel: 'Дополнительно', fieldset: 'Загрузка из JSON', label: 'Предпросмотр' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "UsePreview", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', panel: 'Дополнительно', fieldset: 'Загрузка из JSON', label: 'Запись без проведения' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "SaveWithoutPost", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Document.Operation', label: 'Обработка изменения', panel: 'Параметры загрузки', fieldset: 'Изменение' }),
    __metadata("design:type", Object)
], FormObjectsGroupModify.prototype, "ChangeProcessing", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Параметры', label: 'Реквизиты' }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "PropSettings", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Загрузка из CSV', label: 'Соответствие колонок' }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "ColumnsMatching", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Загрузка из CSV', hidden: true }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "SelectedObjects", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Список объектов', label: 'Список объектов' }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "ObjectsList", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Ошибки', label: 'Ошибки' }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "Errors", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'table', panel: 'Служебное', label: 'Свойства приемника' }),
    __metadata("design:type", Array)
], FormObjectsGroupModify.prototype, "RecieverProps", void 0);
FormObjectsGroupModify = __decorate([
    jetti_middle_1.JForm({
        type: 'Form.ObjectsGroupModify',
        description: 'Групповое изменение объектов',
        icon: 'fas fa-edit',
        menu: 'Изменение объектов',
    })
], FormObjectsGroupModify);
exports.FormObjectsGroupModify = FormObjectsGroupModify;
class RecieverProp {
    constructor() {
        this.Label = '';
        this.Key = '';
        this.Type = '';
        // @Props({ type: 'enum', value: ['=', '>=', '<=', '<', '>', 'like', 'in', 'beetwen', 'is null'] })
        // matchOperator = '=';
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'enum', value: [''] }),
    __metadata("design:type", Object)
], RecieverProp.prototype, "Label", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RecieverProp.prototype, "Key", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RecieverProp.prototype, "Type", void 0);
exports.RecieverProp = RecieverProp;
class ErrorRow {
    constructor() {
        this.Time = new Date;
        this.RowNumber = 0;
        this.ObjectId = '';
        this.ErrorKind = '';
        this.Text = '';
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'time' }),
    __metadata("design:type", Object)
], ErrorRow.prototype, "Time", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'number' }),
    __metadata("design:type", Object)
], ErrorRow.prototype, "RowNumber", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], ErrorRow.prototype, "ObjectId", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'enum', value: Object.keys(errorKinds), readOnly: true }),
    __metadata("design:type", Object)
], ErrorRow.prototype, "ErrorKind", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true }),
    __metadata("design:type", Object)
], ErrorRow.prototype, "Text", void 0);
exports.ErrorRow = ErrorRow;
class SelectedObject {
    constructor() {
        this.Object = null;
        this.Type = '';
        this.Company = null;
        this.Date = null;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'Types.Object' }),
    __metadata("design:type", Object)
], SelectedObject.prototype, "Object", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string' }),
    __metadata("design:type", Object)
], SelectedObject.prototype, "Type", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Company' }),
    __metadata("design:type", Object)
], SelectedObject.prototype, "Company", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], SelectedObject.prototype, "Date", void 0);
exports.SelectedObject = SelectedObject;
class ObjectsList {
    constructor() {
        this.Choise = null;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'boolean', hidden: true }),
    __metadata("design:type", Object)
], ObjectsList.prototype, "Choise", void 0);
exports.ObjectsList = ObjectsList;
class PropSettings {
    constructor() {
        this.PropName = '';
        this.PropLabel = '';
        this.PropType = '';
        this.isFilter = false;
        this.isModify = false;
        this.isVisibly = false;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Реквизит id', hidden: true }),
    __metadata("design:type", Object)
], PropSettings.prototype, "PropName", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Реквизит' }),
    __metadata("design:type", Object)
], PropSettings.prototype, "PropLabel", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Тип значения' }),
    __metadata("design:type", Object)
], PropSettings.prototype, "PropType", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Фильтровать' }),
    __metadata("design:type", Object)
], PropSettings.prototype, "isFilter", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Изменять' }),
    __metadata("design:type", Object)
], PropSettings.prototype, "isModify", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Видеть' }),
    __metadata("design:type", Object)
], PropSettings.prototype, "isVisibly", void 0);
exports.PropSettings = PropSettings;
class ColumnMatching {
    constructor() {
        this.ColumnFrom = '';
        this.ColumnTo = '';
        this.ColumnToLabel = '';
        this.TablePartTo = '';
        this.ColumnToType = '';
        this.ColumnRole = '';
        this.LoadIfEmptyInObject = false;
        this.LoadEmptyValues = false;
    }
}
__decorate([
    jetti_middle_2.Props({ type: 'enum', value: [], label: 'Колонка CSV' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "ColumnFrom", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Реквизит объекта (внутр)' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "ColumnTo", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Реквизит объекта' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "ColumnToLabel", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'ТЧ объекта' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "TablePartTo", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'string', readOnly: true, label: 'Тип значения' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "ColumnToType", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'enum', value: ['Object id', 'Object key', 'Table part row id', ''], label: 'Роль колонки' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "ColumnRole", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Заполнять пустые' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "LoadIfEmptyInObject", void 0);
__decorate([
    jetti_middle_2.Props({ type: 'boolean', label: 'Загружать пустые' }),
    __metadata("design:type", Object)
], ColumnMatching.prototype, "LoadEmptyValues", void 0);
exports.ColumnMatching = ColumnMatching;
//# sourceMappingURL=Form.ObjectsGroupModify.js.map
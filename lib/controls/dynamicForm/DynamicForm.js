var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable @microsoft/spfx/no-async-await */
import * as React from "react";
import * as strings from "ControlStrings";
import styles from "./DynamicForm.module.scss";
// Controls
import { DefaultButton, PrimaryButton, } from "@fluentui/react/lib/Button";
import { Dialog, DialogFooter, DialogType, } from "@fluentui/react/lib/Dialog";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import { Stack } from "@fluentui/react/lib/Stack";
import { Icon } from "@fluentui/react/lib/components/Icon/Icon";
import { DynamicField } from "./dynamicField";
import { FilePicker } from "../filePicker";
// pnp/sp, helpers / utils
import { sp } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/content-types";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import { cloneDeep, isEqual } from "lodash";
import SPservice from "../../services/SPService";
import { FormulaEvaluation } from "../../common/utilities/FormulaEvaluation";
import CustomFormattingHelper from "../../common/utilities/CustomFormatting";
var stackTokens = { childrenGap: 20 };
/**
 * DynamicForm Class Control
 */
var DynamicForm = /** @class */ (function (_super) {
    __extends(DynamicForm, _super);
    function DynamicForm(props) {
        var _this = _super.call(this, props) || this;
        _this.webURL = _this.props.webAbsoluteUrl
            ? _this.props.webAbsoluteUrl
            : _this.props.context.pageContext.web.absoluteUrl;
        _this.renderField = function (field) {
            var fieldOverrides = _this.props.fieldOverrides;
            var _a = _this.state, hiddenByFormula = _a.hiddenByFormula, isSaving = _a.isSaving, validationErrors = _a.validationErrors;
            // If the field is hidden by a formula, don't render it
            if (hiddenByFormula.find(function (h) { return h === field.columnInternalName; })) {
                return null;
            }
            // If validation error, show error message
            var validationErrorMessage = "";
            if (validationErrors[field.columnInternalName]) {
                validationErrorMessage = validationErrors[field.columnInternalName];
            }
            // If field override is provided, use it instead of the DynamicField component
            if (fieldOverrides &&
                Object.prototype.hasOwnProperty.call(fieldOverrides, field.columnInternalName)) {
                return fieldOverrides[field.columnInternalName](__assign(__assign({}, field), { disabled: field.disabled || isSaving }));
            }
            // Default render
            return (React.createElement(DynamicField, __assign({ key: field.columnInternalName }, field, { disabled: field.disabled || isSaving, validationErrorMessage: validationErrorMessage })));
        };
        /** Triggered when the user submits the form. */
        _this.onSubmitClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, listId, listItemId, onSubmitted, onBeforeSubmit, onSubmitError, enableFileSelection, validationErrorDialogProps, returnListItemInstanceOnSubmit, contentTypeId, fileSelectRendered, shouldBeReturnBack_1, fields, validationDisabled, validationErrors, objects, _loop_1, this_1, i, len, isCancelled, apiError, newETag, iur, error_1, contentTypeIdField, iar, error_2, idField, titleField, contentTypeIdField, library, folderTitle, newFolder, fields_1, folderId, iur, error_3, error_4;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this.props, listId = _a.listId, listItemId = _a.listItemId, onSubmitted = _a.onSubmitted, onBeforeSubmit = _a.onBeforeSubmit, onSubmitError = _a.onSubmitError, enableFileSelection = _a.enableFileSelection, validationErrorDialogProps = _a.validationErrorDialogProps, returnListItemInstanceOnSubmit = _a.returnListItemInstanceOnSubmit;
                        contentTypeId = this.props.contentTypeId;
                        if (this.state.contentTypeId !== undefined)
                            contentTypeId = this.state.contentTypeId;
                        fileSelectRendered = !listItemId && contentTypeId.startsWith("0x0101") && enableFileSelection === true;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 30, , 31]);
                        shouldBeReturnBack_1 = false;
                        fields = (this.state.fieldCollection || []).slice();
                        fields.forEach(function (field) {
                            // When a field is required and has no value
                            if (field.required) {
                                if (field.newValue === null) {
                                    if (field.defaultValue === null ||
                                        field.defaultValue === "" ||
                                        field.defaultValue.length === 0 ||
                                        field.defaultValue === undefined) {
                                        if (field.fieldType === "DateTime")
                                            field.defaultValue = null;
                                        else
                                            field.defaultValue = "";
                                        shouldBeReturnBack_1 = true;
                                    }
                                }
                                else if (field.newValue === "") {
                                    field.defaultValue = "";
                                    shouldBeReturnBack_1 = true;
                                }
                                else if (Array.isArray(field.newValue) && field.newValue.length === 0) {
                                    field.defaultValue = null;
                                    shouldBeReturnBack_1 = true;
                                }
                            }
                            // Check min and max values for number fields
                            if (field.fieldType === "Number" && field.newValue !== undefined && field.newValue.trim() !== "") {
                                if ((field.newValue < field.minimumValue) || (field.newValue > field.maximumValue)) {
                                    shouldBeReturnBack_1 = true;
                                }
                            }
                        });
                        validationDisabled = this.props.useFieldValidation === false;
                        validationErrors = {};
                        if (!!validationDisabled) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.evaluateFormulas(this.state.validationFormulas, true, true, this.state.hiddenByFormula)];
                    case 2:
                        validationErrors = (_f.sent());
                        if (Object.keys(validationErrors).length > 0) {
                            shouldBeReturnBack_1 = true;
                        }
                        _f.label = 3;
                    case 3:
                        // If validation failed, return without saving
                        if (shouldBeReturnBack_1) {
                            this.setState({
                                fieldCollection: fields,
                                isValidationErrorDialogOpen: (validationErrorDialogProps === null || validationErrorDialogProps === void 0 ? void 0 : validationErrorDialogProps.showDialogOnValidationError) === true,
                            });
                            return [2 /*return*/];
                        }
                        if (fileSelectRendered === true && this.state.selectedFile === undefined && this.props.listItemId === undefined) {
                            this.setState({
                                missingSelectedFile: true,
                                isValidationErrorDialogOpen: (validationErrorDialogProps === null || validationErrorDialogProps === void 0 ? void 0 : validationErrorDialogProps.showDialogOnValidationError) === true,
                                validationErrors: validationErrors
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            isSaving: true,
                        });
                        objects = {};
                        _loop_1 = function (i, len) {
                            var field, fieldType, additionalData, columnInternalName, hiddenFieldName, value_1, uploadedImage;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        field = fields[i];
                                        fieldType = field.fieldType, additionalData = field.additionalData, columnInternalName = field.columnInternalName, hiddenFieldName = field.hiddenFieldName;
                                        if (!(field.newValue !== null && field.newValue !== undefined)) return [3 /*break*/, 3];
                                        value_1 = field.newValue;
                                        if (["Lookup", "LookupMulti", "User", "UserMulti", "TaxonomyFieldTypeMulti"].indexOf(fieldType) < 0) {
                                            objects[columnInternalName] = value_1;
                                        }
                                        // Choice fields
                                        if (fieldType === "Choice") {
                                            objects[columnInternalName] = field.newValue.key;
                                        }
                                        if (fieldType === "MultiChoice") {
                                            objects[columnInternalName] = { results: field.newValue };
                                        }
                                        // Lookup fields
                                        if (fieldType === "Lookup") {
                                            if (value_1 && value_1.length > 0) {
                                                objects["".concat(columnInternalName, "Id")] = value_1[0].key;
                                            }
                                            else {
                                                objects["".concat(columnInternalName, "Id")] = null;
                                            }
                                        }
                                        if (fieldType === "LookupMulti") {
                                            value_1 = [];
                                            field.newValue.forEach(function (element) {
                                                value_1.push(element.key);
                                            });
                                            objects["".concat(columnInternalName, "Id")] = {
                                                results: value_1.length === 0 ? null : value_1,
                                            };
                                        }
                                        // User fields
                                        if (fieldType === "User") {
                                            objects["".concat(columnInternalName, "Id")] = field.newValue.length === 0 ? null : field.newValue;
                                        }
                                        if (fieldType === "UserMulti") {
                                            objects["".concat(columnInternalName, "Id")] = {
                                                results: field.newValue.length === 0 ? null : field.newValue,
                                            };
                                        }
                                        // Taxonomy / Managed Metadata fields
                                        if (fieldType === "TaxonomyFieldType") {
                                            objects[columnInternalName] = {
                                                __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
                                                Label: (_c = (_b = value_1[0]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "",
                                                TermGuid: (_e = (_d = value_1[0]) === null || _d === void 0 ? void 0 : _d.key) !== null && _e !== void 0 ? _e : "11111111-1111-1111-1111-111111111111",
                                                WssId: "-1",
                                            };
                                        }
                                        if (fieldType === "TaxonomyFieldTypeMulti") {
                                            objects[hiddenFieldName] = field.newValue
                                                .map(function (term) { return "-1#;".concat(term.name, "|").concat(term.key, ";"); })
                                                .join("#");
                                        }
                                        // Other fields
                                        if (fieldType === "Location") {
                                            objects[columnInternalName] = JSON.stringify(field.newValue);
                                        }
                                        if (!(fieldType === "Thumbnail")) return [3 /*break*/, 3];
                                        if (!additionalData) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.uploadImage(additionalData)];
                                    case 1:
                                        uploadedImage = _g.sent();
                                        objects[columnInternalName] = JSON.stringify({
                                            type: "thumbnail",
                                            fileName: uploadedImage.Name,
                                            serverRelativeUrl: uploadedImage.ServerRelativeUrl,
                                            id: uploadedImage.UniqueId,
                                        });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        objects[columnInternalName] = null;
                                        _g.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0, len = fields.length;
                        _f.label = 4;
                    case 4:
                        if (!(i < len)) return [3 /*break*/, 7];
                        return [5 /*yield**/, _loop_1(i, len)];
                    case 5:
                        _f.sent();
                        _f.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (!onBeforeSubmit) return [3 /*break*/, 9];
                        return [4 /*yield*/, onBeforeSubmit(objects)];
                    case 8:
                        isCancelled = _f.sent();
                        if (isCancelled) {
                            this.setState({
                                isSaving: false,
                            });
                            return [2 /*return*/];
                        }
                        _f.label = 9;
                    case 9:
                        apiError = void 0;
                        newETag = undefined;
                        if (!listItemId) return [3 /*break*/, 14];
                        _f.label = 10;
                    case 10:
                        _f.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, sp.web.lists
                                .getById(listId)
                                .items.getById(listItemId)
                                .update(objects, this.state.etag)];
                    case 11:
                        iur = _f.sent();
                        newETag = iur.data["odata.etag"];
                        if (onSubmitted) {
                            onSubmitted(iur.data, returnListItemInstanceOnSubmit !== false
                                ? iur.item
                                : undefined);
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        error_1 = _f.sent();
                        apiError = error_1.message;
                        if (onSubmitError) {
                            onSubmitError(objects, error_1);
                        }
                        console.log("Error", error_1);
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 29];
                    case 14:
                        if (!(contentTypeId === undefined ||
                            contentTypeId === "" ||
                            (!contentTypeId.startsWith("0x0120") &&
                                contentTypeId.startsWith("0x01")))) return [3 /*break*/, 20];
                        if (!(fileSelectRendered === true)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.addFileToLibrary(objects)];
                    case 15:
                        _f.sent();
                        return [3 /*break*/, 19];
                    case 16:
                        _f.trys.push([16, 18, , 19]);
                        contentTypeIdField = "ContentTypeId";
                        // check if item contenttype is passed, then update the object with content type id, else, pass the object
                        if (contentTypeId !== undefined && contentTypeId.startsWith("0x01"))
                            objects[contentTypeIdField] = contentTypeId;
                        return [4 /*yield*/, sp.web.lists.getById(listId).items.add(objects)];
                    case 17:
                        iar = _f.sent();
                        if (onSubmitted) {
                            onSubmitted(iar.data, this.props.returnListItemInstanceOnSubmit !== false
                                ? iar.item
                                : undefined);
                        }
                        return [3 /*break*/, 19];
                    case 18:
                        error_2 = _f.sent();
                        apiError = error_2.message;
                        if (onSubmitError) {
                            onSubmitError(objects, error_2);
                        }
                        console.log("Error", error_2);
                        return [3 /*break*/, 19];
                    case 19: return [3 /*break*/, 29];
                    case 20:
                        if (!contentTypeId.startsWith("0x0120")) return [3 /*break*/, 29];
                        _f.label = 21;
                    case 21:
                        _f.trys.push([21, 28, , 29]);
                        idField = "ID";
                        titleField = "Title";
                        contentTypeIdField = "ContentTypeId";
                        return [4 /*yield*/, sp.web.lists.getById(listId)];
                    case 22:
                        library = _f.sent();
                        folderTitle = objects[titleField] !== undefined && objects[titleField] !== ""
                            ? objects[titleField].replace(/["|*|:|<|>|?|/|\\||]/g, "_") // Replace not allowed chars in folder name
                            : "";
                        return [4 /*yield*/, library.rootFolder.addSubFolderUsingPath(folderTitle)];
                    case 23:
                        newFolder = _f.sent();
                        return [4 /*yield*/, newFolder.listItemAllFields()];
                    case 24:
                        fields_1 = _f.sent();
                        if (!fields_1[idField]) return [3 /*break*/, 26];
                        folderId = fields_1[idField];
                        // Set the content type ID for the target item
                        objects[contentTypeIdField] = contentTypeId;
                        return [4 /*yield*/, library.items.getById(folderId).update(objects)];
                    case 25:
                        iur = _f.sent();
                        if (onSubmitted) {
                            onSubmitted(iur.data, this.props.returnListItemInstanceOnSubmit !== false
                                ? iur.item
                                : undefined);
                        }
                        return [3 /*break*/, 27];
                    case 26: throw new Error("Unable to read the ID of the just created folder or Document Set");
                    case 27: return [3 /*break*/, 29];
                    case 28:
                        error_3 = _f.sent();
                        apiError = error_3.message;
                        if (onSubmitError) {
                            onSubmitError(objects, error_3);
                        }
                        console.log("Error", error_3);
                        return [3 /*break*/, 29];
                    case 29:
                        this.setState({
                            isSaving: false,
                            etag: newETag,
                            infoErrorMessages: apiError ? [{ type: MessageBarType.error, message: apiError }] : [],
                        });
                        return [3 /*break*/, 31];
                    case 30:
                        error_4 = _f.sent();
                        if (onSubmitError) {
                            onSubmitError(null, error_4);
                        }
                        console.log("Error onSubmit", error_4);
                        return [3 /*break*/, 31];
                    case 31: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Adds selected file to the library
         */
        _this.addFileToLibrary = function (objects) { return __awaiter(_this, void 0, void 0, function () {
            var selectedFile, _a, listId, contentTypeId, onSubmitted, onSubmitError, returnListItemInstanceOnSubmit, idField, contentTypeIdField, library, itemTitle, fileCreatedResult, _b, _c, _d, fields, folderId, iur, error_5;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        selectedFile = this.state.selectedFile;
                        _a = this.props, listId = _a.listId, contentTypeId = _a.contentTypeId, onSubmitted = _a.onSubmitted, onSubmitError = _a.onSubmitError, returnListItemInstanceOnSubmit = _a.returnListItemInstanceOnSubmit;
                        if (!(selectedFile !== undefined)) return [3 /*break*/, 10];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 9, , 10]);
                        idField = "ID";
                        contentTypeIdField = "ContentTypeId";
                        return [4 /*yield*/, sp.web.lists.getById(listId)];
                    case 2:
                        library = _e.sent();
                        itemTitle = selectedFile !== undefined && selectedFile.fileName !== undefined && selectedFile.fileName !== ""
                            ? selectedFile.fileName.replace(/["|*|:|<|>|?|/|\\||]/g, "_") // Replace not allowed chars in folder name
                            : "";
                        _c = (_b = library.rootFolder.files).addChunked;
                        _d = [encodeURI(itemTitle)];
                        return [4 /*yield*/, selectedFile.downloadFileContent()];
                    case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                    case 4:
                        fileCreatedResult = _e.sent();
                        return [4 /*yield*/, fileCreatedResult.file.listItemAllFields()];
                    case 5:
                        fields = _e.sent();
                        if (!fields[idField]) return [3 /*break*/, 7];
                        folderId = fields[idField];
                        // Set the content type ID for the target item
                        objects[contentTypeIdField] = contentTypeId;
                        return [4 /*yield*/, library.items.getById(folderId).update(objects)];
                    case 6:
                        iur = _e.sent();
                        if (onSubmitted) {
                            onSubmitted(iur.data, returnListItemInstanceOnSubmit !== false
                                ? iur.item
                                : undefined);
                        }
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Unable to read the ID of the just created folder or Document Set");
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_5 = _e.sent();
                        if (onSubmitError) {
                            onSubmitError(objects, error_5);
                        }
                        console.log("Error", error_5);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Triggered when the user makes any field value change in the form
         */
        _this.onChange = function (internalName, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newValue, validate, additionalData) { return __awaiter(_this, void 0, void 0, function () {
            var fieldCol, field, user, result, emails, index, element, user, result, validationErrors;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fieldCol = cloneDeep(this.state.fieldCollection || []);
                        field = fieldCol.filter(function (element, i) {
                            return element.columnInternalName === internalName;
                        })[0];
                        // Init new value(s)
                        field.newValue = newValue;
                        field.stringValue = newValue.toString();
                        field.additionalData = additionalData;
                        field.subPropertyValues = {};
                        // Store string values for various field types
                        if (field.fieldType === "Choice") {
                            field.stringValue = newValue.text;
                        }
                        if (field.fieldType === "MultiChoice") {
                            field.stringValue = newValue.join(';#');
                        }
                        if (field.fieldType === "Lookup" || field.fieldType === "LookupMulti") {
                            field.stringValue = newValue.map(function (nv) { return nv.key + ';#' + nv.name; }).join(';#');
                        }
                        if (field.fieldType === "TaxonomyFieldType" || field.fieldType === "TaxonomyFieldTypeMulti") {
                            field.stringValue = newValue.map(function (nv) { return nv.name; }).join(';');
                        }
                        if (!(field.fieldType === "User" && newValue.length !== 0)) return [3 /*break*/, 3];
                        if (!(newValue[0].id === undefined ||
                            parseInt(newValue[0].id, 10).toString() === "NaN")) return [3 /*break*/, 2];
                        user = newValue[0].secondaryText;
                        if (user.indexOf("@") === -1) {
                            user = newValue[0].loginName;
                        }
                        return [4 /*yield*/, sp.web.ensureUser(user)];
                    case 1:
                        result = _a.sent();
                        field.newValue = result.data.Id; // eslint-disable-line require-atomic-updates
                        field.stringValue = user;
                        field.subPropertyValues = {
                            id: result.data.Id,
                            title: result.data.Title,
                            email: result.data.Email,
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        field.newValue = newValue[0].id;
                        _a.label = 3;
                    case 3:
                        if (!(field.fieldType === "UserMulti" && newValue.length !== 0)) return [3 /*break*/, 9];
                        field.newValue = [];
                        emails = [];
                        index = 0;
                        _a.label = 4;
                    case 4:
                        if (!(index < newValue.length)) return [3 /*break*/, 8];
                        element = newValue[index];
                        if (!(element.id === undefined ||
                            parseInt(element.id, 10).toString() === "NaN")) return [3 /*break*/, 6];
                        user = element.secondaryText;
                        if (user.indexOf("@") === -1) {
                            user = element.loginName;
                        }
                        return [4 /*yield*/, sp.web.ensureUser(user)];
                    case 5:
                        result = _a.sent();
                        field.newValue.push(result.data.Id);
                        emails.push(user);
                        return [3 /*break*/, 7];
                    case 6:
                        field.newValue.push(element.id);
                        _a.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 4];
                    case 8:
                        field.stringValue = emails.join(";");
                        _a.label = 9;
                    case 9:
                        validationErrors = __assign({}, this.state.validationErrors);
                        if (validationErrors[field.columnInternalName])
                            delete validationErrors[field.columnInternalName];
                        this.setState({
                            fieldCollection: fieldCol,
                            validationErrors: validationErrors
                        }, function () {
                            if (validate)
                                _this.performValidation();
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /** Validation callback, used when form first loads (getListInformation) and following onChange */
        _this.performValidation = function (skipFieldValueValidation) {
            var _a = _this.props, useClientSideValidation = _a.useClientSideValidation, useFieldValidation = _a.useFieldValidation;
            var _b = _this.state, clientValidationFormulas = _b.clientValidationFormulas, validationFormulas = _b.validationFormulas;
            if (Object.keys(clientValidationFormulas).length || Object.keys(validationFormulas).length) {
                _this.setState({
                    isSaving: true, // Disable save btn and fields while validation in progress
                }, function () {
                    var clientSideValidationDisabled = useClientSideValidation === false;
                    var fieldValidationDisabled = useFieldValidation === false;
                    var hiddenByFormula = !clientSideValidationDisabled ? _this.evaluateColumnVisibilityFormulas() : [];
                    var validationErrors = __assign({}, _this.state.validationErrors);
                    if (!skipFieldValueValidation && !fieldValidationDisabled)
                        validationErrors = _this.evaluateFieldValueFormulas(hiddenByFormula);
                    _this.setState({ hiddenByFormula: hiddenByFormula, isSaving: false, validationErrors: validationErrors });
                });
            }
        };
        /** Determines visibility of fields that have show/hide formulas set in Edit Form > Edit Columns > Edit Conditional Formula */
        _this.evaluateColumnVisibilityFormulas = function () {
            return _this.evaluateFormulas(_this.state.clientValidationFormulas, false);
        };
        /** Evaluates field validation formulas set in column settings and returns a Record of error messages */
        _this.evaluateFieldValueFormulas = function (hiddenFields) {
            return _this.evaluateFormulas(_this.state.validationFormulas, true, true, hiddenFields);
        };
        /**
         * Evaluates formulas and returns a Record of error messages or an array of column names that have failed validation
         * @param formulas A Record / dictionary-like object, where key is internal column name and value is an object with ValidationFormula and ValidationMessage properties
         * @param returnMessages Determines whether a Record of error messages is returned or an array of column names that have failed validation
         * @param requireValue Set to true if the formula should only be evaluated when the field has a value
         * @returns
         */
        _this.evaluateFormulas = function (formulas, returnMessages, requireValue, ignoreFields) {
            if (returnMessages === void 0) { returnMessages = true; }
            if (requireValue === void 0) { requireValue = false; }
            if (ignoreFields === void 0) { ignoreFields = []; }
            var fieldCollection = _this.state.fieldCollection;
            var results = {};
            var _loop_2 = function (i) {
                var fieldName = Object.keys(formulas)[i];
                if (formulas[fieldName]) {
                    var field = fieldCollection.find(function (f) { return f.columnInternalName === fieldName; });
                    if (!field)
                        return "continue";
                    if (ignoreFields.indexOf(fieldName) > -1)
                        return "continue"; // Skip fields that are being ignored (e.g. hidden by formula)
                    var formula = formulas[fieldName].ValidationFormula;
                    var message = formulas[fieldName].ValidationMessage;
                    if (!formula)
                        return "continue";
                    var context = _this.getFormValuesForValidation();
                    if (requireValue && !context[fieldName])
                        return "continue";
                    var result = _this._formulaEvaluation.evaluate(formula, context);
                    if (Boolean(result) !== true) {
                        results[fieldName] = message;
                    }
                }
            };
            for (var i = 0; i < Object.keys(formulas).length; i++) {
                _loop_2(i);
            }
            if (!returnMessages) {
                return Object.keys(results);
            }
            return results;
        };
        /**
         * Used for validation. Returns a Record of field values, where key is internal column name and value is the field value.
         * Expands certain properties and stores many of them as primitives (strings, numbers or bools) so the expression evaluator
         * can process them. For example: a User column named Person will have values stored as Person, Person.email, Person.title etc.
         * This is so the expression evaluator can process expressions like '=[$Person.title] == "Contoso Employee 1138"'
         * @param fieldCollection Optional. Could be used to compare field values in state with previous state.
         * @returns
         */
        _this.getFormValuesForValidation = function (fieldCollection) {
            var fieldColFromState = _this.state.fieldCollection;
            if (!fieldCollection)
                fieldCollection = fieldColFromState;
            return fieldCollection.reduce(function (prev, cur) {
                var value = cur.value;
                switch (cur.fieldType) {
                    case "Lookup":
                    case "Choice":
                    case "TaxonomyFieldType":
                    case "LookupMulti":
                    case "MultiChoice":
                    case "TaxonomyFieldTypeMulti":
                    case "User":
                    case "UserMulti":
                        value = cur.stringValue;
                        break;
                    case "Currency":
                    case "Number":
                        if (cur.value !== undefined && cur.value !== null)
                            value = Number(cur.value);
                        if (cur.newValue !== undefined && cur.newValue !== null)
                            value = Number(cur.newValue);
                        break;
                    case "URL":
                        if (cur.value !== undefined && cur.value !== null)
                            value = cur.value.Url;
                        if (cur.newValue !== undefined && cur.newValue !== null)
                            value = cur.newValue.Url;
                        value = cur.newValue ? cur.newValue.Url : null;
                        break;
                    default:
                        value = cur.newValue || cur.value;
                        break;
                }
                prev[cur.columnInternalName] = value;
                if (cur.subPropertyValues) {
                    Object.keys(cur.subPropertyValues).forEach(function (key) {
                        prev["".concat(cur.columnInternalName, ".").concat(key)] = cur.subPropertyValues[key];
                    });
                }
                return prev;
            }, {});
        };
        /**
         * Invoked when component first mounts, loads information about the SharePoint list, fields and list item
         */
        _this.getListInformation = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, listId, listItemId, disabledFields, respectETag, onListItemLoaded, contentTypeId, listInfo, additionalInfo, numberFields, validationFormulas, contentTypeName, clientValidationFormulas, headerJSON, footerJSON, bodySections, customFormatInfo, spList, item, etag, tempFields, installedLanguages, error_6;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, listId = _a.listId, listItemId = _a.listItemId, disabledFields = _a.disabledFields, respectETag = _a.respectETag, onListItemLoaded = _a.onListItemLoaded;
                        contentTypeId = this.props.contentTypeId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, this._spService.getListFormRenderInfo(listId)];
                    case 2:
                        listInfo = _b.sent();
                        return [4 /*yield*/, this._spService.getAdditionalListFormFieldInfo(listId)];
                    case 3:
                        additionalInfo = _b.sent();
                        numberFields = additionalInfo.filter(function (f) { return f.TypeAsString === "Number" || f.TypeAsString === "Currency"; });
                        validationFormulas = additionalInfo.reduce(function (prev, cur) {
                            if (!prev[cur.InternalName] && cur.ValidationFormula) {
                                prev[cur.InternalName] = {
                                    ValidationFormula: cur.ValidationFormula,
                                    ValidationMessage: cur.ValidationMessage,
                                };
                            }
                            return prev;
                        }, {});
                        // If no content type ID is provided, use the default (first one in the list)
                        if (contentTypeId === undefined || contentTypeId === "") {
                            contentTypeId = Object.keys(listInfo.ContentTypeIdToNameMap)[0];
                        }
                        contentTypeName = listInfo.ContentTypeIdToNameMap[contentTypeId];
                        clientValidationFormulas = listInfo.ClientForms.Edit[contentTypeName].reduce(function (prev, cur) {
                            if (cur.ClientValidationFormula) {
                                prev[cur.InternalName] = {
                                    ValidationFormula: cur.ClientValidationFormula,
                                    ValidationMessage: cur.ClientValidationMessage,
                                };
                            }
                            return prev;
                        }, {});
                        headerJSON = void 0, footerJSON = void 0;
                        bodySections = void 0;
                        if (listInfo.ClientFormCustomFormatter && listInfo.ClientFormCustomFormatter[contentTypeId]) {
                            customFormatInfo = JSON.parse(listInfo.ClientFormCustomFormatter[contentTypeId]);
                            bodySections = customFormatInfo.bodyJSONFormatter.sections;
                            headerJSON = customFormatInfo.headerJSONFormatter;
                            footerJSON = customFormatInfo.footerJSONFormatter;
                        }
                        spList = sp.web.lists.getById(listId);
                        item = null;
                        etag = undefined;
                        if (!(listItemId !== undefined && listItemId !== null && listItemId !== 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, spList.items.getById(listItemId).get().catch(function (err) { return _this.updateFormMessages(MessageBarType.error, err.message); })];
                    case 4:
                        item = _b.sent();
                        if (!onListItemLoaded) return [3 /*break*/, 6];
                        return [4 /*yield*/, onListItemLoaded(item)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (respectETag !== false) {
                            etag = item["odata.etag"];
                        }
                        _b.label = 7;
                    case 7: return [4 /*yield*/, this.buildFieldCollection(listInfo, contentTypeName, item, numberFields, listId, listItemId, disabledFields)];
                    case 8:
                        tempFields = _b.sent();
                        installedLanguages = void 0;
                        if (!(tempFields.filter(function (f) { return f.fieldType === "Currency"; }).length > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, sp.web.regionalSettings.getInstalledLanguages()];
                    case 9:
                        installedLanguages = _b.sent();
                        _b.label = 10;
                    case 10:
                        this.setState({
                            contentTypeId: contentTypeId,
                            clientValidationFormulas: clientValidationFormulas,
                            customFormatting: {
                                header: headerJSON,
                                body: bodySections,
                                footer: footerJSON
                            },
                            etag: etag,
                            fieldCollection: tempFields,
                            installedLanguages: installedLanguages,
                            validationFormulas: validationFormulas
                        }, function () { return _this.performValidation(true); });
                        return [3 /*break*/, 12];
                    case 11:
                        error_6 = _b.sent();
                        this.updateFormMessages(MessageBarType.error, 'An error occurred while loading: ' + error_6.message);
                        console.error("An error occurred while loading DynamicForm", error_6);
                        return [2 /*return*/, null];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        _this.uploadImage = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var _a, listId, listItemId, fileInstance, buffer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, listId = _a.listId, listItemId = _a.listItemId;
                        if (!file.fileAbsoluteUrl) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                Name: file.fileName,
                                ServerRelativeUrl: file.fileAbsoluteUrl,
                                UniqueId: "",
                            }];
                    case 1: return [4 /*yield*/, file.downloadFileContent()];
                    case 2:
                        fileInstance = _b.sent();
                        return [4 /*yield*/, this.getImageArrayBuffer(fileInstance)];
                    case 3:
                        buffer = _b.sent();
                        return [4 /*yield*/, this._spService.uploadImage(listId, listItemId, file.fileName, buffer, undefined)];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        _this.getImageArrayBuffer = function (file) {
            return new Promise(function (resolve) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function () {
                    resolve(reader.result);
                };
            });
        };
        _this.closeValidationErrorDialog = function () {
            _this.setState({
                isValidationErrorDialogOpen: false,
            });
        };
        _this.getValidationErrorTitle = function () {
            var errorTitle = strings.DynamicFormDialogValidationErrorTitle;
            var validationDialogProps = _this.props.validationErrorDialogProps;
            if (validationDialogProps === null || validationDialogProps === void 0 ? void 0 : validationDialogProps.customTitle) {
                errorTitle = validationDialogProps.customTitle;
            }
            return errorTitle;
        };
        _this.getValidationErrorMessage = function () {
            var errorMessage = strings.DynamicFormDialogValidationErrorMessage;
            var validationDialogProps = _this.props.validationErrorDialogProps;
            if (validationDialogProps === null || validationDialogProps === void 0 ? void 0 : validationDialogProps.customMessage) {
                errorMessage = validationDialogProps.customMessage;
            }
            return errorMessage;
        };
        _this.renderFileSelectionControl = function () {
            var _a = _this.state, selectedFile = _a.selectedFile, missingSelectedFile = _a.missingSelectedFile;
            var labelEl = React.createElement("label", { className: styles.fieldRequired + ' ' + styles.fieldLabel }, strings.DynamicFormChooseFileLabel);
            return React.createElement("div", null,
                React.createElement("div", { className: styles.titleContainer },
                    React.createElement(Icon, { className: styles.fieldIcon, iconName: "DocumentSearch" }),
                    labelEl),
                React.createElement(FilePicker, { buttonLabel: strings.DynamicFormChooseFileButtonText, accepts: _this.props.supportedFileExtensions ? _this.props.supportedFileExtensions : [".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".pdf"], onSave: function (filePickerResult) {
                        if (filePickerResult.length === 1) {
                            _this.setState({
                                selectedFile: filePickerResult[0],
                                missingSelectedFile: false
                            });
                        }
                        else {
                            _this.setState({
                                missingSelectedFile: true
                            });
                        }
                    }, required: true, context: _this.props.context, hideWebSearchTab: true, hideStockImages: true, hideLocalMultipleUploadTab: true, hideLinkUploadTab: true, hideSiteFilesTab: true, checkIfFileExists: true }),
                selectedFile && React.createElement("div", { className: styles.selectedFileContainer },
                    React.createElement(Icon, { iconName: _this.getFileIconFromExtension() }),
                    selectedFile.fileName),
                missingSelectedFile === true &&
                    React.createElement("div", { className: styles.errormessage }, strings.DynamicFormRequiredFileMessage));
        };
        _this.getFileIconFromExtension = function () {
            var fileExtension = _this.state.selectedFile.fileName.split('.').pop();
            switch (fileExtension) {
                case 'pdf':
                    return 'PDF';
                case 'docx':
                case 'doc':
                    return 'WordDocument';
                case 'pptx':
                case 'ppt':
                    return 'PowerPointDocument';
                case 'xlsx':
                case 'xls':
                    return 'ExcelDocument';
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    return 'FileImage';
                default:
                    return 'Document';
            }
        };
        // Initialize pnp sp
        if (_this.props.webAbsoluteUrl) {
            sp.setup({
                sp: {
                    headers: {
                        Accept: "application/json;odata=verbose",
                    },
                    baseUrl: _this.props.webAbsoluteUrl,
                },
            });
        }
        else {
            sp.setup({
                spfxContext: { pageContext: _this.props.context.pageContext },
            });
        }
        // Initialize state
        _this.state = {
            infoErrorMessages: [],
            fieldCollection: [],
            validationFormulas: {},
            clientValidationFormulas: {},
            validationErrors: {},
            hiddenByFormula: [],
            isValidationErrorDialogOpen: false,
        };
        // Get SPService Factory
        _this._spService = _this.props.webAbsoluteUrl
            ? new SPservice(_this.props.context, _this.props.webAbsoluteUrl)
            : new SPservice(_this.props.context);
        // Setup Formula Validation utils
        _this._formulaEvaluation = new FormulaEvaluation(_this.props.context, _this.props.webAbsoluteUrl);
        // Setup Custom Formatting utils
        _this._customFormatter = new CustomFormattingHelper(_this._formulaEvaluation);
        return _this;
    }
    /**
     * Lifecycle hook when component is mounted
     */
    DynamicForm.prototype.componentDidMount = function () {
        this.getListInformation()
            .then(function () {
            /* no-op; */
        })
            .catch(function (err) {
            /* no-op; */
            console.error(err);
        });
    };
    DynamicForm.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if (!isEqual(prevProps, this.props)) {
            // Props have changed due to parent component or workbench config, reset state
            this.setState({
                infoErrorMessages: [],
                validationErrors: {} // Reset validation errors
            }, function () {
                // If listId or listItemId have changed, reload list information
                if (prevProps.listId !== _this.props.listId || prevProps.listItemId !== _this.props.listItemId) {
                    _this.getListInformation()
                        .then(function () {
                        /* no-op; */
                    })
                        .catch(function (err) {
                        /* no-op; */
                        console.error(err);
                    });
                }
                else {
                    _this.performValidation();
                }
            });
        }
    };
    /**
     * Default React component render method
     */
    DynamicForm.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.state, customFormatting = _b.customFormatting, fieldCollection = _b.fieldCollection, hiddenByFormula = _b.hiddenByFormula, infoErrorMessages = _b.infoErrorMessages, isSaving = _b.isSaving;
        var customFormattingDisabled = this.props.useCustomFormatting === false;
        // Custom Formatting - Header
        var headerContent;
        if (!customFormattingDisabled && (customFormatting === null || customFormatting === void 0 ? void 0 : customFormatting.header)) {
            headerContent = this._customFormatter.renderCustomFormatContent(customFormatting.header, this.getFormValuesForValidation(), true);
        }
        // Custom Formatting - Body
        var bodySections = [];
        if (!customFormattingDisabled && (customFormatting === null || customFormatting === void 0 ? void 0 : customFormatting.body)) {
            bodySections.push.apply(bodySections, customFormatting.body.slice());
            if (bodySections.length > 0) {
                var specifiedFields_1 = bodySections.reduce(function (prev, cur) {
                    prev.push.apply(prev, cur.fields);
                    return prev;
                }, []);
                var omittedFields = fieldCollection.filter(function (f) { return !specifiedFields_1.includes(f.label); }).map(function (f) { return f.label; });
                (_a = bodySections[bodySections.length - 1].fields).push.apply(_a, omittedFields);
            }
        }
        // Custom Formatting - Footer
        var footerContent;
        if (!customFormattingDisabled && (customFormatting === null || customFormatting === void 0 ? void 0 : customFormatting.footer)) {
            footerContent = this._customFormatter.renderCustomFormatContent(customFormatting.footer, this.getFormValuesForValidation(), true);
        }
        // Content Type
        var contentTypeId = this.props.contentTypeId;
        if (this.state.contentTypeId !== undefined)
            contentTypeId = this.state.contentTypeId;
        return (React.createElement("div", null,
            infoErrorMessages.map(function (ie, i) { return (React.createElement(MessageBar, { key: i, messageBarType: ie.type }, ie.message)); }),
            fieldCollection.length === 0 ? (React.createElement("div", null,
                React.createElement(ProgressIndicator, { label: strings.DynamicFormLoading, description: strings.DynamicFormPleaseWait }))) : (React.createElement("div", null,
                headerContent,
                this.props.enableFileSelection === true &&
                    this.props.listItemId === undefined &&
                    contentTypeId !== undefined &&
                    contentTypeId.startsWith("0x0101") &&
                    this.renderFileSelectionControl(),
                (bodySections.length > 0 && !customFormattingDisabled) && bodySections
                    .filter(function (bs) { return bs.fields.filter(function (bsf) { return hiddenByFormula.indexOf(bsf) < 0; }).length > 0; })
                    .map(function (section, i) { return (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: styles.sectionTitle }, section.displayname),
                    React.createElement("div", { className: styles.sectionFormFields }, section.fields.map(function (f, i) { return (React.createElement("div", { key: f, className: styles.sectionFormField }, _this.renderField(fieldCollection.find(function (fc) { return fc.label === f; })))); })),
                    i < bodySections.length - 1 && React.createElement("hr", { className: styles.sectionLine, "aria-hidden": true }))); }),
                (bodySections.length === 0 || customFormattingDisabled) && fieldCollection.map(function (f, i) { return _this.renderField(f); }),
                footerContent,
                !this.props.disabled && (React.createElement(Stack, { className: styles.buttons, horizontal: true, tokens: stackTokens },
                    React.createElement(PrimaryButton, { disabled: isSaving, text: strings.Save, onClick: function () { return _this.onSubmitClick(); } }),
                    React.createElement(DefaultButton, { disabled: isSaving, text: strings.Cancel, onClick: this.props.onCancelled }))))),
            React.createElement(Dialog, { hidden: !this.state.isValidationErrorDialogOpen, onDismiss: this.closeValidationErrorDialog, dialogContentProps: {
                    type: DialogType.normal,
                    title: this.getValidationErrorTitle(),
                    showCloseButton: true,
                }, modalProps: {
                    className: styles.validationErrorDialog,
                    isBlocking: true,
                    containerClassName: "ms-dialogMainOverride",
                } },
                this.getValidationErrorMessage(),
                React.createElement(DialogFooter, { className: styles.actions },
                    React.createElement("div", { className: "ms-Dialog-actionsRight ".concat(styles.actionsRight) },
                        React.createElement(DefaultButton, { className: styles.action, onClick: this.closeValidationErrorDialog, text: strings.CloseButton }))))));
    };
    DynamicForm.prototype.updateFormMessages = function (type, message) {
        var infoErrorMessages = this.state.infoErrorMessages;
        var newMessages = infoErrorMessages.slice();
        newMessages.push({ type: type, message: message });
        this.setState({ infoErrorMessages: newMessages });
    };
    /**
     * Builds a collection of fields to be rendered in the form
     * @param listInfo Data returned by RenderListDataAsStream with RenderOptions = 64 (ClientFormSchema)
     * @param contentTypeName SharePoint List Content Type
     * @param item SharePoint List Item
     * @param numberFields Additional information about Number fields (min and max values)
     * @param listId SharePoint List ID
     * @param listItemId SharePoint List Item ID
     * @param disabledFields Fields that should be disabled due to configuration
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DynamicForm.prototype.buildFieldCollection = function (listInfo, contentTypeName, item, numberFields, listId, listItemId, disabledFields) {
        return __awaiter(this, void 0, void 0, function () {
            var tempFields, order, hiddenFields, defaultDayOfWeek, _loop_3, this_2, i, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempFields = [];
                        order = 0;
                        hiddenFields = this.props.hiddenFields !== undefined ? this.props.hiddenFields : [];
                        defaultDayOfWeek = 0;
                        _loop_3 = function (i, len) {
                            var field, hiddenName, termSetId, anchorId, lookupListId, lookupField, choices_1, defaultValue, value, stringValue, subPropertyValues, richText, dateFormat, principalType, cultureName, minValue, maxValue, showAsPercentage, selectedTags_1, numberField, userEmails, _b, _c, response;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        field = listInfo.ClientForms.Edit[contentTypeName][i];
                                        if (!(hiddenFields.indexOf(field.InternalName) < 0)) return [3 /*break*/, 18];
                                        order++;
                                        hiddenName = "";
                                        termSetId = "";
                                        anchorId = "";
                                        lookupListId = "";
                                        lookupField = "";
                                        choices_1 = [];
                                        defaultValue = null;
                                        value = undefined;
                                        stringValue = null;
                                        subPropertyValues = {};
                                        richText = false;
                                        dateFormat = void 0;
                                        principalType = "";
                                        cultureName = void 0;
                                        minValue = void 0;
                                        maxValue = void 0;
                                        showAsPercentage = void 0;
                                        selectedTags_1 = [];
                                        // If a SharePoint Item was loaded, get the field value from it
                                        if (item !== null && item[field.InternalName]) {
                                            value = item[field.InternalName];
                                            stringValue = value.toString();
                                        }
                                        else {
                                            defaultValue = field.DefaultValue;
                                        }
                                        // Store choices for Choice fields
                                        if (field.FieldType === "Choice") {
                                            field.Choices.forEach(function (element) {
                                                choices_1.push({ key: element, text: element });
                                            });
                                        }
                                        if (field.FieldType === "MultiChoice") {
                                            field.MultiChoices.forEach(function (element) {
                                                choices_1.push({ key: element, text: element });
                                            });
                                        }
                                        // Setup Note, Number and Currency fields
                                        if (field.FieldType === "Note") {
                                            richText = field.RichText;
                                        }
                                        if (field.FieldType === "Number" || field.FieldType === "Currency") {
                                            numberField = numberFields.find(function (f) { return f.InternalName === field.InternalName; });
                                            if (numberField) {
                                                minValue = numberField.MinimumValue;
                                                maxValue = numberField.MaximumValue;
                                            }
                                            showAsPercentage = field.ShowAsPercentage;
                                            if (field.FieldType === "Currency") {
                                                cultureName = this_2.cultureNameLookup(numberField.CurrencyLocaleId);
                                            }
                                        }
                                        if (!(field.FieldType === "Lookup" || field.FieldType === "LookupMulti")) return [3 /*break*/, 3];
                                        lookupListId = field.LookupListId;
                                        lookupField = field.LookupFieldName;
                                        if (!(item !== null)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_2._spService.getLookupValues(listId, listItemId, field.InternalName, lookupField, this_2.webURL)];
                                    case 1:
                                        value = _d.sent();
                                        stringValue = value === null || value === void 0 ? void 0 : value.map(function (dv) { return dv.key + ';#' + dv.name; }).join(';#');
                                        if (item[field.InternalName + "Id"]) {
                                            subPropertyValues.id = item[field.InternalName + "Id"];
                                            subPropertyValues.lookupId = subPropertyValues.id;
                                        }
                                        subPropertyValues.lookupValue = value === null || value === void 0 ? void 0 : value.map(function (dv) { return dv.name; });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        value = [];
                                        _d.label = 3;
                                    case 3:
                                        if (!(field.FieldType === "User")) return [3 /*break*/, 7];
                                        if (!(item !== null)) return [3 /*break*/, 5];
                                        userEmails = [];
                                        _c = (_b = userEmails).push;
                                        return [4 /*yield*/, this_2._spService.getUserUPNFromFieldValue(listId, listItemId, field.InternalName, this_2.webURL)];
                                    case 4:
                                        _c.apply(_b, [(_d.sent()) + ""]);
                                        value = userEmails;
                                        stringValue = userEmails === null || userEmails === void 0 ? void 0 : userEmails.map(function (dv) { return dv.split('/').shift(); }).join(';');
                                        if (item[field.InternalName + "Id"]) {
                                            subPropertyValues.id = item[field.InternalName + "Id"];
                                        }
                                        subPropertyValues.title = userEmails === null || userEmails === void 0 ? void 0 : userEmails.map(function (dv) { return dv.split('/').pop(); })[0];
                                        subPropertyValues.email = userEmails[0];
                                        return [3 /*break*/, 6];
                                    case 5:
                                        value = [];
                                        _d.label = 6;
                                    case 6:
                                        principalType = field.PrincipalAccountType;
                                        _d.label = 7;
                                    case 7:
                                        if (!(field.FieldType === "UserMulti")) return [3 /*break*/, 11];
                                        if (!(item !== null)) return [3 /*break*/, 9];
                                        return [4 /*yield*/, this_2._spService.getUsersUPNFromFieldValue(listId, listItemId, field.InternalName, this_2.webURL)];
                                    case 8:
                                        value = _d.sent();
                                        stringValue = value === null || value === void 0 ? void 0 : value.map(function (dv) { return dv.split('/').pop(); }).join(';');
                                        return [3 /*break*/, 10];
                                    case 9:
                                        value = [];
                                        _d.label = 10;
                                    case 10:
                                        principalType = field.PrincipalAccountType;
                                        _d.label = 11;
                                    case 11:
                                        if (!(field.FieldType === "TaxonomyFieldType")) return [3 /*break*/, 15];
                                        termSetId = field.TermSetId;
                                        anchorId = field.AnchorId;
                                        if (!(item !== null)) return [3 /*break*/, 13];
                                        return [4 /*yield*/, this_2._spService.getSingleManagedMetadataLabel(listId, listItemId, field.InternalName)];
                                    case 12:
                                        response = _d.sent();
                                        if (response) {
                                            selectedTags_1.push({
                                                key: response.TermID,
                                                name: response.Label,
                                            });
                                            value = selectedTags_1;
                                            stringValue = selectedTags_1 === null || selectedTags_1 === void 0 ? void 0 : selectedTags_1.map(function (dv) { return dv.key + ';#' + dv.name; }).join(';#');
                                        }
                                        return [3 /*break*/, 14];
                                    case 13:
                                        if (defaultValue !== "") {
                                            selectedTags_1.push({
                                                key: defaultValue.split("|")[1],
                                                name: defaultValue.split("|")[0].split("#")[1],
                                            });
                                            value = selectedTags_1;
                                        }
                                        _d.label = 14;
                                    case 14:
                                        if (defaultValue === "")
                                            defaultValue = null;
                                        _d.label = 15;
                                    case 15:
                                        if (field.FieldType === "TaxonomyFieldTypeMulti") {
                                            hiddenName = field.HiddenListInternalName;
                                            termSetId = field.TermSetId;
                                            anchorId = field.AnchorId;
                                            if (item && item[field.InternalName]) {
                                                item[field.InternalName].forEach(function (element) {
                                                    selectedTags_1.push({
                                                        key: element.TermGuid,
                                                        name: element.Label,
                                                    });
                                                });
                                                value = selectedTags_1;
                                            }
                                            else {
                                                if (defaultValue && defaultValue !== "") {
                                                    defaultValue.split(/#|;/).forEach(function (element) {
                                                        if (element.indexOf("|") !== -1)
                                                            selectedTags_1.push({
                                                                key: element.split("|")[1],
                                                                name: element.split("|")[0],
                                                            });
                                                    });
                                                    value = selectedTags_1;
                                                    stringValue = selectedTags_1 === null || selectedTags_1 === void 0 ? void 0 : selectedTags_1.map(function (dv) { return dv.key + ';#' + dv.name; }).join(';#');
                                                }
                                            }
                                            if (defaultValue === "")
                                                defaultValue = null;
                                        }
                                        if (!(field.FieldType === "DateTime")) return [3 /*break*/, 17];
                                        if (item !== null && item[field.InternalName]) {
                                            value = new Date(item[field.InternalName]);
                                            stringValue = value.toISOString();
                                        }
                                        else if (defaultValue === "[today]") {
                                            defaultValue = new Date();
                                        }
                                        else if (defaultValue) {
                                            defaultValue = new Date(defaultValue);
                                        }
                                        dateFormat = field.DateFormat || "DateOnly";
                                        return [4 /*yield*/, this_2._spService.getRegionalWebSettings()];
                                    case 16:
                                        defaultDayOfWeek = (_d.sent()).FirstDayOfWeek;
                                        _d.label = 17;
                                    case 17:
                                        // Setup Thumbnail, Location and Boolean fields
                                        if (field.FieldType === "Thumbnail") {
                                            if (defaultValue) {
                                                defaultValue = JSON.parse(defaultValue).serverRelativeUrl;
                                            }
                                            if (value) {
                                                value = JSON.parse(value).serverRelativeUrl;
                                            }
                                        }
                                        if (field.FieldType === "Location") {
                                            if (defaultValue)
                                                defaultValue = JSON.parse(defaultValue);
                                            if (value)
                                                value = JSON.parse(value);
                                        }
                                        if (field.FieldType === "Boolean") {
                                            if (defaultValue !== undefined && defaultValue !== null)
                                                defaultValue = Boolean(Number(defaultValue));
                                            if (value !== undefined && value !== null)
                                                value = Boolean(Number(value));
                                        }
                                        tempFields.push({
                                            value: value,
                                            newValue: undefined,
                                            stringValue: stringValue,
                                            subPropertyValues: subPropertyValues,
                                            cultureName: cultureName,
                                            fieldTermSetId: termSetId,
                                            fieldAnchorId: anchorId,
                                            options: choices_1,
                                            lookupListID: lookupListId,
                                            lookupField: lookupField,
                                            // changedValue: defaultValue,
                                            fieldType: field.FieldType,
                                            // fieldTitle: field.Title,
                                            defaultValue: defaultValue,
                                            context: this_2.props.context,
                                            disabled: this_2.props.disabled ||
                                                (disabledFields &&
                                                    disabledFields.indexOf(field.InternalName) > -1),
                                            // listId: this.props.listId,
                                            columnInternalName: field.InternalName,
                                            label: field.Title,
                                            onChanged: this_2.onChange,
                                            required: field.Required,
                                            hiddenFieldName: hiddenName,
                                            Order: order,
                                            isRichText: richText,
                                            dateFormat: dateFormat,
                                            firstDayOfWeek: defaultDayOfWeek,
                                            listItemId: listItemId,
                                            principalType: principalType,
                                            description: field.Description,
                                            minimumValue: minValue,
                                            maximumValue: maxValue,
                                            showAsPercentage: showAsPercentage,
                                        });
                                        // This may not be necessary now using RenderListDataAsStream
                                        tempFields.sort(function (a, b) { return a.Order - b.Order; });
                                        _d.label = 18;
                                    case 18: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        i = 0, len = listInfo.ClientForms.Edit[contentTypeName].length;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_3(i, len)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, tempFields];
                }
            });
        });
    };
    DynamicForm.prototype.cultureNameLookup = function (lcid) {
        var _a, _b;
        var pageCulture = this.props.context.pageContext.cultureInfo.currentCultureName;
        if (!lcid)
            return pageCulture;
        return (_b = (_a = this.state.installedLanguages) === null || _a === void 0 ? void 0 : _a.find(function (lang) { return lang.Lcid === lcid; }).DisplayName) !== null && _b !== void 0 ? _b : pageCulture;
    };
    return DynamicForm;
}(React.Component));
export { DynamicForm };
//# sourceMappingURL=DynamicForm.js.map
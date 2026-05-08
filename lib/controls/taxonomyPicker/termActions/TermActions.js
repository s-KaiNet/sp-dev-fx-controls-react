import { __awaiter, __generator } from "tslib";
import { UpdateType } from ".";
import { findIndex } from "@microsoft/sp-lodash-subset";
/**
 * TermAction is responsible to obtain different labels for the term.
 */
var TermLabelAction = /** @class */ (function () {
    function TermLabelAction(title, iconName) {
        if (iconName === void 0) { iconName = "LocaleLanguage"; }
        var _this = this;
        this.title = title;
        this.iconName = iconName;
        this.id = "TermLabelActionId";
        this.applyToTerm = function (currentTerm) {
            var termIndex = findIndex(_this._processedTerms, function (term) { return term.Id === currentTerm.Id; });
            if (termIndex >= 0) {
                return false;
            }
            return true;
        };
        this.actionCallback = function (spTermService, currentTerm) { return __awaiter(_this, void 0, void 0, function () {
            var updateAction, _a, termLabel, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        updateAction = null;
                        _a = this;
                        return [4 /*yield*/, spTermService.getTermLabels(currentTerm.Id)];
                    case 1:
                        _a._labels = _b.sent();
                        if (this._labels) {
                            termLabel = this._labels.join(" ; ");
                            updateAction = {
                                updateActionType: UpdateType.updateTermLabel,
                                value: termLabel
                            };
                            return [2 /*return*/, updateAction];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this._processedTerms = [];
    }
    return TermLabelAction;
}());
export { TermLabelAction };
//# sourceMappingURL=TermActions.js.map
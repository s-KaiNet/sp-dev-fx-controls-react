import { __assign, __extends } from "tslib";
import React from 'react';
import { TermItem } from '../termItem/TermItem';
import { TermItemSuggestion } from '../termItem/TermItemSuggestion';
import { initializeComponentRef, styled } from '@fluentui/react/lib/Utilities';
import { BasePicker } from '@fluentui/react/lib/Pickers';
import { getStyles } from '@fluentui/react/lib/components/pickers/BasePicker.styles';
var ModernTermPickerBase = /** @class */ (function (_super) {
    __extends(ModernTermPickerBase, _super);
    function ModernTermPickerBase(props) {
        var _this = _super.call(this, props) || this;
        initializeComponentRef(_this);
        return _this;
    }
    ModernTermPickerBase.defaultProps = {
        onRenderItem: function (props) {
            var termItemProps = props;
            var labels = termItemProps.item.labels.filter(function (name) { return name.languageTag === termItemProps.languageTag && name.isDefault; });
            if (labels.length === 0) {
                labels = termItemProps.item.labels.filter(function (name) { var _a; return name.languageTag === ((_a = termItemProps.termStoreInfo) === null || _a === void 0 ? void 0 : _a.defaultLanguageTag) && name.isDefault; });
            }
            return labels.length > 0 ? (React.createElement(TermItem, __assign({}, termItemProps), labels[0].name)) : null;
        },
        onRenderSuggestionsItem: function (props, itemProps) {
            return React.createElement(TermItemSuggestion, __assign({ term: props }, itemProps));
        },
    };
    return ModernTermPickerBase;
}(BasePicker));
export { ModernTermPickerBase };
export var ModernTermPicker = styled(ModernTermPickerBase, getStyles, undefined, {
    scope: 'ModernTermPicker',
});
//# sourceMappingURL=ModernTermPicker.js.map
import { __extends } from "tslib";
import * as React from 'react';
import styles from '../FieldCollectionData.module.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { Icon } from '@fluentui/react/lib/Icon';
var CollectionIconField = /** @class */ (function (_super) {
    __extends(CollectionIconField, _super);
    function CollectionIconField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionIconField.prototype.render = function () {
        var _this = this;
        var _a = this.props, field = _a.field, item = _a.item;
        return (React.createElement("div", { className: "FieldCollectionData__panel__icon-field ".concat(styles.iconField) },
            React.createElement(TextField, { placeholder: field.placeholder || field.title, className: styles.collectionDataField, value: item[field.id] ? item[field.id] : "", required: field.required, onChange: function (e, value) { return _this.props.fOnValueChange(field.id, value); }, deferredValidationTime: field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200, onGetErrorMessage: function (value) { return _this.props.fValidation(_this.props.field, value); }, disabled: this.props.disableEdit }),
            React.createElement(Icon, { iconName: item[field.id] ? item[field.id] : "" })));
    };
    return CollectionIconField;
}(React.Component));
export { CollectionIconField };
//# sourceMappingURL=CollectionIconField.js.map
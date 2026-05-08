import { __assign, __extends } from "tslib";
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Label } from '@fluentui/react/lib/Label';
import { CollectionDataViewer } from './collectionDataViewer';
import * as strings from 'ControlStrings';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
var FieldCollectionData = /** @class */ (function (_super) {
    __extends(FieldCollectionData, _super);
    function FieldCollectionData(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Open the panel
         */
        _this.openPanel = function () {
            _this.setState({
                panelOpen: true
            });
        };
        /**
         * Closes the panel
         */
        _this.closePanel = function () {
            _this.setState({
                panelOpen: false
            });
        };
        /**
         * On save action
         */
        _this.onSave = function (items) {
            _this.props.onChanged(items);
            _this.setState({
                panelOpen: false
            });
        };
        _this.state = {
            panelOpen: false
        };
        telemetry.track('FieldCollectionData', {});
        return _this;
    }
    FieldCollectionData.prototype.render = function () {
        var _element = this.getElement();
        return (_element);
    };
    FieldCollectionData.prototype.getElement = function () {
        var _a;
        var _element = typeof this.props.usePanel === "boolean" && this.props.usePanel === false
            ?
                React.createElement(CollectionDataViewer, __assign({}, this.props, { fOnSave: this.onSave, fOnClose: this.closePanel }))
            :
                React.createElement("div", null,
                    React.createElement(Label, null, this.props.label),
                    React.createElement(DefaultButton, { text: this.props.manageBtnLabel, onClick: this.openPanel, disabled: this.props.fields.length === 0 || this.props.disabled }),
                    (!this.props.fields || this.props.fields.length === 0) && //<FieldErrorMessage errorMessage={strings.CollectionDataEmptyFields} />
                        React.createElement(MessageBar, { messageBarType: MessageBarType.error }, strings.CollectionDataItemMissingFields),
                    React.createElement(Panel, __assign({ isOpen: this.state.panelOpen, onDismiss: this.closePanel, type: PanelType.large, headerText: this.props.panelHeader, onOuterClick: function () { }, className: "FieldCollectionData__panel ".concat(this.props.panelClassName || "") }, (_a = this.props.panelProps) !== null && _a !== void 0 ? _a : {}),
                        this.props.panelDescription && (React.createElement("p", { className: "FieldCollectionData__panel__description" }, this.props.panelDescription)),
                        React.createElement(CollectionDataViewer, __assign({}, this.props, { fOnSave: this.onSave, fOnClose: this.closePanel }))));
        return _element;
    };
    return FieldCollectionData;
}(React.Component));
export { FieldCollectionData };
//# sourceMappingURL=FieldCollectionData.js.map
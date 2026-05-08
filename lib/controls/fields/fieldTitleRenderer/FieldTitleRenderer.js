import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Link } from '@fluentui/react/lib/Link';
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';
/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
var FieldTitleRenderer = /** @class */ (function (_super) {
    __extends(FieldTitleRenderer, _super);
    function FieldTitleRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldTitleRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldTitleRenderer.prototype.render = function () {
        var isLink = this.props.isLink;
        if (isLink) {
            return (React.createElement(Link, { onClick: this._onClick.bind(this), className: css(this.props.className), style: this.props.cssProps }, this.props.text));
        }
        else {
            return (React.createElement(FieldBaseTextRenderer, { className: this.props.className, cssProps: this.props.cssProps, text: this.props.text }));
        }
    };
    FieldTitleRenderer.prototype._onClick = function () {
        if (this.props.onClick) {
            var args = {
                listId: this.props.listId,
                id: this.props.id.toString()
            };
            this.props.onClick(args);
            return;
        }
        var url = "".concat(this.props.baseUrl, "/_layouts/15/listform.aspx?PageType=4&ListId=").concat(this.props.listId, "&ID=").concat(this.props.id);
        location.href = url;
    };
    return FieldTitleRenderer;
}(React.Component));
export { FieldTitleRenderer };
//# sourceMappingURL=FieldTitleRenderer.js.map
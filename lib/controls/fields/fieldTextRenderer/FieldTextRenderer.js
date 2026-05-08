import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import styles from './FieldTextRenderer.module.scss';
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';
/**
 * Field Text Renderer.
 * Used for:
 *   - Single line of text
 *   - Multiline text
 *   - Choice
 *   - Checkbox
 *   - Number
 *   - Currency
 */
var FieldTextRenderer = /** @class */ (function (_super) {
    __extends(FieldTextRenderer, _super);
    function FieldTextRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldTextRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldTextRenderer.prototype.render = function () {
        var isSafeForInnerHTML = this.props.isSafeForInnerHTML;
        var isTruncatedClassNameObj = {}; // hack to avoid ts warning
        isTruncatedClassNameObj[styles.isTruncated] = this.props.isTruncated;
        var text = this.props.text;
        if (isSafeForInnerHTML && this.props.isTruncated) {
            text += "<div class=".concat(styles.truncate, " style=\"background: linear-gradient(to bottom, transparent, ").concat((this.props.cssProps && (this.props.cssProps.background || this.props.cssProps.backgroundColor)) || '#ffffff', " 100%)\"></div>");
        }
        if (isSafeForInnerHTML) {
            return (React.createElement("div", { className: css(this.props.className, styles.fieldRendererText, isTruncatedClassNameObj), style: this.props.cssProps, dangerouslySetInnerHTML: { __html: text } }));
        }
        else {
            return (React.createElement(FieldBaseTextRenderer, { className: css(this.props.className, styles.fieldRendererText), cssProps: this.props.cssProps, text: this.props.text }));
        }
    };
    return FieldTextRenderer;
}(React.Component));
export { FieldTextRenderer };
//# sourceMappingURL=FieldTextRenderer.js.map
import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Link } from '@fluentui/react/lib/Link';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldUrlRenderer.module.scss';
/**
 * Field URL Renderer.
 * Used for:
 *   - URL (Hyperlink, Image)
 */
var FieldUrlRenderer = /** @class */ (function (_super) {
    __extends(FieldUrlRenderer, _super);
    function FieldUrlRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldUrlRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldUrlRenderer.prototype.render = function () {
        var isImageUrl = this.props.isImageUrl;
        if (isImageUrl) {
            return (React.createElement("div", { className: css(this.props.className, styles.image), style: this.props.cssProps, onClick: this._onImgClick.bind(this) },
                React.createElement("img", { src: this.props.url, alt: this.props.text })));
        }
        else {
            return (React.createElement(Link, { className: css(this.props.className, styles.link), target: '_blank', href: this.props.url, style: this.props.cssProps }, this.props.text));
        }
    };
    FieldUrlRenderer.prototype._onImgClick = function () {
        window.open(this.props.url, '_blank');
    };
    return FieldUrlRenderer;
}(React.Component));
export { FieldUrlRenderer };
//# sourceMappingURL=FieldUrlRenderer.js.map
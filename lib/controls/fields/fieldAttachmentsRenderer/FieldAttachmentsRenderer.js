import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldAttachmentsRenderer.module.scss';
/**
 * Attachments Renderer.
 * Used for:
 *   - Attachments
 */
var FieldAttachmentsRenderer = /** @class */ (function (_super) {
    __extends(FieldAttachmentsRenderer, _super);
    function FieldAttachmentsRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldAttachmentsRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldAttachmentsRenderer.prototype.render = function () {
        return (React.createElement("div", { className: css(this.props.className, styles.container, styles.fabricIcon), style: this.props.cssProps }, this.props.count && React.createElement(Icon, { iconName: 'Attach' })));
    };
    return FieldAttachmentsRenderer;
}(React.Component));
export { FieldAttachmentsRenderer };
//# sourceMappingURL=FieldAttachmentsRenderer.js.map
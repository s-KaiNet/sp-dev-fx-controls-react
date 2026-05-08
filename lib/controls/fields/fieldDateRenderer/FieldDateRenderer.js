import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';
/**
 * Field Date Renderer.
 * Used for:
 *   - Date Time
 */
var FieldDateRenderer = /** @class */ (function (_super) {
    __extends(FieldDateRenderer, _super);
    function FieldDateRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldDateRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldDateRenderer.prototype.render = function () {
        return (React.createElement(FieldBaseTextRenderer, { cssProps: this.props.cssProps, className: css(this.props.className), noTextRender: true }, this.props.text));
    };
    return FieldDateRenderer;
}(React.Component));
export { FieldDateRenderer };
//# sourceMappingURL=FieldDateRenderer.js.map
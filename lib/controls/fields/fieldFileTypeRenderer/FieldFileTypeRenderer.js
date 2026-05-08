import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import { FileTypeIcon, IconType } from '../../fileTypeIcon';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldFileTypeRenderer.module.scss';
/**
 * File Type Renderer.
 * Used for:
 *   - File/Document Type
 */
var FieldFileTypeRenderer = /** @class */ (function (_super) {
    __extends(FieldFileTypeRenderer, _super);
    function FieldFileTypeRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldFileTypeRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldFileTypeRenderer.prototype.render = function () {
        var optionalStyles = { // eslint-disable-line @typescript-eslint/no-explicit-any
        };
        optionalStyles[styles.folder] = this.props.isFolder;
        return (React.createElement("div", { className: css(this.props.className, styles.container, styles.fabricIcon, optionalStyles), style: this.props.cssProps }, this.props.isFolder ? React.createElement(Icon, { iconName: 'FabricFolderFill' }) : React.createElement(FileTypeIcon, { type: IconType.font, path: this.props.path })));
    };
    return FieldFileTypeRenderer;
}(React.Component));
export { FieldFileTypeRenderer };
//# sourceMappingURL=FieldFileTypeRenderer.js.map
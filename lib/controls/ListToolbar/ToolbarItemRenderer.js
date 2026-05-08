import * as React from 'react';
import { ToolbarButton, Tooltip, } from '@fluentui/react-components';
/**
 * Renders a single toolbar button with optional tooltip and label.
 */
export var ToolbarItemRenderer = function (_a) {
    var item = _a.item, isLoading = _a.isLoading, itemClass = _a.itemClass, labelClass = _a.labelClass;
    if (item.visible === false)
        return null;
    if (item.onRender)
        return item.onRender();
    var labelContent = labelClass ? (React.createElement("span", { className: labelClass }, item.label)) : (item.label);
    var button = item.label ? (React.createElement(ToolbarButton, { className: itemClass, "aria-label": item.ariaLabel || item.tooltip || item.label, icon: item.icon, onClick: item.onClick, disabled: item.disabled || isLoading, appearance: item.appearance }, labelContent)) : (React.createElement(ToolbarButton, { className: itemClass, "aria-label": item.ariaLabel || item.tooltip || item.key, icon: item.icon, onClick: item.onClick, disabled: item.disabled || isLoading, appearance: item.appearance }));
    if (item.tooltip) {
        return (React.createElement(Tooltip, { content: item.tooltip, relationship: "label" }, button));
    }
    return button;
};
//# sourceMappingURL=ToolbarItemRenderer.js.map
import { __assign } from "tslib";
import { Box, ButtonContent, Tooltip, tooltipAsLabelBehavior } from "@fluentui/react-northstar";
import { cloneDeep } from "@microsoft/sp-lodash-subset";
import * as React from "react";
import styles from "./Toolbar.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
export var toolbarMenuProps = {
    offset: [0, 4],
    position: "below",
};
var toolbarActionTooltipProps = (function () {
    var props = cloneDeep(toolbarMenuProps);
    props.offset[1] += 10;
    return props;
})();
export var InFlowToolbarItem = function (_a) {
    var action = _a.action, layout = _a.layout;
    var iconName = action.iconName, title = action.title;
    var contentIcon = iconName && (React.createElement(Box, { className: "extended-toolbar__near-side__item__icon " + styles.inFlowToolbarItemBox },
        React.createElement(Icon, { iconName: iconName })));
    switch (layout) {
        case "verbose":
            return (React.createElement(React.Fragment, null,
                contentIcon,
                React.createElement(ButtonContent, { content: title })));
        default:
        case "compact":
            return (React.createElement(Tooltip, __assign({}, toolbarActionTooltipProps, { trigger: contentIcon, content: title, accessibility: tooltipAsLabelBehavior })));
    }
};
//# sourceMappingURL=InFlowToolbarItem.js.map
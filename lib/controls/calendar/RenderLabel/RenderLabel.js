import * as React from 'react';
import { Caption1, tokens, } from '@fluentui/react-components';
import { Icon } from '@iconify/react';
import { useRenderLabelStyles } from './useRenderLabelStylesStyles';
export var RenderLabel = function (props) {
    var label = props.label, icon = props.icon, isRequired = props.isRequired;
    var styles = useRenderLabelStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.labelContainer },
            icon && React.isValidElement(icon) ? (icon) : (React.createElement(Icon, { icon: icon, className: styles.iconStyles, width: "20px", height: "20px", color: tokens.colorBrandForeground1, "aria-hidden": "true" })),
            React.createElement(Caption1, { style: { color: tokens.colorBrandForeground1 } }, label),
            React.createElement(Caption1, { style: { color: tokens.colorPaletteRedForeground1 } }, isRequired ? " *" : ""))));
};
export default RenderLabel;
//# sourceMappingURL=RenderLabel.js.map
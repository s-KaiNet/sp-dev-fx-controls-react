import { __assign } from "tslib";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { getTheme } from "@fluentui/react/lib/Styling";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import * as React from 'react';
import { useState } from 'react';
import { AdaptiveCardDesigner } from "./AdaptiveCardDesigner";
var panelStyles = {
    scrollableContent: { display: "flex", height: "100%" },
    content: {
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        overflow: "hidden",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    commands: { marginBottom: 15 }
};
export var AdaptiveCardDesignerHost = function (props) {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(DefaultButton, { text: props.buttonText, onClick: function () { return setIsOpen(true); } }),
        React.createElement(ThemeProvider, { theme: getTheme() },
            React.createElement(Panel, { styles: panelStyles, headerText: props.headerText, isBlocking: true, isOpen: isOpen, type: PanelType.smallFluid, hasCloseButton: true, onDismiss: function (ev) {
                    var srcElement = ev.nativeEvent.target;
                    if (srcElement && srcElement.className.indexOf('ms-Overlay') !== -1) {
                        ev.preventDefault();
                    }
                    else {
                        setIsOpen(false);
                    }
                } },
                React.createElement("hr", null),
                React.createElement(AdaptiveCardDesigner, __assign({}, props))))));
};
//# sourceMappingURL=AdaptiveCardDesignerHost.js.map
import { Card, Text, Flex } from "@fluentui/react-northstar";
import * as React from "react";
import * as strings from 'ControlStrings';
export var WidgetFooter = function (_a) {
    var widget = _a.widget;
    return (React.createElement(Card.Footer, { fitted: true },
        React.createElement(Flex, { space: "between", vAlign: "center" },
            React.createElement(Text, { as: "a", href: widget.link.href, target: "_blank", content: strings.ViewMore, size: "small", color: "brand", style: { textDecoration: "none" } }))));
};
//# sourceMappingURL=WidgetFooter.js.map
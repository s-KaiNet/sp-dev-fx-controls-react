import { __assign, __rest } from "tslib";
import * as React from "react";
import { assertValidHtmlId } from "../helpers/uuid";
import { Consumer as ItemConsumer } from "./ItemContext";
var AccordionItemPanel = function (_a) {
    var _b = _a.className, className = _b === void 0 ? 'accordion__panel' : _b, id = _a.id, rest = __rest(_a, ["className", "id"]);
    var renderChildren = function (_a) {
        var panelAttributes = _a.panelAttributes;
        if (id) {
            assertValidHtmlId(id);
        }
        return (React.createElement("div", __assign({ "data-accordion-component": "AccordionItemPanel", className: className }, rest, panelAttributes)));
    };
    return React.createElement(ItemConsumer, null, renderChildren);
};
export default AccordionItemPanel;
//# sourceMappingURL=AccordionItemPanel.js.map
import { __assign, __rest } from "tslib";
import * as React from "react";
import { useState } from "react";
import DisplayName from "../helpers/DisplayName";
import { assertValidHtmlId, nextUuid } from "../helpers/uuid";
import { Consumer as ItemConsumer, Provider as ItemProvider } from "./ItemContext";
var AccordionItem = function (_a) {
    var customUuid = _a.uuid, dangerouslySetExpanded = _a.dangerouslySetExpanded, _b = _a.className, className = _b === void 0 ? 'accordion__item' : _b, activeClassName = _a.activeClassName, rest = __rest(_a, ["uuid", "dangerouslySetExpanded", "className", "activeClassName"]);
    var instanceUuid = useState(nextUuid())[0];
    var uuid = customUuid || instanceUuid;
    var renderChildren = function (itemContext) {
        var expanded = itemContext.expanded;
        var cx = expanded && activeClassName ? activeClassName : className;
        return (React.createElement("div", __assign({ "data-accordion-component": "AccordionItem", className: cx }, rest)));
    };
    assertValidHtmlId(uuid);
    if (rest.id) {
        assertValidHtmlId(rest.id);
    }
    return (React.createElement(ItemProvider, { uuid: uuid, dangerouslySetExpanded: dangerouslySetExpanded },
        React.createElement(ItemConsumer, null, renderChildren)));
};
AccordionItem.displayName = DisplayName.AccordionItem;
export default AccordionItem;
//# sourceMappingURL=AccordionItem.js.map
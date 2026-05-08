import { __assign, __rest } from "tslib";
import "../css/AccordionStylesOverride.css";
import * as React from "react";
import { Provider } from "./AccordionContext";
import { getFluentUIThemeOrDefault } from "../../../common/utilities/ThemeUtility";
import { useTheme } from "@fluentui/react-theme-provider/lib/useTheme";
import { useEffect, useRef } from "react";
var Accordion = function (_a) {
    var _b = _a.className, className = _b === void 0 ? 'accordion' : _b, allowMultipleExpanded = _a.allowMultipleExpanded, allowZeroExpanded = _a.allowZeroExpanded, onChange = _a.onChange, preExpanded = _a.preExpanded, theme = _a.theme, rest = __rest(_a, ["className", "allowMultipleExpanded", "allowZeroExpanded", "onChange", "preExpanded", "theme"]);
    var contextTheme = useTheme();
    var divElement = useRef(null);
    useEffect(function () {
        if (divElement.current) {
            var themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
            divElement.current.style.setProperty("--accordion-bodyDivider", themeToApply.semanticColors.bodyDivider);
            divElement.current.style.setProperty("--accordion-buttonBackground", themeToApply.semanticColors.buttonBackground);
            divElement.current.style.setProperty("--accordion-buttonText", themeToApply.semanticColors.buttonText);
            divElement.current.style.setProperty("--accordion-buttonBackgroundHovered", themeToApply.semanticColors.buttonBackgroundHovered);
            divElement.current.style.setProperty("--accordion-bodyBackground", themeToApply.semanticColors.bodyBackground);
            divElement.current.style.setProperty("--accordion-bodyText", themeToApply.semanticColors.bodyText);
        }
    });
    return (React.createElement(Provider, { preExpanded: preExpanded, allowMultipleExpanded: allowMultipleExpanded, allowZeroExpanded: allowZeroExpanded, onChange: onChange },
        React.createElement("div", __assign({ "data-accordion-component": "Accordion", className: className, ref: divElement }, rest))));
};
export default Accordion;
//# sourceMappingURL=Accordion.js.map
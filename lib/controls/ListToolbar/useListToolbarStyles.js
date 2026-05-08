import { __makeTemplateObject } from "tslib";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";
export var useListToolbarStyles = function () {
    return {
        /** Outer toolbar container */
        toolbar: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      padding: ", " ", ";\n      background-color: ", ";\n      border-bottom: 1px solid ", ";\n      min-height: 48px;\n      gap: ", ";\n      white-space: nowrap;\n      position: relative;\n    "], ["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      padding: ", " ", ";\n      background-color: ", ";\n      border-bottom: 1px solid ", ";\n      min-height: 48px;\n      gap: ", ";\n      white-space: nowrap;\n      position: relative;\n    "])), tokens.spacingVerticalS, tokens.spacingHorizontalM, tokens.colorNeutralBackground1, tokens.colorNeutralStroke2, tokens.spacingHorizontalXS),
        /** Visible container for regular (left-side) items */
        leftSection: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      gap: ", ";\n      flex: 0 0 auto !important;\n      min-width: 0;\n    "], ["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      gap: ", ";\n      flex: 0 0 auto !important;\n      min-width: 0;\n    "])), tokens.spacingHorizontalXS),
        /** Hidden mirror — renders ALL items for unclipped measurement */
        measureSection: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center;\n      gap: ", ";\n      position: absolute;\n      top: 0;\n      left: 0;\n      visibility: hidden;\n      pointer-events: none;\n      height: 0;\n      overflow: visible;\n      z-index: -1;\n    "], ["\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center;\n      gap: ", ";\n      position: absolute;\n      top: 0;\n      left: 0;\n      visibility: hidden;\n      pointer-events: none;\n      height: 0;\n      overflow: visible;\n      z-index: -1;\n    "])), tokens.spacingHorizontalXS),
        /** Far-items group — pushed to the right edge */
        rightGroup: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      gap: ", ";\n      flex: 0 0 auto !important;\n      margin-left: auto;\n      white-space: nowrap;\n    "], ["\n      display: flex !important;\n      flex-wrap: nowrap !important;\n      align-items: center !important;\n      gap: ", ";\n      flex: 0 0 auto !important;\n      margin-left: auto;\n      white-space: nowrap;\n    "])), tokens.spacingHorizontalXS),
        /** Inner wrapper for far-items inside rightGroup */
        farItemsContainer: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center;\n      gap: inherit;\n    "], ["\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center;\n      gap: inherit;\n    "]))),
        /** Base style for all ToolbarButton instances */
        toolbarButtonBase: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      min-width: auto;\n    "], ["\n      min-width: auto;\n    "]))),
        /** "..." overflow menu trigger button */
        overflowButton: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      flex-shrink: 0;\n    "], ["\n      flex-shrink: 0;\n    "]))),
        /** Count badge — hidden on mobile */
        countBadge: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      flex-shrink: 0;\n      @media (max-width: 768px) {\n        display: none;\n      }\n    "], ["\n      flex-shrink: 0;\n      @media (max-width: 768px) {\n        display: none;\n      }\n    "]))),
        /** Divider between groups */
        divider: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      height: 24px;\n      margin: 0 ", ";\n    "], ["\n      height: 24px;\n      margin: 0 ", ";\n    "])), tokens.spacingHorizontalXS),
        /** Regular toolbar item */
        toolbarItem: css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      flex-shrink: 0;\n      width: fit-content;\n      white-space: nowrap;\n    "], ["\n      flex-shrink: 0;\n      width: fit-content;\n      white-space: nowrap;\n    "]))),
        /** Far-item button */
        farItemButton: css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      flex-shrink: 0;\n    "], ["\n      flex-shrink: 0;\n    "]))),
        /** Label text inside far-item buttons — hidden on mobile */
        farItemLabel: css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n      @media (max-width: 768px) {\n        display: none;\n      }\n    "], ["\n      @media (max-width: 768px) {\n        display: none;\n      }\n    "]))),
    };
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=useListToolbarStyles.js.map
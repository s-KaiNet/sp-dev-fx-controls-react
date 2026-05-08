import { __assign } from "tslib";
import styles from "./Toolbar.module.scss";
var slugSeparator = "__";
export function needsSeparator(actionSlug, index, actionSlugs) {
    if (index === 0) {
        return false;
    }
    else if (actionSlugs[index - 1]) {
        return actionSlugs[index - 1].split(slugSeparator)[0] !==
            actionSlug.split(slugSeparator)[0];
    }
}
export function flattenedActions(actionGroups) {
    return Object.keys(actionGroups).reduce(function (acc_i, actionGroupSlug) {
        var actionGroup = actionGroups[actionGroupSlug];
        return Object.keys(actionGroup).reduce(function (acc_j, actionSlug) {
            var action = actionGroup[actionSlug];
            acc_j["".concat(actionGroupSlug).concat(slugSeparator).concat(actionSlug)] = action;
            return acc_j;
        }, acc_i);
    }, {});
}
export function getInFlowToolbarItems(allActions, childredFactory) {
    return Object.keys(allActions).reduce(function (acc, actionSlug, index, actionSlugs) {
        var action = allActions[actionSlug];
        acc.push(__assign(__assign({}, action), { key: actionSlug, children: childredFactory(action), title: action.title, "aria-label": action.title, className: "extended-toolbar__near-side__item " + styles.toolbarButtonStyles, styles: {
                flex: "0 0 auto",
                margin: "0 .0625rem",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
            } }));
        if (needsSeparator(actionSlug, index, actionSlugs))
            acc.push({
                key: "divider".concat(slugSeparator).concat(index),
                kind: "divider",
            });
        return acc;
    }, []);
}
export function getOverflowToolbarItems(allActions, childredFactory) {
    return Object.keys(allActions).reduce(function (acc, actionSlug, index, actionSlugs) {
        var action = allActions[actionSlug];
        acc.push({
            key: actionSlug,
            content: action.title,
            icon: childredFactory(action),
            title: action.title,
            "aria-label": action.title,
            styles: { padding: ".375rem .5rem" },
            onClick: action.onClick
        });
        if (needsSeparator(actionSlug, index, actionSlugs))
            acc.push({
                key: "divider".concat(slugSeparator).concat(index),
                kind: "divider",
                styles: { margin: ".25rem 0", "&:first-child": { display: "none" } },
            });
        return acc;
    }, []);
}
//# sourceMappingURL=ToolbarActionsUtils.js.map
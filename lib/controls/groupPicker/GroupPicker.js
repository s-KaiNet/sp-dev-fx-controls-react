import { __assign, __awaiter, __generator } from "tslib";
import * as React from "react";
import { TagPicker, } from "@fluentui/react/lib/Pickers";
import { useGroups } from "../../hooks";
import { useGroupPickerStyles } from "./GroupPickerStyles";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Customizer } from "@fluentui/react/lib/Utilities";
import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import strings from "ControlStrings";
var pickerSuggestionsProps = {
    suggestionsHeaderText: strings.GroupPickerSuggestionsHeaderText,
    noResultsFoundText: strings.genericNoResultsFoundText,
};
var initialState = {
    savedSelectedGroups: [],
};
var getTextFromItem = function (item) { return item.name; };
var matchGroupType = function (group, groupType) {
    var _a;
    if (!groupType || groupType === "All")
        return true;
    var isUnified = (_a = group.groupTypes) === null || _a === void 0 ? void 0 : _a.includes("Unified");
    var isSecurity = !!group.securityEnabled && !isUnified;
    if (groupType === "M365")
        return isUnified;
    if (groupType === "Security")
        return isSecurity;
    return true;
};
var reducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case "UPDATE_SELECTEDITEM":
            return __assign(__assign({}, state), { savedSelectedGroups: action.payload });
        default:
            return state;
    }
};
export var GroupPicker = function (props) {
    var _a;
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    var picker = React.useRef(null);
    var serviceScope = props.appcontext.serviceScope;
    var getGroups = useGroups(serviceScope).getGroups;
    var onSelectedGroups = props.onSelectedGroups, selectedGroups = props.selectedGroups, itemLimit = props.itemLimit, multiSelect = props.multiSelect, label = props.label, styles = props.styles, themeVariant = props.themeVariant, groupType = props.groupType;
    var _c = useGroupPickerStyles(themeVariant), pickerStylesMulti = _c.pickerStylesMulti, pickerStylesSingle = _c.pickerStylesSingle, renderItemStylesMulti = _c.renderItemStylesMulti, renderItemStylesSingle = _c.renderItemStylesSingle, renderIconButtonRemoveStyles = _c.renderIconButtonRemoveStyles, componentClasses = _c.componentClasses;
    var groupTypeById = React.useRef({});
    var getGroupTypeIcon = React.useCallback(function (groupId) {
        if (!groupId)
            return null;
        var groupType = groupTypeById.current[groupId.toString()];
        if (!groupType)
            return null;
        if (groupType === "m365") {
            return (React.createElement(FontIcon, { iconName: "OfficeLogo", className: componentClasses.groupTypeIconM365, title: strings.GroupPickerGroupTypeM365Label, "aria-label": strings.GroupPickerGroupTypeM365Label }));
        }
        return (React.createElement(FontIcon, { iconName: "LockSolid", className: componentClasses.groupTypeIconSecurity, title: strings.GroupPickerGroupTypeSecurityLabel, "aria-label": strings.GroupPickerGroupTypeSecurityLabel }));
    }, [componentClasses.groupTypeIconM365, componentClasses.groupTypeIconSecurity]);
    var useFilterSuggestedGroups = React.useCallback(function (filterText, groupsList) { return __awaiter(void 0, void 0, void 0, function () {
        var tags, groups, _i, groups_1, group, isUnified, groupTypeKey, checkExists, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tags = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getGroups(filterText)];
                case 2:
                    groups = _b.sent();
                    if (groups === null || groups === void 0 ? void 0 : groups.length) {
                        for (_i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                            group = groups_1[_i];
                            if (!matchGroupType(group, groupType))
                                continue;
                            isUnified = (_a = group.groupTypes) === null || _a === void 0 ? void 0 : _a.includes("Unified");
                            groupTypeKey = isUnified
                                ? "m365"
                                : group.securityEnabled
                                    ? "security"
                                    : undefined;
                            if (groupTypeKey) {
                                groupTypeById.current[group.id] = groupTypeKey;
                            }
                            checkExists = find(groupsList, { key: group.id });
                            if (checkExists)
                                continue;
                            tags.push({ key: group.id, name: group.displayName });
                        }
                    }
                    return [2 /*return*/, tags];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [2 /*return*/, tags];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [groupType, getGroups]);
    React.useEffect(function () {
        dispatch({
            type: "UPDATE_SELECTEDITEM",
            payload: selectedGroups,
        });
    }, [props]);
    var _onRenderItem = React.useCallback(function (itemProps) {
        var savedSelectedGroups = state.savedSelectedGroups;
        if (itemProps.item) {
            return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 7 }, styles: (multiSelect !== null && multiSelect !== void 0 ? multiSelect : true) && (itemLimit && itemLimit > 1)
                    ? renderItemStylesMulti
                    : renderItemStylesSingle },
                React.createElement(FontIcon, { iconName: "Group" }),
                React.createElement(Text, { variant: "medium" }, itemProps.item.name),
                getGroupTypeIcon(itemProps.item.key),
                React.createElement(IconButton, { styles: renderIconButtonRemoveStyles, iconProps: { iconName: "Cancel" }, title: strings.TeamPickerButtonRemoveTitle, onClick: function () {
                        var _newSelectedGroups = pullAllBy(savedSelectedGroups, [
                            itemProps.item,
                        ]);
                        dispatch({
                            type: "UPDATE_SELECTEDITEM",
                            payload: _newSelectedGroups,
                        });
                        onSelectedGroups(_newSelectedGroups);
                    } })));
        }
        return null;
    }, [
        state.savedSelectedGroups,
        renderItemStylesMulti,
        renderItemStylesSingle,
        renderIconButtonRemoveStyles,
        itemLimit,
        onSelectedGroups,
    ]);
    var _onRenderSuggestionsItem = React.useCallback(function (propsTag, _itemProps) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 5, padding: 10 } },
            React.createElement(FontIcon, { iconName: "Group" }),
            React.createElement(Text, { variant: "smallPlus" }, propsTag.name),
            getGroupTypeIcon(propsTag.key)));
    }, []);
    return (React.createElement(Customizer, { settings: { theme: props.themeVariant } },
        React.createElement("div", { style: { width: "100%" } },
            label && React.createElement(Label, null, label),
            React.createElement(TagPicker, { styles: styles !== null && styles !== void 0 ? styles : ((multiSelect !== null && multiSelect !== void 0 ? multiSelect : true) && (itemLimit && itemLimit > 1)
                    ? pickerStylesMulti
                    : pickerStylesSingle), selectedItems: state.savedSelectedGroups, onRenderItem: _onRenderItem, onRenderSuggestionsItem: _onRenderSuggestionsItem, onResolveSuggestions: useFilterSuggestedGroups, getTextFromItem: getTextFromItem, pickerSuggestionsProps: pickerSuggestionsProps, onEmptyResolveSuggestions: function (selectGroups) {
                    return useFilterSuggestedGroups("", selectGroups);
                }, itemLimit: (multiSelect !== null && multiSelect !== void 0 ? multiSelect : true) ? ((_a = props.itemLimit) !== null && _a !== void 0 ? _a : undefined) : 1, onChange: function (items) {
                    dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
                    props.onSelectedGroups(items);
                }, componentRef: picker }))));
};
//# sourceMappingURL=GroupPicker.js.map
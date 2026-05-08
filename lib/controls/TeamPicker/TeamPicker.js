import { __assign, __awaiter, __generator } from "tslib";
import * as React from "react";
import { TagPicker, } from "@fluentui/react/lib/Pickers";
import { useTeams } from "../../hooks";
import { TEAMS_SVG_LOGO } from "./constants";
import { useTeamPickerStyles } from "./TeamPickerStyles";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";
import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import { ImageIcon } from "@fluentui/react/lib/Icon";
import { Customizer } from "@fluentui/react/lib/Utilities";
import strings from "ControlStrings";
var pickerSuggestionsProps = {
    suggestionsHeaderText: strings.TeamPickerSugestionsHeaderText,
    noResultsFoundText: strings.TeamPickernoResultsFoundText,
};
var initialState = {
    savedSelectedTeams: [],
};
var getTextFromItem = function (item) { return item.name; };
// Reducer to update state
var reducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case "UPDATE_SELECTEDITEM":
            return __assign(__assign({}, state), { savedSelectedTeams: action.payload });
        default:
            return state;
    }
};
// select Team control
export var TeamPicker = function (props) {
    var _a;
    // initialize reducer
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    var picker = React.useRef(null);
    var serviceScope = props.appcontext.serviceScope;
    var getMyTeams = useTeams(serviceScope).getMyTeams;
    var onSelectedTeams = props.onSelectedTeams, selectedTeams = props.selectedTeams, itemLimit = props.itemLimit, label = props.label, styles = props.styles, themeVariant = props.themeVariant;
    var _c = useTeamPickerStyles(themeVariant), pickerStylesMulti = _c.pickerStylesMulti, pickerStylesSingle = _c.pickerStylesSingle, renderItemStylesMulti = _c.renderItemStylesMulti, renderItemStylesSingle = _c.renderItemStylesSingle, renderIconButtonRemoveStyles = _c.renderIconButtonRemoveStyles;
    var useFilterSuggestedTeams = React.useCallback(function (filterText, teamsList) { return __awaiter(void 0, void 0, void 0, function () {
        var tags, teams, _i, teams_1, team, checkExists, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getMyTeams(filterText)];
                case 2:
                    teams = _a.sent();
                    if (teams === null || teams === void 0 ? void 0 : teams.length) {
                        for (_i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                            team = teams_1[_i];
                            checkExists = find(teamsList, { key: team.id });
                            if (checkExists)
                                continue;
                            tags.push({ key: team.id, name: team.displayName });
                        }
                    }
                    return [2 /*return*/, tags];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, tags];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    React.useEffect(function () {
        dispatch({
            type: "UPDATE_SELECTEDITEM",
            payload: selectedTeams,
        });
    }, [props]);
    var _onRenderItem = React.useCallback(function (itemProps) {
        var savedSelectedTeams = state.savedSelectedTeams;
        if (itemProps.item) {
            return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 7 }, styles: itemLimit && itemLimit > 1
                    ? renderItemStylesMulti
                    : renderItemStylesSingle },
                React.createElement(ImageIcon, { imageProps: {
                        src: TEAMS_SVG_LOGO,
                        width: 18,
                        height: 18,
                    } }),
                React.createElement(Text, { variant: "medium" }, itemProps.item.name),
                React.createElement(IconButton, { styles: renderIconButtonRemoveStyles, iconProps: { iconName: "Cancel" }, title: strings.TeamPickerButtonRemoveTitle, onClick: function (ev) {
                        var _newSelectedTeams = pullAllBy(savedSelectedTeams, [
                            itemProps.item,
                        ]);
                        dispatch({
                            type: "UPDATE_SELECTEDITEM",
                            payload: _newSelectedTeams,
                        });
                        onSelectedTeams(_newSelectedTeams);
                    } })));
        }
        else {
            return null;
        }
    }, [
        selectedTeams,
        state.savedSelectedTeams,
        props.themeVariant,
        renderItemStylesSingle,
        renderIconButtonRemoveStyles,
        renderItemStylesMulti,
    ]);
    // reder sugestion Items
    var _onRenderSuggestionsItem = React.useCallback(function (propsTag, itemProps) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 5, padding: 10 } },
            React.createElement(ImageIcon, { imageProps: {
                    src: TEAMS_SVG_LOGO,
                    width: 18,
                    height: 18,
                } }),
            React.createElement(Text, { variant: "smallPlus" }, propsTag.name)));
    }, [props.themeVariant]);
    // Render  control
    return (React.createElement(Customizer, { settings: { theme: props.themeVariant } },
        React.createElement("div", { style: { width: "100%" } },
            label && React.createElement(Label, null, label),
            React.createElement(TagPicker, { styles: styles !== null && styles !== void 0 ? styles : (itemLimit && itemLimit > 1
                    ? pickerStylesMulti
                    : pickerStylesSingle), selectedItems: state.savedSelectedTeams, onRenderItem: _onRenderItem, onRenderSuggestionsItem: _onRenderSuggestionsItem, onResolveSuggestions: useFilterSuggestedTeams, getTextFromItem: getTextFromItem, pickerSuggestionsProps: pickerSuggestionsProps, onEmptyResolveSuggestions: function (selectTeams) {
                    return useFilterSuggestedTeams("", selectTeams);
                }, itemLimit: (_a = props.itemLimit) !== null && _a !== void 0 ? _a : undefined, onChange: function (items) {
                    dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
                    props.onSelectedTeams(items);
                }, componentRef: picker }))));
};
//# sourceMappingURL=TeamPicker.js.map
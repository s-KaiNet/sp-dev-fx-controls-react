import { __assign, __awaiter, __generator } from "tslib";
import * as React from "react";
import { TagPicker, } from "@fluentui/react/lib/Pickers";
import { useTeams } from "../../hooks";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Label } from "@fluentui/react/lib/Label";
import { useTeamChannelPickerStyles } from "./TeamChannelPickerStyles";
import { EMembershipType } from "./EMembersipType";
import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import { Customizer } from "@fluentui/react/lib/Utilities";
import strings from "ControlStrings";
var theme = window.__themeState__.theme;
var initialState = {
    selectedTeamsChannels: [],
};
var getTextFromItem = function (item) { return item.name.split(",")[0]; };
// Reducer to update state
var reducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case "UPDATE_SELECTEDITEM":
            return __assign(__assign({}, state), { selectedTeamsChannels: action.payload });
        default:
            return state;
    }
};
// select Team control
export var TeamChannelPicker = function (props) {
    // initialize reducer
    var _a = React.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    var picker = React.useRef(null);
    var serviceScope = props.appcontext.serviceScope;
    var getTeamChannels = useTeams(serviceScope).getTeamChannels;
    var onSelectedChannels = props.onSelectedChannels, selectedChannels = props.selectedChannels, itemLimit = props.itemLimit, styles = props.styles, themeVariant = props.themeVariant;
    var _b = useTeamChannelPickerStyles(themeVariant), renderItemStylesSingle = _b.renderItemStylesSingle, renderItemStylesMulti = _b.renderItemStylesMulti, pickerStylesMulti = _b.pickerStylesMulti, pickerStylesSingle = _b.pickerStylesSingle, renderIconButtonRemoveStyles = _b.renderIconButtonRemoveStyles, componentClasses = _b.componentClasses;
    var pickerSuggestionsProps = {
        suggestionsHeaderText: strings.TeamChannelPickerSugestionHeaderText,
        noResultsFoundText: strings.TeamsChannelPickerNoresultsFoundText,
    };
    /**
     *  Get Sugested Teams
     */
    var useFilterSuggestedTeamsChannels = React.useCallback(function (filterText, teamsChannelList) { return __awaiter(void 0, void 0, void 0, function () {
        var tags, teamsChannels, _i, teamsChannels_1, teamChannel, checkExists, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tags = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getTeamChannels(props.teamId.toString(), filterText)];
                case 2:
                    teamsChannels = _b.sent();
                    if (teamsChannels === null || teamsChannels === void 0 ? void 0 : teamsChannels.length) {
                        for (_i = 0, teamsChannels_1 = teamsChannels; _i < teamsChannels_1.length; _i++) {
                            teamChannel = teamsChannels_1[_i];
                            checkExists = find(teamsChannelList, { key: teamChannel.id });
                            if (checkExists)
                                continue;
                            tags.push({
                                key: teamChannel.id,
                                name: "".concat(teamChannel.displayName, ",").concat(teamChannel.membershipType, ",").concat((_a = teamChannel.isFavoriteByDefault) !== null && _a !== void 0 ? _a : "false"),
                            });
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, tags];
            }
        });
    }); }, [props.teamId]);
    React.useEffect(function () {
        dispatch({
            type: "UPDATE_SELECTEDITEM",
            payload: selectedChannels,
        });
    }, [props.teamId]);
    var _renderChannelInformation = React.useCallback(function (propsTag) {
        var _returnControls = [];
        var _splitName = propsTag.name.split(",");
        var _displayName = _splitName[0];
        var _membershipType = _splitName[1];
        var _isFavoriteByDefault = _splitName[2];
        _returnControls.push(React.createElement(Text, { variant: "medium" }, _displayName));
        if (_membershipType === EMembershipType.Private) {
            _returnControls.push(React.createElement(FontIcon, { title: strings.TeamChannelPickerFontIconPrivateChannelTitle, iconName: "LockSolid", className: componentClasses.iconChannelInfoStyles }));
        }
        if (_isFavoriteByDefault && _isFavoriteByDefault === "true") {
            _returnControls.push(React.createElement(FontIcon, { title: strings.TeamChannelPickerFontIconFavoriteText, iconName: "FavoriteStarFill", className: componentClasses.iconChannelInfoStyles }));
        }
        return _returnControls;
    }, []);
    // reder sugestion Items
    var _onRenderSuggestionsItem = React.useCallback(function (propsTag, itemProps) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "stretch", verticalAlign: "center", styles: { root: { width: "100%" } }, tokens: { childrenGap: 10, padding: 10 } },
            React.createElement(FontIcon, { iconName: "ChatInviteFriend", className: componentClasses.iconChannelItemStyles }),
            _renderChannelInformation(propsTag)));
    }, [theme, themeVariant]);
    // Default RenderItem
    var _onRenderItem = React.useCallback(function (itemProps) {
        var selectedTeamsChannels = state.selectedTeamsChannels;
        if (itemProps.item) {
            return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 5 }, styles: itemLimit && itemLimit > 1
                    ? renderItemStylesMulti
                    : renderItemStylesSingle },
                React.createElement(FontIcon, { iconName: "ChatInviteFriend", className: componentClasses.iconChannelItemStyles }),
                _renderChannelInformation(itemProps.item),
                React.createElement(IconButton, { styles: renderIconButtonRemoveStyles, iconProps: { iconName: "Cancel" }, title: strings.TeamsChannelPickerButtonRemoveTitle, onClick: function (ev) {
                        var _newSelectedTeamsChannels = pullAllBy(selectedTeamsChannels, [itemProps.item]);
                        dispatch({
                            type: "UPDATE_SELECTEDITEM",
                            payload: _newSelectedTeamsChannels,
                        });
                        props.onSelectedChannels(_newSelectedTeamsChannels);
                    } })));
        }
        else {
            return null;
        }
    }, [
        state.selectedTeamsChannels,
        props.onSelectedChannels,
        themeVariant,
        renderIconButtonRemoveStyles,
        renderItemStylesMulti,
        renderItemStylesSingle,
    ]);
    // Render  control
    return (React.createElement(Customizer, { settings: { theme: props.themeVariant } },
        React.createElement("div", { style: { width: "100%" } },
            props.label && React.createElement(Label, null, props.label),
            React.createElement(TagPicker, { styles: styles !== null && styles !== void 0 ? styles : (itemLimit && itemLimit > 1
                    ? pickerStylesMulti
                    : pickerStylesSingle), selectedItems: state.selectedTeamsChannels, onRenderItem: _onRenderItem, onRenderSuggestionsItem: _onRenderSuggestionsItem, ref: picker, onResolveSuggestions: useFilterSuggestedTeamsChannels, getTextFromItem: getTextFromItem, pickerSuggestionsProps: pickerSuggestionsProps, onEmptyResolveSuggestions: function (selectTeams) {
                    return useFilterSuggestedTeamsChannels("", selectTeams);
                }, itemLimit: itemLimit !== null && itemLimit !== void 0 ? itemLimit : undefined, onChange: function (items) {
                    dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
                    onSelectedChannels(items);
                }, componentRef: picker }))));
};
//# sourceMappingURL=TeamChannelPicker.js.map
import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import * as React from "react";
import { PersonCardInteraction } from "@microsoft/mgt-spfx";
import { People } from "@microsoft/mgt-react/dist/es6/spfx";
import { getMyTeamsStyles } from "../../MyTeamsStyles";
import { CommandButton } from "@fluentui/react/lib/Button";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Text } from "@fluentui/react/lib/Text";
import { Stack, StackItem } from "@fluentui/react/lib/Stack";
import { ContextualMenuItemType, } from "@fluentui/react/lib/ContextualMenu";
import { useTeams } from "../../../../hooks";
import { EMembershipType } from "../../../../common/model/EMembershipType";
import { ShowMessage } from "../ShowMessage";
import { MessageBarType } from "@fluentui/react/lib/MessageBar";
import strings from "ControlStrings";
import { teamsReducer } from "./TeamReducer";
import { ETeamTypes } from "./ETeamTypes";
var initialState = {
    teamMembers: [],
    teamsOwners: undefined,
    channelsMenu: { items: [] },
    hasError: false,
    isLoading: true,
    message: undefined,
};
export var Team = function (props) {
    var team = props.team, serviceScope = props.serviceScope, onSelectedChannel = props.onSelectedChannel, themeVariant = props.themeVariant, enablePersonCardInteraction = props.enablePersonCardInteraction;
    var styleClasses = getMyTeamsStyles(themeVariant).styleClasses;
    var _a = useTeams(serviceScope), getTeamMembers = _a.getTeamMembers, getTeamChannels = _a.getTeamChannels, getTeamOwners = _a.getTeamOwners;
    var _b = React.useReducer(teamsReducer, initialState), state = _b[0], dispatch = _b[1];
    var onClickChannel = React.useCallback(function (ev, item) {
        if (onSelectedChannel) {
            onSelectedChannel(item.data.teamId, item.key);
        }
        else {
            window.open(item.data.webUrl);
        }
    }, [onSelectedChannel]);
    var _renderItem = React.useCallback(function (itemProps) {
        return (React.createElement(Stack, { horizontalAlign: "start", horizontal: true, verticalAlign: "center", tokens: { childrenGap: 10 }, styles: { root: { paddingLeft: 10, paddingRight: 10 } } },
            React.createElement(FontIcon, { iconName: itemProps.item.iconProps.iconName }),
            React.createElement(Text, { variant: "small", block: true },
                itemProps.item.text,
                " "),
            itemProps.item.secondaryText === "isFavourite" ? (React.createElement(Stack, { horizontal: true, horizontalAlign: "end", verticalAlign: "center" },
                React.createElement(FontIcon, { iconName: "FavoriteStarFill" }))) : null));
    }, []);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _members, teamOwners, _renderOwners, _i, teamOwners_1, teamOwner, publicChannels, privateChannels, _renderMembers, _a, _members_1, teamMember, channels, _b, channels_1, channel, allChannels, error_1, messageError;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        dispatch({
                            type: ETeamTypes.SET_HAS_ERROR,
                            payload: false,
                        });
                        dispatch({
                            type: ETeamTypes.SET_IS_LOADING,
                            payload: true,
                        });
                        dispatch({
                            type: ETeamTypes.SET_MESSAGE,
                            payload: undefined,
                        });
                        return [4 /*yield*/, getTeamMembers(team.id)];
                    case 1:
                        _members = _c.sent();
                        return [4 /*yield*/, getTeamOwners(team.id)];
                    case 2:
                        teamOwners = _c.sent();
                        _renderOwners = [];
                        for (_i = 0, teamOwners_1 = teamOwners; _i < teamOwners_1.length; _i++) {
                            teamOwner = teamOwners_1[_i];
                            _renderOwners.push(teamOwner.displayName);
                        }
                        dispatch({
                            type: ETeamTypes.SET_TEAM_OWNERS,
                            payload: _renderOwners.join(","),
                        });
                        publicChannels = [];
                        privateChannels = [];
                        _renderMembers = [];
                        for (_a = 0, _members_1 = _members; _a < _members_1.length; _a++) {
                            teamMember = _members_1[_a];
                            _renderMembers.push(teamMember.userId);
                        }
                        dispatch({
                            type: ETeamTypes.SET_TEAM_MEMBERS,
                            payload: _renderMembers,
                        });
                        return [4 /*yield*/, getTeamChannels(team.id)];
                    case 3:
                        channels = _c.sent();
                        publicChannels.push({
                            itemType: ContextualMenuItemType.Header,
                            key: "public",
                            text: strings.MyTeamsTeamChannelPublicMessage,
                            iconProps: { iconName: "People" },
                        });
                        publicChannels.push({
                            itemType: ContextualMenuItemType.Divider,
                            key: "div",
                        });
                        for (_b = 0, channels_1 = channels; _b < channels_1.length; _b++) {
                            channel = channels_1[_b];
                            switch (channel.membershipType) {
                                // channels private
                                case EMembershipType.Private:
                                    privateChannels.push({
                                        iconProps: { iconName: "ChatInviteFriend" },
                                        itemType: ContextualMenuItemType.Normal,
                                        key: channel.id,
                                        text: channel.displayName,
                                        data: { webUrl: channel.webUrl, teamId: team.id },
                                        secondaryText: channel.isFavoriteByDefault ? "isFavourite" : "",
                                        onClick: onClickChannel,
                                    });
                                    break;
                                // Channel
                                default:
                                    publicChannels.push({
                                        iconProps: { iconName: "ChatInviteFriend" },
                                        itemType: ContextualMenuItemType.Normal,
                                        key: channel.id,
                                        text: channel.displayName,
                                        data: { webUrl: channel.webUrl, teamId: team.id },
                                        secondaryText: channel.isFavoriteByDefault ? "isFavourite" : "",
                                        onClick: onClickChannel,
                                    });
                                    break;
                            }
                        }
                        // at the end add private header
                        publicChannels.push({
                            itemType: ContextualMenuItemType.Header,
                            key: "private",
                            text: strings.MyTeamsTeamChannelTypeMessage,
                            iconProps: { iconName: "SecurityGroup" },
                        });
                        allChannels = __spreadArray(__spreadArray([], publicChannels, true), privateChannels, true);
                        dispatch({
                            type: ETeamTypes.SET_TEAM_CHANNELS,
                            payload: {
                                items: allChannels,
                                contextualMenuItemAs: _renderItem,
                            },
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        messageError = {
                            isShow: true,
                            message: strings.MyTeamsMessageError,
                            messageBarType: MessageBarType.error,
                        };
                        console.log(error_1);
                        dispatch({
                            type: ETeamTypes.SET_IS_LOADING,
                            payload: false,
                        });
                        dispatch({
                            type: ETeamTypes.SET_MESSAGE,
                            payload: messageError,
                        });
                        dispatch({
                            type: ETeamTypes.SET_HAS_ERROR,
                            payload: true,
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, []);
    var teamMembers = state.teamMembers, teamsOwners = state.teamsOwners, hasError = state.hasError, channelsMenu = state.channelsMenu, message = state.message;
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { className: styleClasses.teamContainer, verticalAlign: "start", tokens: { childrenGap: 15 } }, hasError ? (React.createElement(ShowMessage, __assign({}, message))) : (React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between", verticalAlign: "center", wrap: true },
            React.createElement(StackItem, { align: "start" },
                React.createElement(Text, { variant: "xLarge", block: true, styles: { root: { fontWeight: 500 } } }, team.displayName),
                React.createElement(Text, { variant: "small", block: true, styles: { root: { fontWeight: 400 } } },
                    "owners: ",
                    teamsOwners)),
            React.createElement(Stack, { horizontalAlign: "end", horizontal: true, verticalAlign: "center", tokens: { childrenGap: 10 } },
                React.createElement(People, { userIds: teamMembers, showPresence: true, showMax: 6, personCardInteraction: enablePersonCardInteraction
                        ? PersonCardInteraction.hover
                        : PersonCardInteraction.none }),
                React.createElement(CommandButton, { iconProps: { iconName: "PageList" }, text: "channel", menuProps: channelsMenu })))))));
};
//# sourceMappingURL=Team.js.map
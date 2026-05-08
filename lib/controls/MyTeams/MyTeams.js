import { __assign, __awaiter, __generator } from "tslib";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Customizer } from "@fluentui/react/lib/Utilities";
import * as React from "react";
import { getMyTeamsStyles } from "./MyTeamsStyles";
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";
import { Team } from "../MyTeams/components/Team";
import { useTeams } from "./../../hooks";
import { ShowMessage } from "../MyTeams/components/ShowMessage";
import strings from "ControlStrings";
import { myTeamsReducer } from './MyTeamsReducer';
import { EMyTeamsTypes } from './EMyTeamsTypes';
var initialState = {
    myTeams: [],
    message: undefined,
    hasError: false,
    isLoading: true,
};
export var MyTeams = function (props) {
    var _a = getMyTeamsStyles(props.themeVariant), stackStyles = _a.stackStyles, stackTokens = _a.stackTokens, styleClasses = _a.styleClasses, titleStyles = _a.titleStyles;
    var title = props.title, webPartContext = props.webPartContext, onSelectedChannel = props.onSelectedChannel, themeVariant = props.themeVariant, enablePersonCardInteraction = props.enablePersonCardInteraction;
    var _b = React.useReducer(myTeamsReducer, initialState), state = _b[0], dispatch = _b[1];
    Providers.globalProvider = React.useMemo(function () {
        if (!Providers.globalProvider) {
            return new SharePointProvider(webPartContext);
        }
        return;
    }, [props.webPartContext]);
    var getMyTeams = useTeams(webPartContext.serviceScope).getMyTeams;
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _teams, _a, messageError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        dispatch({
                            type: EMyTeamsTypes.SET_HAS_ERROR,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: true
                        });
                        return [4 /*yield*/, getMyTeams()];
                    case 1:
                        _teams = _b.sent();
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MESSAGE,
                            payload: undefined
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MYTEAMS,
                            payload: _teams
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        messageError = {
                            isShow: true,
                            message: strings.MyTeamsMessageError,
                            messageBarType: MessageBarType.error,
                        };
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MESSAGE,
                            payload: messageError
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_HAS_ERROR,
                            payload: true
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, []);
    var hasError = state.hasError, isLoading = state.isLoading, message = state.message, myTeams = state.myTeams;
    return (React.createElement(React.Fragment, null,
        React.createElement(Customizer, { settings: { theme: themeVariant } },
            React.createElement(Stack, { styles: stackStyles, tokens: stackTokens },
                React.createElement(Text, { variant: "xLargePlus", styles: titleStyles }, title),
                hasError ? (React.createElement(ShowMessage, __assign({}, message))) : (React.createElement("div", { className: styleClasses.teamsContainer }, !(myTeams === null || myTeams === void 0 ? void 0 : myTeams.length) && !isLoading ? (React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center", tokens: { childrenGap: 20 }, styles: { root: { margin: 20 } } },
                    React.createElement(FontIcon, { iconName: "TeamsLogo", style: { fontSize: 28, width: 28, height: 28 } }),
                    React.createElement(Text, { variant: "mediumPlus" }, strings.MyTeamsNoTeamsMessage))) : isLoading ? (React.createElement(Spinner, { size: SpinnerSize.medium, label: strings.MyTeamsLoadingMessage, labelPosition: "bottom" })) : (myTeams.map(function (team) {
                    return (React.createElement(Team, { key: team.id, team: team, serviceScope: webPartContext.serviceScope, themeVariant: themeVariant, onSelectedChannel: onSelectedChannel, enablePersonCardInteraction: enablePersonCardInteraction }));
                }))))))));
};
//# sourceMappingURL=MyTeams.js.map
import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useAtom } from "jotai";
import { pullAllBy } from "lodash";
import { Card, Spinner, } from "@fluentui/react-components";
import { globalState } from "./atoms/globalState";
import { EMessageType } from "./constants/EMessageTypes";
import { useGraphUserAPI } from "./hooks/useGraphUserAPI";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { ShowMessage } from "./showMessage/ShowMessage";
import { NoUser } from "./userCard/NoUser";
import { UserCard } from "./userCard/UserCard";
import { useUserPickerStyles } from "./useUserPickerStyles";
export var PopUpMenu = function (props) {
    var searchValue = props.searchValue, isOpen = props.isOpen, onDismiss = props.onDismiss, containerRef = props.containerRef, secondaryTextPropertyName = props.secondaryTextPropertyName;
    var _a = useAtom(globalState), appGlobalState = _a[0], setAppGlobalState = _a[1];
    var context = appGlobalState.context, selectedUsers = appGlobalState.selectedUsers;
    var _b = React.useState([]), renderUsers = _b[0], setRenderUsers = _b[1];
    var getUserByName = useGraphUserAPI(context).getUserByName;
    var styles = useUserPickerStyles();
    var _c = React.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = React.useState(undefined), error = _d[0], setError = _d[1];
    var _e = React.useState(false), isSearching = _e[0], setIsSearching = _e[1];
    useOnClickOutside(true, containerRef, function () { return onDismiss(false); });
    var onSelected = React.useCallback(function (user) {
        setAppGlobalState(__assign(__assign({}, appGlobalState), { selectedUsers: __spreadArray(__spreadArray([], selectedUsers, true), [user], false) }));
        onDismiss(false);
    }, []);
    var RenderUsers = React.useCallback(function () {
        if (error)
            return React.createElement(ShowMessage, { messageType: EMessageType.ERROR, message: error.message });
        if (!isLoading && !error)
            return React.createElement("div", { className: styles.usersContainer }, renderUsers);
        return React.createElement(React.Fragment, null);
    }, [isLoading, error, renderUsers, styles.usersContainer]);
    React.useEffect(function () {
        if (searchValue.length < 2)
            return;
        if (isSearching)
            return;
        setIsSearching(true);
        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
            var users, usersToRender, removeSelectedUsers, _i, removeSelectedUsers_1, user, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, getUserByName(searchValue)];
                    case 1:
                        users = (_a = (_c.sent())) !== null && _a !== void 0 ? _a : [];
                        usersToRender = [];
                        removeSelectedUsers = pullAllBy(users, selectedUsers, "mail");
                        for (_i = 0, removeSelectedUsers_1 = removeSelectedUsers; _i < removeSelectedUsers_1.length; _i++) {
                            user = removeSelectedUsers_1[_i];
                            usersToRender.push(React.createElement(React.Fragment, null,
                                React.createElement(UserCard, { userId: (_b = user.mail) !== null && _b !== void 0 ? _b : "", showOverCard: false, onSelected: onSelected, className: styles.userCardStyles, secondaryTextPropertyName: secondaryTextPropertyName })));
                        }
                        if (usersToRender.length === 0) {
                            usersToRender.push(React.createElement(React.Fragment, null,
                                React.createElement(NoUser, null)));
                        }
                        setRenderUsers(usersToRender);
                        setIsSearching(false);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _c.sent();
                        setError(error_1);
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 500);
    }, [searchValue, selectedUsers, getUserByName, onSelected, secondaryTextPropertyName]);
    if (!isOpen)
        return React.createElement(React.Fragment, null);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { ref: containerRef, className: styles.popupContainer }, isLoading && !error ? React.createElement(Spinner, { size: "small" }) : React.createElement(RenderUsers, null))));
};
//# sourceMappingURL=PopUpMenu.js.map
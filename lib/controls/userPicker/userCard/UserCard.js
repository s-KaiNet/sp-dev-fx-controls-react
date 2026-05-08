/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import './style.css';
import { __assign, __awaiter, __generator } from "tslib";
import * as React from 'react';
import { useAtom } from 'jotai';
import { mergeClasses, Persona, } from '@fluentui/react-components';
import { LivePersona } from '../../LivePersona';
import { globalState } from '../atoms/globalState';
import { useGraphUserAPI } from '../hooks/useGraphUserAPI';
import { useUserCardStyles } from './useUserCardStyles';
export var UserCard = function (props) {
    var _a, _b;
    var appGlobalState = useAtom(globalState)[0];
    var context = appGlobalState.context;
    var userId = props.userId, showOverCard = props.showOverCard, onSelected = props.onSelected, className = props.className, secondaryTextPropertyName = props.secondaryTextPropertyName;
    var _c = useGraphUserAPI(context), getUserById = _c.getUserById, getUserPresence = _c.getUserPresence;
    var _d = React.useState(), user = _d[0], setUser = _d[1];
    var _e = React.useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var styles = useUserCardStyles();
    var getSecondaryText = React.useCallback(function (user) {
        var _a;
        switch (secondaryTextPropertyName) {
            case "jobTitle":
                return user === null || user === void 0 ? void 0 : user.jobTitle;
            case "department":
                return user === null || user === void 0 ? void 0 : user.department;
            case "mail":
                return user === null || user === void 0 ? void 0 : user.mail;
            case "officeLocation":
                return user === null || user === void 0 ? void 0 : user.officeLocation;
            case "mobilePhone":
                return user === null || user === void 0 ? void 0 : user.mobilePhone;
            case "businessPhones":
                return (_a = user === null || user === void 0 ? void 0 : user.businessPhones) === null || _a === void 0 ? void 0 : _a.join(",");
            case "userPrincipalName":
                return user === null || user === void 0 ? void 0 : user.userPrincipalName;
            default:
                return "";
        }
    }, [user === null || user === void 0 ? void 0 : user.jobTitle, user === null || user === void 0 ? void 0 : user.department, user === null || user === void 0 ? void 0 : user.mail, user === null || user === void 0 ? void 0 : user.officeLocation, user === null || user === void 0 ? void 0 : user.mobilePhone, user === null || user === void 0 ? void 0 : user.businessPhones, user === null || user === void 0 ? void 0 : user.userPrincipalName]);
    var availability = React.useMemo(function () {
        var _a;
        var presence = (user || {}).presence;
        switch ((_a = presence === null || presence === void 0 ? void 0 : presence.availability) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
            case "available":
                return "available";
            case "away":
                return "away";
            case "busy":
                return "busy";
            case "offline":
                return "offline";
            default:
                return "offline";
        }
    }, [(_a = user === null || user === void 0 ? void 0 : user.presence) === null || _a === void 0 ? void 0 : _a.availability]);
    var checkUserPresence = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userPresence, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userId)
                        return [2 /*return*/];
                    userPresence = { availability: "offline", activity: "offline" };
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (user)
                        try {
                            getUserPresence((user === null || user === void 0 ? void 0 : user.id) || "").then(function (presence) {
                                userPresence = presence;
                                user = __assign(__assign({}, user), { presence: userPresence });
                                setUser(user);
                            });
                        }
                        catch (error) {
                            console.log(error);
                        }
                        finally {
                            setIsLoading(false);
                        }
                    user = __assign(__assign({}, user), { presence: userPresence });
                    setUser(user);
                    return [2 /*return*/];
            }
        });
    }); }, [userId, context]);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkUserPresence()];
                    case 1:
                        _a.sent();
                        setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, checkUserPresence()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 60000);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    if (isLoading)
        return React.createElement(React.Fragment, null);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: mergeClasses(styles.container, className), key: userId, onClick: function () {
                if (onSelected)
                    onSelected(user);
            } },
            React.createElement(LivePersona, { upn: showOverCard ? userId : "", template: React.createElement(React.Fragment, null,
                    React.createElement("div", { className: styles.root },
                        React.createElement(Persona, { name: (_b = user === null || user === void 0 ? void 0 : user.displayName) !== null && _b !== void 0 ? _b : "No Name", secondaryText: getSecondaryText(user), presence: { status: availability }, avatar: {
                                image: {
                                    src: user === null || user === void 0 ? void 0 : user.userPhoto,
                                },
                            } }))), serviceScope: context.serviceScope }))));
};
//# sourceMappingURL=UserCard.js.map
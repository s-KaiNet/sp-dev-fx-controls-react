import { __assign, __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "jotai";
import { has } from "lodash";
import { FluentProvider, IdPrefixProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, } from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { useTheme } from "@fluentui/react-theme-provider";
import ListToolbarControl from "./ListToolbarControl";
export var ListToolbar = function (props) {
    var themeV8 = props.theme, context = props.context;
    var _a = React.useState(), theme = _a[0], setTheme = _a[1];
    var currentSPTheme = useTheme();
    var _b = React.useState(false), isInitialized = _b[0], setIsInitialized = _b[1];
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var teamsContext, teamsTheme, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!has(context, "sdks.microsoftTeams.teamsJs.app.getContext")) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = context.sdks.microsoftTeams) === null || _a === void 0 ? void 0 : _a.teamsJs.app.getContext())];
                    case 1:
                        teamsContext = _b.sent();
                        teamsTheme = teamsContext.app.theme || "default";
                        switch (teamsTheme) {
                            case "dark":
                                setTheme(teamsDarkTheme);
                                break;
                            case "contrast":
                                setTheme(teamsHighContrastTheme);
                                break;
                            case "default":
                                setTheme(teamsLightTheme);
                                break;
                            default:
                                setTheme(teamsLightTheme);
                                break;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (themeV8 || currentSPTheme) {
                            setTheme(createV9Theme(themeV8 !== null && themeV8 !== void 0 ? themeV8 : currentSPTheme));
                        }
                        else {
                            setTheme(teamsLightTheme);
                        }
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.warn("ListToolbar: Failed to resolve theme, using default", error_1);
                        setTheme(teamsLightTheme);
                        return [3 /*break*/, 5];
                    case 5:
                        setIsInitialized(true);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [context, currentSPTheme, themeV8]);
    if (!isInitialized)
        return React.createElement(React.Fragment, null);
    return (React.createElement(React.Fragment, null,
        React.createElement(IdPrefixProvider, { value: "userPicker-" },
            React.createElement(FluentProvider, { theme: theme },
                React.createElement(Provider, null,
                    React.createElement(ListToolbarControl, __assign({}, props)))))));
};
//# sourceMappingURL=ListToolbar.js.map
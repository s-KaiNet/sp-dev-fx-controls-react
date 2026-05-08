import { __assign, __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "jotai";
import { has } from "lodash";
import { FluentProvider, IdPrefixProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, } from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { useTheme } from "@fluentui/react-theme-provider";
import { UserPickerControl } from "./UserPickerControl";
export var UserPicker = function (props) {
    var themeV8 = props.theme, context = props.context;
    var _a = React.useState(), theme = _a[0], setTheme = _a[1];
    var currentSPTheme = useTheme();
    var _b = React.useState(false), isInitialized = _b[0], setIsInitialized = _b[1];
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var teamsContext, teamsTheme;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
                        setTheme(createV9Theme(currentSPTheme));
                        _b.label = 3;
                    case 3:
                        setIsInitialized(true);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [context, currentSPTheme]);
    if (!isInitialized)
        return React.createElement(React.Fragment, null);
    return (React.createElement(React.Fragment, null,
        React.createElement(IdPrefixProvider, { value: "userPicker-" },
            React.createElement(FluentProvider, { theme: theme },
                React.createElement(Provider, null,
                    React.createElement(UserPickerControl, __assign({}, props)))))));
};
//# sourceMappingURL=UserPicker.js.map
import { __assign } from "tslib";
import * as React from 'react';
import { useAtom } from 'jotai';
import { EnhancedThemeProvider } from '../enhancedThemeProvider';
import { globalState } from './atoms/globalState';
import { Navigation } from './Navigation';
export var TermSetNavigation = function (props) {
    var themeVariant = props.themeVariant, context = props.context;
    var _a = useAtom(globalState), setAppGlobalState = _a[1];
    React.useEffect(function () {
        setAppGlobalState(function (state) { return (__assign(__assign({}, state), props)); });
    }, [props]);
    if (!context || !themeVariant)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(EnhancedThemeProvider, { theme: themeVariant, context: context },
            React.createElement(Navigation, __assign({}, props)))));
};
//# sourceMappingURL=TermSetNavigation.js.map
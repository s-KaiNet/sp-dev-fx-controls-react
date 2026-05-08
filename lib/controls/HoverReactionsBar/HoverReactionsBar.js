import { __assign } from "tslib";
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { FluentProvider, } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { HoverReactionsBarControl, } from './components/hoverReactionbarControl/HoverReactionBarControl';
export var HoverReactionsBar = function (props) {
    var themeV8 = props.themeV8;
    var theme = themeV8 !== null && themeV8 !== void 0 ? themeV8 : useTheme();
    var setTheme = React.useCallback(function () {
        return createV9Theme(theme);
    }, [theme]);
    return (React.createElement(React.Fragment, null,
        React.createElement(FluentProvider, { theme: setTheme() },
            React.createElement(HoverReactionsBarControl, __assign({}, props)))));
};
//# sourceMappingURL=HoverReactionsBar.js.map
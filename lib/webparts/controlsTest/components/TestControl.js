import { __assign } from "tslib";
import * as React from 'react';
import { Body1, FluentProvider, IdPrefixProvider, Title3, makeStyles, shorthands, } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { Kpis } from '../../../controls/KPIControl';
var useStyles = makeStyles({
    root: __assign(__assign({ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, shorthands.gap('10px')), { marginLeft: '50%', marginRight: '50%', height: 'fit-content', width: 'fit-content' }),
    image: {
        width: '20px',
        height: '20px',
    },
    title: {
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export var TestControl = function (props) {
    var themeVariant = props.themeVariant, context = props.context;
    var styles = useStyles();
    var setTheme = React.useCallback(function () {
        return createV9Theme(themeVariant);
    }, [themeVariant]);
    var onSelectedUsers = function (users) {
        console.log('selected users', users);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IdPrefixProvider, { value: "test-control-" },
            React.createElement(FluentProvider, { theme: setTheme(), applyStylesToPortals: true },
                React.createElement("div", { className: styles.title },
                    React.createElement(Title3, null, "KPIS Control Test")),
                React.createElement(Body1, null, "Regular cards"),
                React.createElement(Kpis, null),
                React.createElement(Body1, null, "Compact cards"),
                React.createElement(Kpis, { compact: true })))));
};
//# sourceMappingURL=TestControl.js.map
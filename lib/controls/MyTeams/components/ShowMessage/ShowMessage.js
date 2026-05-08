import { __assign } from "tslib";
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import * as React from 'react';
export var ShowMessage = function (props) {
    if (props.isShow) {
        return (React.createElement(React.Fragment, null,
            React.createElement(MessageBar, __assign({}, props), props.message)));
    }
    // nullRender
    return null;
};
//# sourceMappingURL=ShowMessage.js.map
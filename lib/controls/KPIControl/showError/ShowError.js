import { Body1, Card, Title3 } from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";
import React from "react";
import { Stack } from "../stack";
import { useShowErrorStyles } from "./useShowErrorStyles";
export var ShowError = function (_a) {
    var title = _a.title, message = _a.message;
    var styles = useShowErrorStyles();
    return (React.createElement(Card, { className: styles.container },
        React.createElement(Stack, { gap: "l", alignItems: "center" },
            React.createElement(ErrorCircleRegular, { className: styles.icon }),
            React.createElement(Stack, { gap: "s", alignItems: "center" },
                React.createElement(Title3, { className: styles.title }, title),
                React.createElement(Body1, { className: styles.message }, message)))));
};
export default ShowError;
//# sourceMappingURL=ShowError.js.map
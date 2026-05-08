import { __assign } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, shorthands, tokens, } from '@fluentui/react-components';
export var useShowMessageStyles = makeStyles({
    root: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }, shorthands.padding("10px")), shorthands.gap("10px")),
    iconClass: {
        width: "32px",
        height: "32px",
    },
    errorContainer: __assign(__assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center" }, shorthands.gap("10px")), shorthands.padding("10px")), { backgroundColor: tokens.colorStatusDangerBackground1 }),
    errorIcon: {
        width: "60px",
        height: "100%",
    },
});
//# sourceMappingURL=useShowMessageStyles.js.map
import { __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
/**
 * Fetches and cleans a MapLibre style JSON, removing any graticule layer.
 */
export var useCleanMapStyle = function (url) {
    var _a = useState(undefined), styleJson = _a[0], setStyleJson = _a[1];
    useEffect(function () {
        var cancelled = false;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, json, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = (_a.sent());
                        if (!cancelled)
                            setStyleJson(json);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Error loading style:", e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            cancelled = true;
        };
    }, [url]);
    return styleJson;
};
//# sourceMappingURL=useCleanMapStyle.js.map
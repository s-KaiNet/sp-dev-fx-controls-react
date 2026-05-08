import { __awaiter, __generator } from "tslib";
import { useState, useEffect } from "react";
import loader from "@monaco-editor/loader";
var CDN_PATH_TO_MONACO_EDITOR = "https://cdn.jsdelivr.net/npm/monaco-editor@0.32.1/min/vs";
export var EStatus;
(function (EStatus) {
    EStatus[EStatus["LOADING"] = 0] = "LOADING";
    EStatus[EStatus["LOADED"] = 1] = "LOADED";
    EStatus[EStatus["ERROR"] = 2] = "ERROR";
})(EStatus || (EStatus = {}));
export var useMonaco = function () {
    var _a = useState(undefined), monaco = _a[0], setMonaco = _a[1];
    var _b = useState(EStatus.LOADING), status = _b[0], setStatus = _b[1];
    var _c = useState(undefined), error = _c[0], setError = _c[1];
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var monacoObj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loader.config({ paths: { vs: CDN_PATH_TO_MONACO_EDITOR } });
                        return [4 /*yield*/, loader.init()];
                    case 1:
                        monacoObj = _a.sent();
                        setStatus(EStatus.LOADED);
                        setMonaco(monacoObj);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        setStatus(EStatus.ERROR);
                        setMonaco(undefined);
                        setError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, []);
    return {
        monaco: monaco,
        status: status,
        error: error,
    };
};
//# sourceMappingURL=useMonaco.js.map
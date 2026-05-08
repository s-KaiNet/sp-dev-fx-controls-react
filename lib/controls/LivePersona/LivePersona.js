import { __awaiter, __generator } from "tslib";
import { createElement, useEffect, useRef, useState } from "react";
import { Log } from "@microsoft/sp-core-library";
import { SPComponentLoader } from "@microsoft/sp-loader";
var LIVE_PERSONA_COMPONENT_ID = "914330ee-2df2-4f6e-a858-30c23a812408";
export var LivePersona = function (props) {
    var _a = useState(false), isComponentLoaded = _a[0], setIsComponentLoaded = _a[1];
    var sharedLibrary = useRef(); // eslint-disable-line @typescript-eslint/no-explicit-any
    var upn = props.upn, template = props.template, disableHover = props.disableHover, serviceScope = props.serviceScope;
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!isComponentLoaded) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = sharedLibrary;
                        return [4 /*yield*/, SPComponentLoader.loadComponentById(LIVE_PERSONA_COMPONENT_ID)];
                    case 2:
                        _a.current = _b.sent();
                        setIsComponentLoaded(true);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        Log.error("[LivePersona]", error_1, serviceScope);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, []);
    var renderPersona = null;
    if (isComponentLoaded) {
        renderPersona = createElement(sharedLibrary.current.LivePersonaCard, {
            className: 'livePersonaCard',
            clientScenario: 'livePersonaCard',
            disableHover: disableHover,
            hostAppPersonaInfo: {
                PersonaType: 'User'
            },
            upn: upn,
            legacyUpn: upn,
            serviceScope: serviceScope,
        }, createElement("div", {}, template));
    }
    return renderPersona;
};
//# sourceMappingURL=LivePersona.js.map
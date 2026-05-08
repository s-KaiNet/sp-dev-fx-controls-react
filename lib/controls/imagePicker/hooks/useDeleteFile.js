import { __awaiter, __generator } from "tslib";
import React from "react";
export var useDeleteFile = function (context) {
    var deleteFile = React.useCallback(function (driveId, siteId, itemId, uploadLocation) { return __awaiter(void 0, void 0, void 0, function () {
        var graphClient, requestURL, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.msGraphClientFactory.getClient("3")];
                case 1:
                    graphClient = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    requestURL = "/sites/".concat(siteId, "/drives/").concat(driveId, "/items/").concat(itemId);
                    if (uploadLocation === "OneDrive") {
                        requestURL = "/me/drive/items/".concat(itemId);
                    }
                    return [4 /*yield*/, graphClient.api(requestURL).delete()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    err_1 = _a.sent();
                    console.error("[DeleteFile] Err='".concat(err_1.message, "'"));
                    throw new Error("Something went wrong when deleting the file. Status='".concat(err_1.status)); // eslint-disable-line @typescript-eslint/no-explicit-any
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    return [deleteFile];
};
//# sourceMappingURL=useDeleteFile.js.map
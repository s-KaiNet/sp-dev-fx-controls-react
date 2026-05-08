import { __awaiter, __generator } from "tslib";
var SPServiceMock = /** @class */ (function () {
    function SPServiceMock(includeDelay, delayTimeout) {
        var _this = this;
        this.getField = function (listId, internalColumnName, webUrl) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        this._includeDelay = includeDelay;
        this._delayTimeout = delayTimeout || 500;
    }
    SPServiceMock.prototype.getListFormRenderInfo = function (listId) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getAdditionalListFormFieldInfo = function (listId, webUrl) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getFields = function (options) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getContentTypes = function (options) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getListItems = function (filterText, listId, internalColumnName, field, keyInternalColumnName, webUrl) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getViews = function (listId, orderBy, filter) {
        return;
    };
    SPServiceMock.prototype.getLibs = function (options) {
        var _this = this;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._includeDelay === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sleep(this._delayTimeout)];
                    case 1:
                        _a.sent(); // Simulate network load
                        _a.label = 2;
                    case 2:
                        resolve(SPServiceMock._lists);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
    * Locks the thread for the specified amount of time
    * @param ms Milliseconds to wait
    */
    SPServiceMock.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    /**
    * The mock lists to present to the local workbench
    */
    SPServiceMock._lists = {
        value: [
            { Id: '8dc80f2e-0e01-43ee-b59e-fbbca2d1f35e', Title: 'Mock List One', BaseTemplate: '109' },
            { Id: '772a30d4-2d62-42da-aa48-c2a37971d693', Title: 'Mock List Two', BaseTemplate: '109' },
            { Id: '16c0d1c6-b467-4823-a37b-c308cf730366', Title: 'Mock List Three', BaseTemplate: '109' }
        ]
    };
    return SPServiceMock;
}());
export default SPServiceMock;
//# sourceMappingURL=SPServiceMock.js.map
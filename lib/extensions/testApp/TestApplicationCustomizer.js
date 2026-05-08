import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import TestApp from './TestApp';
var LOG_SOURCE = 'TestApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var TestApplicationCustomizer = /** @class */ (function (_super) {
    __extends(TestApplicationCustomizer, _super);
    function TestApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestApplicationCustomizer.prototype.onInit = function () {
        Log.info(LOG_SOURCE, "Initialized TestApplicationCustomizer");
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    };
    TestApplicationCustomizer.prototype._renderPlaceHolders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                if (!this._topPlaceHolder) {
                    this._topPlaceHolder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
                }
                element = React.createElement(TestApp, {
                    context: this.context
                });
                ReactDom.render(element, this._topPlaceHolder.domElement);
                return [2 /*return*/];
            });
        });
    };
    TestApplicationCustomizer.prototype._onDispose = function (PlaceholderContent) {
        ReactDom.unmountComponentAtNode(PlaceholderContent.domElement);
    };
    return TestApplicationCustomizer;
}(BaseApplicationCustomizer));
export default TestApplicationCustomizer;
//# sourceMappingURL=TestApplicationCustomizer.js.map
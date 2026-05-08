import { __extends } from "tslib";
import { DefaultButton } from '@fluentui/react';
import * as React from 'react';
var TestApp = /** @class */ (function (_super) {
    __extends(TestApp, _super);
    function TestApp(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestApp.prototype.render = function () {
        return (React.createElement(DefaultButton, { text: "test" }));
    };
    return TestApp;
}(React.Component));
export default TestApp;
//# sourceMappingURL=TestApp.js.map
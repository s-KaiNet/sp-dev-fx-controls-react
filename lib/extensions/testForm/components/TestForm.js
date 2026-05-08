import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { Log } from '@microsoft/sp-core-library';
import { EnhancedThemeProvider } from '../../../EnhancedThemeProvider';
import { DynamicForm } from '../../../DynamicForm';
var LOG_SOURCE = 'TestForm';
var TestForm = /** @class */ (function (_super) {
    __extends(TestForm, _super);
    function TestForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestForm.prototype.componentDidMount = function () {
        Log.info(LOG_SOURCE, 'React Element: TestForm mounted');
    };
    TestForm.prototype.componentWillUnmount = function () {
        Log.info(LOG_SOURCE, 'React Element: TestForm unmounted');
    };
    TestForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(EnhancedThemeProvider, { applyTo: "element", context: this.props.context },
            React.createElement(DynamicForm, { context: this.props.context, listId: this.props.context.list.guid.toString(), listItemId: this.props.context.itemId, onListItemLoaded: function (listItemData) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log(listItemData);
                        return [2 /*return*/];
                    });
                }); } })));
    };
    return TestForm;
}(React.Component));
export default TestForm;
//# sourceMappingURL=TestForm.js.map
import { __assign, __extends } from "tslib";
import * as React from "react";
import DisplayName from "../helpers/DisplayName";
import { assertValidHtmlId } from "../helpers/uuid";
import { Consumer as ItemConsumer } from "./ItemContext";
var defaultProps = {
    className: 'accordion__heading',
    'aria-level': 3,
};
export var SPEC_ERROR = "AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201CThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201D\n\n";
var AccordionItemHeading = /** @class */ (function (_super) {
    __extends(AccordionItemHeading, _super);
    function AccordionItemHeading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        return _this;
    }
    AccordionItemHeading.VALIDATE = function (ref) {
        if (ref === undefined) {
            throw new Error('ref is undefined');
        }
        if (!(ref.childElementCount === 1 &&
            ref.firstElementChild &&
            ref.firstElementChild.getAttribute('data-accordion-component') === 'AccordionItemButton')) {
            throw new Error(SPEC_ERROR);
        }
    };
    AccordionItemHeading.prototype.componentDidUpdate = function () {
        AccordionItemHeading.VALIDATE(this.ref);
    };
    AccordionItemHeading.prototype.componentDidMount = function () {
        AccordionItemHeading.VALIDATE(this.ref);
    };
    AccordionItemHeading.prototype.render = function () {
        return (React.createElement("div", __assign({ "data-accordion-component": "AccordionItemHeading" }, this.props, { ref: this.setRef })));
    };
    AccordionItemHeading.defaultProps = defaultProps;
    return AccordionItemHeading;
}(React.PureComponent));
export { AccordionItemHeading };
var AccordionItemHeadingWrapper = function (props) { return (React.createElement(ItemConsumer, null, function (itemContext) {
    var headingAttributes = itemContext.headingAttributes;
    if (props.id) {
        assertValidHtmlId(props.id);
    }
    return React.createElement(AccordionItemHeading, __assign({}, props, headingAttributes));
})); };
AccordionItemHeadingWrapper.displayName = DisplayName.AccordionItemHeading;
export default AccordionItemHeadingWrapper;
//# sourceMappingURL=AccordionItemHeading.js.map
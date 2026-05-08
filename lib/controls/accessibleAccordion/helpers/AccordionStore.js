import { __assign, __spreadArray } from "tslib";
var AccordionStore = /** @class */ (function () {
    function AccordionStore(_a) {
        var _b = _a.expanded, expanded = _b === void 0 ? [] : _b, _c = _a.allowMultipleExpanded, allowMultipleExpanded = _c === void 0 ? false : _c, _d = _a.allowZeroExpanded, allowZeroExpanded = _d === void 0 ? false : _d;
        var _this = this;
        this.toggleExpanded = function (uuid) {
            if (_this.isItemDisabled(uuid)) {
                return _this;
            }
            var isExpanded = _this.isItemExpanded(uuid);
            if (!isExpanded) {
                return _this.augment({
                    expanded: _this.allowMultipleExpanded
                        ? __spreadArray(__spreadArray([], _this.expanded, true), [uuid], false) : [uuid],
                });
            }
            else {
                return _this.augment({
                    expanded: _this.expanded.filter(function (expandedUuid) { return expandedUuid !== uuid; }),
                });
            }
        };
        /*
         * From the spec:
         *
         * “If the accordion panel associated with an accordion header is visible,
         * and if the accordion does not permit the panel to be collapsed, the
         * header button element has aria-disabled set to true.”
         */
        this.isItemDisabled = function (uuid) {
            var isExpanded = _this.isItemExpanded(uuid);
            var isOnlyOneExpanded = _this.expanded.length === 1;
            return Boolean(isExpanded && !_this.allowZeroExpanded && isOnlyOneExpanded);
        };
        this.isItemExpanded = function (uuid) {
            return _this.expanded.indexOf(uuid) !== -1;
        };
        this.getPanelAttributes = function (uuid, dangerouslySetExpanded) {
            var expanded = dangerouslySetExpanded ? dangerouslySetExpanded : _this.isItemExpanded(uuid);
            return {
                role: _this.allowMultipleExpanded ? undefined : 'region',
                'aria-hidden': _this.allowMultipleExpanded ? !expanded : undefined,
                'aria-labelledby': _this.getButtonId(uuid),
                id: _this.getPanelId(uuid),
                hidden: expanded ? undefined : true,
            };
        };
        this.getHeadingAttributes = function () {
            return {
                role: 'heading',
            };
        };
        this.getButtonAttributes = function (uuid, dangerouslySetExpanded) {
            var expanded = dangerouslySetExpanded ? dangerouslySetExpanded : _this.isItemExpanded(uuid);
            var disabled = _this.isItemDisabled(uuid);
            return {
                id: _this.getButtonId(uuid),
                'aria-disabled': disabled,
                'aria-expanded': expanded,
                'aria-controls': _this.getPanelId(uuid),
                role: 'button',
                tabIndex: 0,
            };
        };
        this.getPanelId = function (uuid) {
            return "accordion__panel-".concat(uuid);
        };
        this.getButtonId = function (uuid) {
            return "accordion__heading-".concat(uuid);
        };
        this.augment = function (args) {
            return new AccordionStore(__assign({ expanded: _this.expanded, allowMultipleExpanded: _this.allowMultipleExpanded, allowZeroExpanded: _this.allowZeroExpanded }, args));
        };
        this.expanded = expanded;
        this.allowMultipleExpanded = allowMultipleExpanded;
        this.allowZeroExpanded = allowZeroExpanded;
    }
    return AccordionStore;
}());
export default AccordionStore;
//# sourceMappingURL=AccordionStore.js.map
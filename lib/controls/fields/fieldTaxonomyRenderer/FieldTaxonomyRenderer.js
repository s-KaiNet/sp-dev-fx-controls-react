import { __extends } from "tslib";
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldTaxonomyRenderer.module.scss';
/**
 * Field Taxonomy Renderer.
 * Used for:
 *   - Taxonomy
 */
var FieldTaxonomyRenderer = /** @class */ (function (_super) {
    __extends(FieldTaxonomyRenderer, _super);
    function FieldTaxonomyRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldTaxonomyRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldTaxonomyRenderer.prototype.render = function () {
        var _this = this;
        var termEls = null;
        if (Array.isArray(this.props.terms)) {
            termEls = this.props.terms.map(function (term) {
                return React.createElement("div", { key: term.TermID, className: styles.term, style: _this.props.cssProps },
                    React.createElement("span", null, term.Label));
            });
        }
        else {
            termEls = React.createElement("div", { className: styles.term, style: this.props.cssProps },
                React.createElement("span", null, this.props.terms.Label));
        }
        return (React.createElement("div", { style: this.props.cssProps, className: css(this.props.className) }, termEls));
    };
    return FieldTaxonomyRenderer;
}(React.Component));
export { FieldTaxonomyRenderer };
//# sourceMappingURL=FieldTaxonomyRenderer.js.map
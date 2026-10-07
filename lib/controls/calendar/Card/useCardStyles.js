import { __assign } from "tslib";
import * as React from 'react';
import { useComponentUtils } from '../hooks/useComponentsUtils';
export var useCardStyles = function (props) {
    var styles = props.styles;
    var getBaseStyles = useComponentUtils().getBaseStyles;
    var cardStyles = React.useCallback(function (containerWidth, containerHeight) {
        var baseStyles = getBaseStyles(props, containerWidth, containerHeight);
        return __assign(__assign({}, baseStyles), styles);
    }, [getBaseStyles, props, styles]);
    var bodyCardDefaultStyles = React.useMemo(function () {
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'stretch',
            overflow: 'unset',
        };
    }, []);
    return { cardStyles: cardStyles, bodyCardDefaultStyles: bodyCardDefaultStyles };
};
//# sourceMappingURL=useCardStyles.js.map
import { __assign } from "tslib";
import * as React from 'react';
import { Card as CarFUI, CardFooter, CardHeader, CardPreview, mergeClasses, } from '@fluentui/react-components';
import { ResizeObserver } from '@juggle/resize-observer';
import { useCardStyles } from './useCardStyles';
export var Card = function (props) {
    var className = props.className, cardBody = props.cardBody, cardBodyClassName = props.cardBodyClassName, cardHeader = props.cardHeader, cardHeaderClassName = props.cardHeaderClassName, cardHeaderImage = props.cardHeaderImage, cardHeaderAction = props.cardHeaderAction, cardHeaderDescription = props.cardHeaderDescription, cardFooterAction = props.cardFooterAction, cardFooterClassName = props.cardFooterClassName, cardFooterContent = props.cardFooterContent, cardPreviewImage = props.cardPreviewImage, cardPreviewLogo = props.cardPreviewLogo, _a = props.cardPreviewPosition, cardPreviewPosition = _a === void 0 ? "top" : _a;
    var _b = useCardStyles(props), cardStyles = _b.cardStyles, bodyCardDefaultStyles = _b.bodyCardDefaultStyles;
    var ref = React.useRef(null);
    var _c = React.useState(0), width = _c[0], setWidth = _c[1];
    var _d = React.useState(0), height = _d[0], setHeight = _d[1];
    React.useEffect(function () {
        var resizeObserver;
        if (ref.current) {
            // observer to detect changes in the size of the container
            resizeObserver = new ResizeObserver(function (entries) {
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    var _a = entry.contentRect, width_1 = _a.width, height_1 = _a.height;
                    setWidth(width_1);
                    setHeight(height_1);
                }
            });
            resizeObserver.observe(ref.current);
        }
        return function () {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: ref },
            React.createElement(CarFUI, __assign({ className: className, style: cardStyles(width, height) }, props),
                cardPreviewImage && cardPreviewPosition === "top" && (React.createElement(CardPreview, { logo: cardPreviewLogo },
                    cardPreviewImage,
                    " ")),
                cardHeader && (React.createElement(CardHeader, { className: cardHeaderClassName, image: cardHeaderImage, header: cardHeader, description: cardHeaderDescription, action: cardHeaderAction })),
                cardPreviewImage && cardPreviewPosition === "afterHeader" && (React.createElement(CardPreview, { logo: cardPreviewLogo },
                    cardPreviewImage,
                    " ")),
                cardBody && (React.createElement("div", { className: mergeClasses(cardBodyClassName), style: bodyCardDefaultStyles }, cardBody)),
                cardPreviewImage && cardPreviewPosition === "bottom" && (React.createElement(CardPreview, { logo: cardPreviewLogo },
                    cardPreviewImage,
                    " ")),
                cardFooterContent && (React.createElement(CardFooter, { action: cardFooterAction, className: cardFooterClassName }, cardFooterContent))))));
};
//# sourceMappingURL=Card.js.map
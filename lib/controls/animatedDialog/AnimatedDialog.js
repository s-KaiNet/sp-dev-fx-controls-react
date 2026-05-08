import { __assign, __awaiter, __generator } from "tslib";
import * as React from "react";
import { useEffect, useState } from 'react';
import styles from './AnimatedDialog.module.scss';
import { Dialog } from '@fluentui/react/lib/Dialog';
import { Icon } from '@fluentui/react/lib/Icon';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
require('animate.css/animate.min.css');
var animationPrefix = "animate__";
var mainAnimationClass = "".concat(animationPrefix, "animated");
var defaultDialogAnimationClass = "".concat(animationPrefix, "bounceIn");
var defaultIconAnimationClass = "".concat(animationPrefix, "zoomIn");
export function AnimatedDialog(props) {
    var _this = this;
    var _a = useState(props), dialogProps = _a[0], setDialogProps = _a[1];
    var _b = useState(props.dialogContentProps), animatedDialogContentProps = _b[0], setAnimatedDialogContentProps = _b[1];
    var _c = useState(null), animatedDialogFooter = _c[0], setAnimatedDialogFooter = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var dialogAnimationInType = props.dialogAnimationInType, dialogAnimationOutType = props.dialogAnimationOutType, iconName = props.iconName, iconAnimationType = props.iconAnimationType, modalProps = props.modalProps, dialogContentProps = props.dialogContentProps, showAnimatedDialogFooter = props.showAnimatedDialogFooter, okButtonText = props.okButtonText, cancelButtonText = props.cancelButtonText;
    var currentContainerClass = modalProps && modalProps.containerClassName;
    var containerAnimationClass = "".concat(currentContainerClass, " ").concat(mainAnimationClass, " ").concat(animationPrefix, "fast");
    var getAnimatedDialogFooter = function () {
        return showAnimatedDialogFooter ?
            React.createElement("div", { className: styles.animatedDialogFooter },
                React.createElement(PrimaryButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    setLoading(true);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, props.onOkClick()];
                                case 2:
                                    _b.sent();
                                    props.onSuccess();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = _b.sent();
                                    props.onError();
                                    return [3 /*break*/, 4];
                                case 4:
                                    setLoading(false);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, disabled: loading, text: !loading && (okButtonText ? okButtonText : "Ok"), iconProps: !loading && { iconName: 'CheckMark' } }, loading && React.createElement(Spinner, { size: SpinnerSize.medium })),
                React.createElement(DefaultButton, { onClick: props.onDismiss, text: cancelButtonText ? cancelButtonText : "Cancel", disabled: loading, iconProps: { iconName: 'Cancel' } })) : null;
    };
    useEffect(function () {
        var title = dialogContentProps && dialogContentProps.title;
        if (iconName) {
            title =
                React.createElement("div", { className: styles.animatedDialogTitleContainer },
                    React.createElement(Icon, { iconName: iconName, className: iconAnimationType ?
                            "".concat(mainAnimationClass, " ").concat(animationPrefix).concat(iconAnimationType) :
                            "".concat(mainAnimationClass, " ").concat(defaultIconAnimationClass) }),
                    React.createElement("br", null),
                    React.createElement("span", null, dialogContentProps && dialogContentProps.title));
        }
        setAnimatedDialogContentProps(__assign(__assign({}, dialogContentProps), { title: title }));
    }, []);
    useEffect(function () {
        setAnimatedDialogFooter(getAnimatedDialogFooter());
    }, [loading]);
    useEffect(function () {
        var containerClassName = "".concat(containerAnimationClass, " ").concat(defaultDialogAnimationClass);
        if (props.dialogAnimationInType) {
            containerClassName = "".concat(containerAnimationClass, " ").concat(animationPrefix).concat(dialogAnimationInType);
        }
        if (props.hidden) {
            containerClassName = "".concat(containerAnimationClass, " ");
            containerClassName += dialogAnimationOutType ?
                "".concat(animationPrefix).concat(dialogAnimationOutType) :
                "".concat(animationPrefix, "zoomOut");
        }
        setDialogProps(__assign(__assign({}, props), { dialogContentProps: animatedDialogContentProps, modalProps: __assign(__assign({}, modalProps), { containerClassName: containerClassName }) }));
    }, [props.hidden]);
    return (React.createElement(Dialog, __assign({}, dialogProps),
        props.children,
        animatedDialogFooter));
}
//# sourceMappingURL=AnimatedDialog.js.map
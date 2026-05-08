import { __assign, __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Button, Image, } from '@fluentui/react-components';
import { Delete16Regular, Image20Regular, } from '@fluentui/react-icons';
/* import { RenderSpinner } from "./RenderSpninner/RenderSpinner"; */
import { SelectFromSharePoint } from './selectFromSharePoint';
import { contextState } from './atoms/contextState';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { useImagePickerStyles } from './useImagePickerStyles';
var maxWidth = 200;
var maxHeight = 200;
var useStyles = function () {
    return {
        image: css({
            minWidth: maxWidth,
            maxWidth: maxWidth,
            height: maxHeight,
            objectPosition: "top center",
        }),
    };
};
/**
 * Renders the preview image component.
 *
 * @param props - The component props.
 * @param props.selectedImageFileUrl - The URL of the selected image file.
 * @returns The JSX element representing the preview image component.
 */
var RenderPreviewImage = function (props) {
    var selectedImageFileUrl = props.selectedImageFileUrl;
    var maxWidth = 200;
    var maxHeight = 200;
    var styles = useImagePickerStyles();
    var imageStyles = useStyles();
    if (!selectedImageFileUrl) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.renderImageContainer },
            React.createElement(Image, { src: selectedImageFileUrl, fit: "cover", className: imageStyles.image, alt: "Selected Image" }))));
};
/**
 * Renders an image picker component.
 *
 * @component
 * @example
 * ```tsx
 * <ImagePicker
 *   onFileSelected={handleFileSelected}
 *   onDeleteFile={handleDeleteFile}
 *   selectedFileUrl={selectedImageUrl}
 *   context={appContext}
 * />
 * ```
 */
export var ImagePicker = function (props) {
    var onFileSelected = props.onFileSelected, onDeleteFile = props.onDeleteFile, selectedFileUrl = props.selectedFileUrl, context = props.context;
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var styles = useImagePickerStyles();
    var ref = React.useRef(null);
    var _b = useAtom(contextState), appContext = _b[0], setAppContext = _b[1];
    React.useEffect(function () {
        setAppContext(__assign(__assign({}, appContext), { context: context }));
    }, []);
    var _c = React.useState(selectedFileUrl), selectedImageFileUrl = _c[0], setSelectedImageFileUrl = _c[1];
    var onDismiss = function () {
        setIsOpen(false);
    };
    var isFileSelected = React.useMemo(function () {
        return !!selectedImageFileUrl;
    }, [selectedImageFileUrl]);
    var onDeleteFileCLick = React.useCallback(function () {
        setSelectedImageFileUrl(undefined);
        onDeleteFile();
    }, []);
    var styleButtonDelete = { display: !isFileSelected ? "none" : "inline-flex" };
    if (!context)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root, ref: ref },
            React.createElement("div", { className: styles.buttonContainer },
                React.createElement(Button, { icon: React.createElement(Image20Regular, null), shape: "circular", onClick: function () { return setIsOpen(true); } }, strings.ImagePickderSelectLabel),
                React.createElement(Button, { icon: React.createElement(Delete16Regular, null), shape: "circular", style: styleButtonDelete, onClick: function () { return onDeleteFileCLick(); } }, strings.ImagePickerDeleteImageLabel)),
            React.createElement(SelectFromSharePoint, { isOpen: isOpen, onDismiss: onDismiss, onFileSelected: function (file) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        onFileSelected(file);
                        setSelectedImageFileUrl(file.previewDataUrl);
                        onDismiss();
                        return [2 /*return*/];
                    });
                }); } }),
            React.createElement(RenderPreviewImage, { selectedImageFileUrl: selectedImageFileUrl }))));
};
//# sourceMappingURL=ImagePicker.js.map
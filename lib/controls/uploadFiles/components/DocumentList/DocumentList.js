import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { isEqual, pullAllWith, } from 'lodash';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { ScrollablePane, ScrollbarVisibility, } from '@fluentui/react/lib/ScrollablePane';
import { DragDropFiles } from '../../../dragDropFiles';
import { globalState } from '../../jotai/atoms';
import { FileInfo } from '../File/FileInfo';
import { FileCommandBar } from '../FileCommandBar/FileCommandBar';
import { NoDocuments } from '../NoDocuments/NoDocuments';
import { useDocumentListStyles } from './useDocumentListStyles';
export var DocumentList = function (props) {
    var _a = useDocumentListStyles(), documentListStyles = _a.documentListStyles, scollableContainerStyles = _a.scollableContainerStyles, bootomContainerStyles = _a.bootomContainerStyles;
    var _b = useAtom(globalState), appGlobalState = _b[0], setGlobalState = _b[1];
    var _c = React.useState([]), renderFiles = _c[0], setRenderFiles = _c[1];
    var selectedFiles = appGlobalState.selectedFiles, files = appGlobalState.files, containerWidth = appGlobalState.containerWidth;
    var currentPage = React.useRef(0);
    var currentFiles = React.useRef([]);
    var onUploadFiles = props.onUploadFiles;
    var currentDivWidth = React.useRef(0);
    var divRef = React.useRef();
    var isSelected = React.useCallback(function (file) {
        return selectedFiles.some(function (selectedFile) { return isEqual(selectedFile, file); });
    }, [selectedFiles]);
    var onFileSelected = React.useCallback(function (isChecked, file) {
        var copySelectedFiles = selectedFiles.slice();
        if (!isChecked) {
            var newFiles_1 = pullAllWith(copySelectedFiles, [file], isEqual);
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: newFiles_1 });
            });
        }
        else {
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: __spreadArray(__spreadArray([], copySelectedFiles, true), [file], false) });
            });
        }
    }, [setGlobalState, selectedFiles]);
    var renderFilesPerPage = React.useCallback(function () {
        var renderfiles = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            renderfiles.push(React.createElement(FileInfo, { key: "".concat(file.name, "-").concat(i), fileInfo: file, onSelected: onFileSelected, isSelected: isSelected(file) }));
        }
        setRenderFiles(renderfiles);
    }, [files, onFileSelected, isSelected]);
    var onDrop = React.useCallback(function (acceptedFiles) { return __awaiter(void 0, void 0, void 0, function () {
        var copyFiles, newsFiles;
        return __generator(this, function (_a) {
            copyFiles = files.slice();
            newsFiles = __spreadArray(__spreadArray([], copyFiles, true), acceptedFiles, true);
            currentFiles.current = newsFiles;
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { files: newsFiles });
            });
            return [2 /*return*/];
        });
    }); }, [files, setGlobalState]);
    var onDelete = React.useCallback(function () {
        currentPage.current = 0;
        var newFiles = pullAllWith(files, selectedFiles, isEqual);
        setGlobalState(function (prevState) {
            return __assign(__assign({}, prevState), { files: newFiles, selectedFiles: [] });
        });
    }, [files, selectedFiles, setGlobalState]);
    var onUpload = React.useCallback(function (file) {
        var newFiles = __spreadArray(__spreadArray([], currentFiles.current, true), [file], false);
        setGlobalState(function (prevState) {
            return __assign(__assign({}, prevState), { files: newFiles });
        });
    }, [setGlobalState]);
    var onSelectAll = React.useCallback(function (isAllSelected) {
        if (isAllSelected) {
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: files });
            });
        }
        else {
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: [] });
            });
        }
    }, [files, setGlobalState]);
    var getContainerWidth = React.useCallback(function () {
        var _a, _b, _c, _d;
        if (currentDivWidth.current !== ((_a = divRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) && ((_b = divRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) !== undefined) {
            currentDivWidth.current = (_d = (_c = divRef.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) !== null && _d !== void 0 ? _d : 0;
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { containerWidth: currentDivWidth.current });
            });
        }
    }, [setGlobalState]);
    React.useEffect(function () {
        renderFilesPerPage();
        document.addEventListener("change", function () {
            getContainerWidth();
        });
        window.addEventListener("resize", function () {
            getContainerWidth();
        });
    }, [files, selectedFiles, containerWidth, renderFilesPerPage, getContainerWidth]);
    getContainerWidth();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: divRef },
            React.createElement(FileCommandBar, { onDelete: onDelete, onSelectedAll: onSelectAll, onUpload: onUpload }),
            React.createElement(ScrollablePane, { scrollbarVisibility: ScrollbarVisibility.auto, styles: scollableContainerStyles },
                React.createElement("div", { className: documentListStyles.documentList },
                    React.createElement(DragDropFiles, { enable: true, onDrop: onDrop },
                        React.createElement(Stack, { tokens: { padding: 20 } }, renderFiles.length ? (React.createElement("div", { className: documentListStyles.filesContainerGrid }, renderFiles)) : (React.createElement(NoDocuments, null)))))),
            React.createElement(Stack, { styles: bootomContainerStyles, horizontalAlign: "end", tokens: { childrenGap: 20 } },
                React.createElement("div", { className: documentListStyles.separator }),
                React.createElement(React.Fragment, null,
                    React.createElement(PrimaryButton, { disabled: !selectedFiles.length, iconProps: { iconName: "upload" }, text: strings.UploadFilesUploadButtonLabel, onClick: function () { return onUploadFiles(selectedFiles); } }))))));
};
//# sourceMappingURL=DocumentList.js.map
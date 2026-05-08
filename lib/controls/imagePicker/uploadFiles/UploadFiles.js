import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import strings from "ControlStrings";
import { useAtomValue } from "jotai";
import { useDropzone } from "react-dropzone";
import { Body1, Caption1, tokens, } from "@fluentui/react-components";
import { Icon } from "@iconify/react";
import { contextState } from "../atoms/contextState";
import { EUploadLocations } from "../constants/EUploadLocations";
import { useDeleteFile } from "../hooks/useDeleteFile";
import { SelectUploadLocation } from "./SelectUploadLocation";
import { UpLoadFile } from "./UploadFile";
import { useUploadFilesStyles } from "./useUploadFilesStyles";
var validateFileTypes = function (file) {
    var acceptedFiles = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"];
    return acceptedFiles.includes(file.type)
        ? null
        : {
            code: "file-invalid-type",
            message: "file type ".concat(file.type, " is not supported"),
        };
};
export var UploadFiles = function (props) {
    var _a = React.useState([]), files = _a[0], setFiles = _a[1];
    var onSelectedFile = props.onSelectedFile;
    var _b = React.useState([]), renderFiles = _b[0], setRenderFiles = _b[1];
    var _c = React.useState(""), selectedFileId = _c[0], setSelectedFileId = _c[1];
    var _d = React.useState(EUploadLocations.CurrentSite), selectedUploadLocation = _d[0], setSelectedUploadLocation = _d[1];
    var appContext = useAtomValue(contextState);
    var deleteFile = useDeleteFile(appContext.context)[0];
    var styles = useUploadFilesStyles();
    React.useEffect(function () {
        onSelectedFile(null);
    }, []);
    var onDrop = React.useCallback(function (acceptedFiles) {
        var newFiles = acceptedFiles.map(function (file) {
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
        });
        setFiles(function (prevFiles) { return __spreadArray(__spreadArray([], prevFiles, true), newFiles, true); });
    }, []);
    var onFileSelected = React.useCallback(function (file) {
        setSelectedFileId(file.id);
        onSelectedFile(file);
    }, [onSelectedFile]);
    var onDelete = React.useCallback(function (fileName, driveId, libraryId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!(itemId && driveId && libraryId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, deleteFile(driveId, libraryId, itemId, selectedUploadLocation)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    setFiles(function (prevFiles) { return prevFiles.filter(function (f) { return f.name !== fileName; }); });
                    onSelectedFile(null);
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [onSelectedFile]);
    React.useEffect(function () {
        var filesControl = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            filesControl.push(React.createElement(UpLoadFile, { key: file.name, file: file, onFileSelected: onFileSelected, selectedFileId: selectedFileId, uploadLocation: selectedUploadLocation, onDelete: function (filename, driveId, libraryId, itemId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, onDelete(filename, driveId, libraryId, itemId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); } }));
        }
        setRenderFiles(filesControl);
        return function () {
            files.forEach(function (file) { return URL.revokeObjectURL(file.preview); });
        };
    }, [files, onFileSelected]);
    var _e = useDropzone({
        accept: {
            "image/*": [".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"],
        },
        onDrop: onDrop,
        maxFiles: 10,
        validator: validateFileTypes,
    }), getRootProps = _e.getRootProps, getInputProps = _e.getInputProps, isFocused = _e.isFocused, isDragAccept = _e.isDragAccept, isDragReject = _e.isDragReject, isDragActive = _e.isDragActive, fileRejections = _e.fileRejections;
    var focusedStyle = React.useMemo(function () {
        return { borderColor: tokens.colorNeutralBackground3Pressed };
    }, []);
    var acceptStyle = React.useMemo(function () {
        return { borderColor: tokens.colorNeutralBackground3Pressed };
    }, []);
    var rejectStyle = React.useMemo(function () {
        return {
            borderColor: tokens.colorStatusDangerBackground1,
        };
    }, []);
    var style = React.useMemo(function () { return (__assign(__assign(__assign({}, (isFocused ? focusedStyle : {})), (isDragAccept ? acceptStyle : {})), (isDragReject ? rejectStyle : {}))); }, [isFocused, isDragAccept, isDragReject]);
    var hasFilesRejection = React.useMemo(function () {
        return fileRejections.length > 0;
    }, [fileRejections]);
    var fileRejectionItems = React.useMemo(function () {
        return fileRejections.map(function (_a) {
            var file = _a.file, errors = _a.errors;
            return (React.createElement(Caption1, { key: file.name, style: { color: tokens.colorStatusDangerForeground1 } },
                file.name,
                " - ",
                errors.map(function (e) { return e.message; }).join(", ")));
        });
    }, [fileRejections]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.containerGlobalMarginTop },
            React.createElement(SelectUploadLocation, { onSelectedLocation: function (location) { return setSelectedUploadLocation(location); } }),
            React.createElement("div", __assign({}, getRootProps({ className: styles.baseStyle, style: style })),
                React.createElement("input", __assign({}, getInputProps())),
                React.createElement("div", { className: styles.dragContainer },
                    React.createElement(Icon, { icon: "mage:image-upload", className: styles.dragDropIconStyles }),
                    isDragAccept && React.createElement(Caption1, null, strings.ImagePickerDragFilesAccpted),
                    isDragReject && React.createElement(Caption1, null, strings.ImagePickerDragFilesRejected),
                    !isDragActive && React.createElement(Caption1, null, strings.ImagePickerDragFilesActive),
                    React.createElement(Body1, null, strings.ImagePickerDragDropText))),
            React.createElement("div", { className: styles.containerGlobalMarginTop }, hasFilesRejection && fileRejectionItems),
            React.createElement("div", { className: styles.imagesContainer }, renderFiles))));
};
//# sourceMappingURL=UploadFiles.js.map
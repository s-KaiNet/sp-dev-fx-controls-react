import { __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useAtomValue } from "jotai";
import { Body1Strong, Caption1, Card, CardPreview, Image, } from "@fluentui/react-components";
import { contextState } from "../atoms/contextState";
import { UPLOAD_FOLDER_NAME } from "../constants/constants";
import { useGraphAPI } from "../hooks/useGrapAPI";
import { useUploadFile } from "../hooks/useUploadFile";
import { useUtils } from "../hooks/useUtils";
import { DeleteFile } from "./DeleteFile";
import { FileError } from "./FileError";
import { FileProgress } from "./FileProgress";
import { RetryUpload } from "./RetryUpload";
import { useUploadFilesStyles } from "./useUploadFilesStyles";
export var UpLoadFile = function (props) {
    var file = props.file, onFileSelected = props.onFileSelected, selectedFileId = props.selectedFileId, uploadLocation = props.uploadLocation, onDelete = props.onDelete;
    var name = file.name, size = file.size, preview = file.preview;
    var styles = useUploadFilesStyles();
    var appGlobalState = useAtomValue(contextState);
    var context = appGlobalState.context;
    var getSiteAssetsLibrary = useGraphAPI(context).getSiteAssetsLibrary;
    var _a = React.useState(null), errorInfo = _a[0], setErrorInfo = _a[1];
    var _b = useUploadFile(context), uploadFile = _b[0], showProgressBar = _b[1], percentComplete = _b[2], isUploadFinished = _b[4];
    var _c = React.useState({}), fileSearchResult = _c[0], setFileSearchResult = _c[1];
    var hasErrorOnUpload = React.useMemo(function () {
        if (errorInfo && errorInfo.origemFunction === "uploadFile") {
            return true;
        }
        return false;
    }, [errorInfo]);
    var hasErrorOnDelete = React.useMemo(function () {
        if (errorInfo && errorInfo.origemFunction === "deleteFile") {
            return true;
        }
        return false;
    }, [errorInfo]);
    var _d = React.useState(false), retryUpload = _d[0], setRetryUpload = _d[1];
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var assetLibraryInfo, libraryId, parentReference, siteId, rs, fileSearchResult_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, getSiteAssetsLibrary(appGlobalState.context.pageContext.site.absoluteUrl)];
                    case 1:
                        assetLibraryInfo = _a.sent();
                        libraryId = assetLibraryInfo.id, parentReference = assetLibraryInfo.parentReference;
                        siteId = parentReference.siteId;
                        return [4 /*yield*/, uploadFile(file, UPLOAD_FOLDER_NAME, siteId, libraryId, uploadLocation)];
                    case 2:
                        rs = _a.sent();
                        fileSearchResult_1 = {
                            driveId: rs.parentReference.driveId,
                            title: rs.name,
                            path: rs.parentReference.path,
                            filename: rs.name,
                            siteID: rs.parentReference.siteId,
                            fileType: rs.file.mimeType,
                            spWebUrl: rs.webUrl,
                            id: rs.id,
                            modifiedBy: rs.lastModifiedBy.user.email,
                            lastModifiedTime: rs.lastModifiedDateTime,
                            fileExtension: rs.name.split(".").pop(),
                            created: "",
                            author: "",
                            editorOwsUser: "",
                            siteTitle: "",
                            parentLink: "",
                            listID: "",
                            listItemID: "",
                            spSiteURL: "",
                            webId: "",
                            uniqueID: "",
                            defaultEncodingURL: rs.webUrl,
                        };
                        setFileSearchResult(fileSearchResult_1);
                        setRetryUpload(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        setErrorInfo({ origemFunction: "uploadFile", error: "Uploaderror" });
                        setFileSearchResult({});
                        setRetryUpload(false);
                        console.error("[UploadFIle, File Upload Error]", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            URL.revokeObjectURL(preview);
        };
    }, [uploadFile, preview, retryUpload, uploadLocation, appGlobalState.context.pageContext.site.absoluteUrl]);
    var opacity = React.useMemo(function () { return (!isUploadFinished || hasErrorOnUpload ? 0.5 : 1); }, [
        isUploadFinished,
        hasErrorOnUpload,
    ]);
    var showDelete = React.useMemo(function () { return isUploadFinished; }, [isUploadFinished]);
    var showRetry = React.useMemo(function () { return hasErrorOnUpload; }, [hasErrorOnUpload]);
    var formatBytes = useUtils().formatBytes;
    var selected = React.useMemo(function () { return selectedFileId === fileSearchResult.id; }, [fileSearchResult, selectedFileId]);
    var onDeleteFile = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, driveId, siteID, id, name, isDeleted;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = fileSearchResult || {}, driveId = _a.driveId, siteID = _a.siteID, id = _a.id;
                    name = file.name;
                    return [4 /*yield*/, onDelete(name, driveId, siteID, id)];
                case 1:
                    isDeleted = _b.sent();
                    return [2 /*return*/, isDeleted];
            }
        });
    }); }, [fileSearchResult, onDelete]);
    var onRetry = React.useCallback(function () {
        setRetryUpload(true);
    }, [fileSearchResult]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles.card, selected: selected, onClick: function (e) {
                e.stopPropagation();
                if (fileSearchResult === null || fileSearchResult === void 0 ? void 0 : fileSearchResult.id) {
                    onFileSelected(fileSearchResult);
                }
            } },
            React.createElement(CardPreview, null,
                React.createElement(Image, { style: { height: 120, opacity: opacity, objectPosition: "0px 0px" }, fit: "cover", src: preview, alt: "image " })),
            React.createElement("div", { className: styles.itemBody },
                React.createElement(Body1Strong, { className: styles.headerTitle }, name),
                React.createElement(Caption1, null,
                    formatBytes(size, 2),
                    " "),
                React.createElement(FileProgress, { isShow: showProgressBar, percentageCompleted: percentComplete }),
                React.createElement(FileError, { isShow: hasErrorOnUpload || hasErrorOnDelete, error: errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.error })),
            React.createElement("div", { className: styles.bottomContainer },
                React.createElement(DeleteFile, { isWhow: showDelete, onDeleteFile: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var isDeleted;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, onDeleteFile()];
                                case 1:
                                    isDeleted = _a.sent();
                                    if (!isDeleted) {
                                        setErrorInfo({ origemFunction: "deleteFile", error: "Delete Error" });
                                    }
                                    else {
                                        setErrorInfo(null);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); } }),
                React.createElement(RetryUpload, { isShow: showRetry, onRetry: onRetry })))));
};
//# sourceMappingURL=UploadFile.js.map
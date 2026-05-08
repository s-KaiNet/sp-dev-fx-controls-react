import { __awaiter, __generator, __spreadArray } from "tslib";
import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { Stack } from "@fluentui/react/lib/Stack";
import { useSpAPI } from "../../hooks";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import { getScrollPosition } from "../../utils/utils";
import { RenderError } from "./RenderError";
import { RenderSpinner } from "./RenderSpinner";
import { Text } from "@fluentui/react/lib/Text";
import { AddComment } from "../AddComment/AddComment";
import { ECommentAction } from "../../common/ECommentAction";
import { useCallback } from "react";
import strings from "ControlStrings";
import { RenderComments } from "./RenderComments";
export var CommentsList = function () {
    var _a = useContext(ListItemCommentsStateContext), listItemCommentsState = _a.listItemCommentsState, setlistItemCommentsState = _a.setlistItemCommentsState;
    var configurationListClasses = useListItemCommentsStyles().configurationListClasses;
    var _b = useSpAPI(), getListItemComments = _b.getListItemComments, getNextPageOfComments = _b.getNextPageOfComments, addComment = _b.addComment, deleteComment = _b.deleteComment, likeComment = _b.likeComment, unlikeComment = _b.unlikeComment;
    var comments = listItemCommentsState.comments, isScrolling = listItemCommentsState.isScrolling, pageInfo = listItemCommentsState.pageInfo, commentAction = listItemCommentsState.commentAction, commentToAdd = listItemCommentsState.commentToAdd, selectedComment = listItemCommentsState.selectedComment;
    var hasMore = pageInfo.hasMore, nextLink = pageInfo.nextLink;
    var scrollPanelRef = useRef();
    var errorInfo = listItemCommentsState.errorInfo;
    var _loadComments = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _commentsResults, error_1, _errorInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_IS_LOADING,
                        payload: true,
                    });
                    return [4 /*yield*/, getListItemComments()];
                case 1:
                    _commentsResults = _a.sent();
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS,
                        payload: _commentsResults.comments,
                    });
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_DATA_PAGE_INFO,
                        payload: {
                            hasMore: _commentsResults.hasMore,
                            nextLink: _commentsResults.nextLink,
                        },
                    });
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
                        payload: undefined,
                    });
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_IS_LOADING,
                        payload: false,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    _errorInfo = { showError: true, error: error_1 };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [setlistItemCommentsState]);
    var _onAddComment = useCallback(function (commentText) { return __awaiter(void 0, void 0, void 0, function () {
        var _errorInfo, error_2, _errorInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    _errorInfo = { showError: false, error: undefined };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [4 /*yield*/, addComment(commentText)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _loadComments()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    _errorInfo = { showError: true, error: error_2 };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [setlistItemCommentsState, addComment, _loadComments]);
    var _onADeleteComment = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var _errorInfo, error_3, _errorInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!commentId)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    _errorInfo = { showError: false, error: undefined };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [4 /*yield*/, deleteComment(commentId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, _loadComments()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    _errorInfo = { showError: true, error: error_3 };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [setlistItemCommentsState, _loadComments]);
    var _onCommentLike = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var _errorInfo, error_4, _errorInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    _errorInfo = { showError: false, error: undefined };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [4 /*yield*/, likeComment(commentId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _loadComments()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    _errorInfo = { showError: true, error: error_4 };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [setlistItemCommentsState, _loadComments]);
    var _onCommentUnlike = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var _errorInfo, error_5, _errorInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    _errorInfo = { showError: false, error: undefined };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [4 /*yield*/, unlikeComment(commentId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _loadComments()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    _errorInfo = { showError: true, error: error_5 };
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
                        payload: _errorInfo,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [setlistItemCommentsState, _loadComments]);
    useEffect(function () {
        switch (commentAction) {
            case ECommentAction.ADD:
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // Add new comment
                            return [4 /*yield*/, _onAddComment(commentToAdd)];
                            case 1:
                                // Add new comment
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })()
                    .then(function () {
                    /* no-op; */
                })
                    .catch(function () {
                    /* no-op; */
                });
                break;
            case ECommentAction.LIKE:
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var commentId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                commentId = Number(selectedComment.id);
                                return [4 /*yield*/, _onCommentLike(commentId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })()
                    .then(function () {
                    /* no-op; */
                })
                    .catch(function () {
                    /* no-op; */
                });
                break;
            case ECommentAction.UNLIKE:
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var commentId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                commentId = Number(selectedComment.id);
                                return [4 /*yield*/, _onCommentUnlike(commentId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })()
                    .then(function () {
                    /* no-op; */
                })
                    .catch(function () {
                    /* no-op; */
                });
                break;
            case ECommentAction.DELETE:
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var commentId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                commentId = Number(selectedComment.id);
                                return [4 /*yield*/, _onADeleteComment(commentId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })()
                    .then(function () {
                    /* no-op; */
                })
                    .catch(function () {
                    /* no-op; */
                });
                break;
            default:
                break;
        }
    }, [
        commentAction,
        selectedComment,
        commentToAdd,
        _onAddComment,
        _onADeleteComment,
    ]);
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _loadComments()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, [_loadComments]);
    var handleScroll = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _scrollPosition, _commentsResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _scrollPosition = getScrollPosition(scrollPanelRef.current);
                    if (isScrolling)
                        return [2 /*return*/];
                    if (!(hasMore && _scrollPosition > 90)) return [3 /*break*/, 2];
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_IS_SCROLLING,
                        payload: true,
                    });
                    return [4 /*yield*/, getNextPageOfComments(nextLink)];
                case 1:
                    _commentsResults = _a.sent();
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS,
                        payload: __spreadArray(__spreadArray([], comments, true), _commentsResults.comments, true),
                    });
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_DATA_PAGE_INFO,
                        payload: { hasMore: _commentsResults.hasMore, nextLink: _commentsResults.nextLink },
                    });
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_IS_SCROLLING,
                        payload: false,
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [hasMore, nextLink, isScrolling, setlistItemCommentsState]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { tokens: { childrenGap: 10 } },
            React.createElement(RenderError, { errorInfo: errorInfo }),
            React.createElement(AddComment, null),
            React.createElement(Text, { variant: "small", block: true, style: { fontWeight: 600 } }, strings.ListItemCommentsLabel),
            React.createElement("div", { className: configurationListClasses.titlesContainer, onScroll: handleScroll, ref: scrollPanelRef },
                React.createElement(Stack, { styles: { root: { width: '100%' } } },
                    React.createElement(RenderComments, null)))),
        React.createElement(RenderSpinner, null)));
};
//# sourceMappingURL=CommentsList.js.map
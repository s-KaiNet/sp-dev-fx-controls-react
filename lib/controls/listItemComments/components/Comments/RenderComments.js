import { __awaiter, __generator } from "tslib";
import { IconButton } from '@fluentui/react/lib/Button';
import { DocumentCard, DocumentCardDetails, } from '@fluentui/react/lib/DocumentCard';
import { Stack } from '@fluentui/react/lib/Stack';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import { EListItemCommentsStateTypes, ListItemCommentsStateContext, } from '../ListItemCommentsStateProvider';
import { CommentItem } from './CommentItem';
import { RenderSpinner } from './RenderSpinner';
import { useListItemCommentsStyles } from './useListItemCommentsStyles';
import { useBoolean } from '@fluentui/react-hooks';
import { Link, List, Text } from '@fluentui/react';
import { AppContext, ECommentAction } from '../..';
import { LikedUserList } from './LikedUserList';
export var RenderComments = function () {
    var highlightedCommentId = useContext(AppContext).highlightedCommentId;
    var _a = useContext(ListItemCommentsStateContext), listItemCommentsState = _a.listItemCommentsState, setlistItemCommentsState = _a.setlistItemCommentsState;
    var _b = useListItemCommentsStyles(), documentCardStyles = _b.documentCardStyles, documentCardHighlightedStyles = _b.documentCardHighlightedStyles, itemContainerStyles = _b.itemContainerStyles, buttonsContainerStyles = _b.buttonsContainerStyles;
    var comments = listItemCommentsState.comments, isLoading = listItemCommentsState.isLoading;
    var _c = useBoolean(true), hideDialog = _c[0], setHideDialog = _c[1].toggle;
    var _d = useState(false), showDialog = _d[0], setShowDialog = _d[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _e = useState([]), selectedLikedBy = _e[0], setSelectedLikedBy = _e[1];
    var _likeComment = useCallback(function () {
        setlistItemCommentsState({
            type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
            payload: ECommentAction.LIKE,
        });
    }, []);
    var _unLikeComment = useCallback(function () {
        setlistItemCommentsState({
            type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
            payload: ECommentAction.UNLIKE,
        });
    }, []);
    var onRenderCell = useCallback(function (comment, index) {
        return (React.createElement(DocumentCard, { styles: highlightedCommentId && comment.id === highlightedCommentId
                ? documentCardHighlightedStyles
                : documentCardStyles, key: index },
            React.createElement(Stack, { horizontal: true, horizontalAlign: "end", styles: buttonsContainerStyles },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                    comment.likeCount > 0 ? (React.createElement(Link, { onClick: function () {
                            setSelectedLikedBy(comment.likedBy);
                            setShowDialog(true);
                        } }, comment.likeCount)) : (React.createElement(Text, null, comment.likeCount)),
                    React.createElement(IconButton, { iconProps: {
                            iconName: "".concat(comment.isLikedByUser ? 'LikeSolid' : 'Like'),
                        }, style: { fontSize: 10 }, onClick: function () {
                            setlistItemCommentsState({
                                type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                                payload: comment,
                            });
                            if (!comment.isLikedByUser) {
                                _likeComment();
                            }
                            else {
                                _unLikeComment();
                            }
                        } })),
                React.createElement(IconButton, { iconProps: { iconName: 'Delete' }, style: { fontSize: 10 }, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            setlistItemCommentsState({
                                type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                                payload: comment,
                            });
                            setHideDialog();
                            return [2 /*return*/];
                        });
                    }); } })),
            React.createElement(DocumentCardDetails, { styles: { root: { paddingTop: 15 } } },
                React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 12 }, styles: itemContainerStyles },
                    React.createElement(CommentItem, { comment: comment })))));
    }, [comments]);
    return (React.createElement(React.Fragment, null,
        isLoading ? (React.createElement(RenderSpinner, null)) : (React.createElement(List, { items: comments, onRenderCell: onRenderCell })),
        React.createElement(ConfirmDelete, { hideDialog: hideDialog, onDismiss: function (deleteComment) {
                if (deleteComment) {
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
                        payload: ECommentAction.DELETE,
                    });
                }
                setHideDialog();
            } }),
        React.createElement(LikedUserList, { isDialogOpen: showDialog, setShowDialog: setShowDialog, likedBy: selectedLikedBy })));
};
//# sourceMappingURL=RenderComments.js.map
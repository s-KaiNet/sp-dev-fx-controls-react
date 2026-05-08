import { __assign } from "tslib";
import { EListItemCommentsStateTypes } from "./EListItemCommentsStateTypes";
// Reducer
export var ListItemCommentsStateReducer = function (state, action) {
    switch (action.type) {
        case EListItemCommentsStateTypes.SET_ERROR_INFO:
            return __assign(__assign({}, state), { errorInfo: action.payload });
        case EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS:
            return __assign(__assign({}, state), { comments: action.payload });
        case EListItemCommentsStateTypes.SET_IS_LOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        case EListItemCommentsStateTypes.SET_IS_SCROLLING:
            return __assign(__assign({}, state), { isScrolling: action.payload });
        case EListItemCommentsStateTypes.SET_DATA_PAGE_INFO:
            return __assign(__assign({}, state), { pageInfo: action.payload });
        case EListItemCommentsStateTypes.SET_COMMENT_ACTION:
            return __assign(__assign({}, state), { commentAction: action.payload });
        case EListItemCommentsStateTypes.SET_ADD_COMMENT:
            return __assign(__assign({}, state), { commentToAdd: action.payload });
        case EListItemCommentsStateTypes.SET_SELECTED_COMMENT:
            return __assign(__assign({}, state), { selectedComment: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=ListItemCommentsStateReducer.js.map
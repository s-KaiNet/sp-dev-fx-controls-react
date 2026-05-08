import { __assign } from "tslib";
import { EMyTeamsTypes } from './EMyTeamsTypes';
export var myTeamsReducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case EMyTeamsTypes.SET_MYTEAMS:
            return __assign(__assign({}, state), { myTeams: action.payload });
        case EMyTeamsTypes.SET_MESSAGE:
            return __assign(__assign({}, state), { message: action.payload });
        case EMyTeamsTypes.SET_HAS_ERROR:
            return __assign(__assign({}, state), { hasError: action.payload });
        case EMyTeamsTypes.SET_IS_LOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=MyTeamsReducer.js.map
import { __assign } from "tslib";
import { ETeamTypes } from './ETeamTypes';
export var teamsReducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case ETeamTypes.SET_TEAM_MEMBERS:
            return __assign(__assign({}, state), { teamMembers: action.payload });
        case ETeamTypes.SET_TEAM_OWNERS:
            return __assign(__assign({}, state), { teamsOwners: action.payload });
        case ETeamTypes.SET_TEAM_CHANNELS:
            return __assign(__assign({}, state), { channelsMenu: action.payload });
        case ETeamTypes.SET_HAS_ERROR:
            return __assign(__assign({}, state), { hasError: action.payload });
        case ETeamTypes.SET_IS_LOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=TeamReducer.js.map
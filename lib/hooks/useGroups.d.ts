import { ServiceScope } from "@microsoft/sp-core-library";
import { IGroup } from "../common/model/IGroup";
export declare const useGroups: (serviceScope: ServiceScope) => {
    init: () => Promise<void>;
    getGroups: (filter?: string) => Promise<IGroup[]>;
};
//# sourceMappingURL=useGroups.d.ts.map
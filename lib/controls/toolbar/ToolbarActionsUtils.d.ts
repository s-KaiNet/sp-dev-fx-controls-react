/// <reference types="react" />
import { ObjectShorthandCollection, ShorthandCollection, ToolbarItemProps, ToolbarItemShorthandKinds, TreeItemProps } from "@fluentui/react-northstar";
import { TActions } from "../../common/model/TAction";
export declare type TToolbarItems = ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>;
export declare type TActionGroups = {
    [slug: string]: TActions;
};
export declare type TFilters = ObjectShorthandCollection<TreeItemProps, never>;
export declare type TToolbarLayout = "compact" | "verbose";
export declare function needsSeparator(actionSlug: string, index: number, actionSlugs: string[]): boolean;
export declare function flattenedActions(actionGroups: TActionGroups): TActions;
export declare function getInFlowToolbarItems(allActions: TActions, childredFactory: (action: any) => JSX.Element): TToolbarItems;
export declare function getOverflowToolbarItems(allActions: TActions, childredFactory: (action: any) => JSX.Element): TToolbarItems;
//# sourceMappingURL=ToolbarActionsUtils.d.ts.map
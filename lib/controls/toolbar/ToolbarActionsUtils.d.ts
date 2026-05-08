import { ObjectShorthandCollection, ShorthandCollection, ToolbarItemProps, ToolbarItemShorthandKinds, TreeItemProps } from "@fluentui/react-northstar";
import { TAction, TActions } from "../../common/model/TAction";
export type TToolbarItems = ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>;
export type TActionGroups = {
    [slug: string]: TActions;
};
export type TFilters = ObjectShorthandCollection<TreeItemProps, never>;
export type TToolbarLayout = "compact" | "verbose";
export declare function needsSeparator(actionSlug: string, index: number, actionSlugs: string[]): boolean;
export declare function flattenedActions(actionGroups: TActionGroups): TActions;
export declare function getInFlowToolbarItems(allActions: TActions, childredFactory: (action: TAction) => JSX.Element): TToolbarItems;
export declare function getOverflowToolbarItems(allActions: TActions, childredFactory: (action: TAction) => JSX.Element): TToolbarItems;
//# sourceMappingURL=ToolbarActionsUtils.d.ts.map
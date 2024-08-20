import { ComponentEventHandler, ToolbarItemProps } from "@fluentui/react-northstar";
export declare type TAction = {
    title: string;
    iconName?: string;
    multi?: boolean;
    onClick?: ComponentEventHandler<ToolbarItemProps>;
};
export declare type TActions = {
    [actionKey: string]: TAction;
};
//# sourceMappingURL=TAction.d.ts.map
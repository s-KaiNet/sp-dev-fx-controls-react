import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IBasePickerStyles } from "@fluentui/react/lib/Pickers";
export declare const useGroupPickerStyles: (themeVariant: IReadonlyTheme | undefined) => {
    componentClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        iconStyles: {
            paddingLeft: number;
            fontWeight: number;
            color: string;
        };
        groupTypeIconM365: string;
        groupTypeIconSecurity: string;
        separator: string;
    }>;
    pickerStylesMulti: Partial<IBasePickerStyles>;
    pickerStylesSingle: Partial<IBasePickerStyles>;
    renderItemStylesSingle: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    renderItemStylesMulti: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    renderIconButtonRemoveStyles: Partial<IButtonStyles>;
};
//# sourceMappingURL=GroupPickerStyles.d.ts.map
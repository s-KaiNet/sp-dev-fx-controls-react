import React from 'react';
import { IModernTermPickerProps } from './ModernTermPicker.types';
import { ITermInfo } from '@pnp/sp/taxonomy';
import { BasePicker, IPickerItemProps, ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
export declare class ModernTermPickerBase extends BasePicker<ITermInfo, IModernTermPickerProps> {
    static defaultProps: {
        onRenderItem: (props: IPickerItemProps<ITermInfo>) => JSX.Element;
        onRenderSuggestionsItem: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
    };
    constructor(props: IModernTermPickerProps);
}
export declare const ModernTermPicker: React.FunctionComponent<React.PropsWithChildren<React.PropsWithChildren<IModernTermPickerProps>>>;
//# sourceMappingURL=ModernTermPicker.d.ts.map
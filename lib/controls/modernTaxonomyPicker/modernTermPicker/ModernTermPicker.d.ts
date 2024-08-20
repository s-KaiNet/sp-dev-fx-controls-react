import React from 'react';
import { BasePicker } from '@fluentui/react/lib/components/pickers/BasePicker';
import { IModernTermPickerProps, ITermItemProps } from './ModernTermPicker.types';
import { ISuggestionItemProps } from '@fluentui/react/lib/components/pickers/Suggestions/SuggestionsItem.types';
import { ITermInfo } from '@pnp/sp/taxonomy';
export declare class ModernTermPickerBase extends BasePicker<ITermInfo, IModernTermPickerProps> {
    static defaultProps: {
        onRenderItem: (props: ITermItemProps) => JSX.Element;
        onRenderSuggestionsItem: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
    };
    constructor(props: IModernTermPickerProps);
}
export declare const ModernTermPicker: React.FunctionComponent<IModernTermPickerProps>;
//# sourceMappingURL=ModernTermPicker.d.ts.map
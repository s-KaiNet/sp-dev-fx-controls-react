import '@pnp/sp/folders';
import '@pnp/sp/webs';
import * as React from 'react';
import { IDynamicFieldProps } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
export declare class DynamicField extends React.Component<IDynamicFieldProps, IDynamicFieldState> {
    constructor(props: IDynamicFieldProps);
    componentDidUpdate(): void;
    render(): JSX.Element;
    private getFieldComponent;
    private onDeleteImage;
    private onURLChange;
    private onChange;
    private onBlur;
    private getRequiredErrorText;
    private getNumberErrorText;
    private isEmptyArray;
    private MultiChoice_selection;
    private saveIntoSharePoint;
}
//# sourceMappingURL=DynamicField.d.ts.map
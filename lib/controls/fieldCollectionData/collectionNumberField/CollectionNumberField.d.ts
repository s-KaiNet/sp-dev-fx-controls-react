import * as React from 'react';
import { ICollectionNumberFieldProps } from './ICollectionNumberFieldProps';
import { ICollectionNumberFieldState } from './ICollectionNumberFieldState';
export declare class CollectionNumberField extends React.Component<ICollectionNumberFieldProps, ICollectionNumberFieldState> {
    private async;
    private delayedValidate;
    constructor(props: ICollectionNumberFieldProps);
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * componentWillUpdate lifecycle hook
     *
     * @param nextProps
     * @param nextState
     */
    UNSAFE_componentWillUpdate(nextProps: ICollectionNumberFieldProps, nextState: ICollectionNumberFieldState): void;
    /**
     * Value change event handler
     *
     * @param field
     * @param value
     */
    private valueChange;
    /**
     * Delayed field validation
     */
    private valueValidation;
    /**
     * Default React render method
     */
    render(): React.ReactElement<ICollectionNumberFieldProps>;
}
//# sourceMappingURL=CollectionNumberField.d.ts.map
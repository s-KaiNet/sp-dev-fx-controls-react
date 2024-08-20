import * as React from "react";
import "@pnp/sp/lists";
import "@pnp/sp/content-types";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import { IDynamicFormProps } from "./IDynamicFormProps";
import { IDynamicFormState } from "./IDynamicFormState";
/**
 * DynamicForm Class Control
 */
export declare class DynamicForm extends React.Component<IDynamicFormProps, IDynamicFormState> {
    private _spService;
    private _formulaEvaluation;
    private _customFormatter;
    private webURL;
    constructor(props: IDynamicFormProps);
    /**
     * Lifecycle hook when component is mounted
     */
    componentDidMount(): void;
    componentDidUpdate(prevProps: IDynamicFormProps, prevState: IDynamicFormState): void;
    /**
     * Default React component render method
     */
    render(): JSX.Element;
    private renderField;
    private updateFormMessages;
    /** Triggered when the user submits the form. */
    private onSubmitClick;
    /**
     * Adds selected file to the library
     */
    private addFileToLibrary;
    /**
     * Triggered when the user makes any field value change in the form
     */
    private onChange;
    /** Validation callback, used when form first loads (getListInformation) and following onChange */
    private performValidation;
    /** Determines visibility of fields that have show/hide formulas set in Edit Form > Edit Columns > Edit Conditional Formula */
    private evaluateColumnVisibilityFormulas;
    /** Evaluates field validation formulas set in column settings and returns a Record of error messages */
    private evaluateFieldValueFormulas;
    /**
     * Evaluates formulas and returns a Record of error messages or an array of column names that have failed validation
     * @param formulas A Record / dictionary-like object, where key is internal column name and value is an object with ValidationFormula and ValidationMessage properties
     * @param returnMessages Determines whether a Record of error messages is returned or an array of column names that have failed validation
     * @param requireValue Set to true if the formula should only be evaluated when the field has a value
     * @returns
     */
    private evaluateFormulas;
    /**
     * Used for validation. Returns a Record of field values, where key is internal column name and value is the field value.
     * Expands certain properties and stores many of them as primitives (strings, numbers or bools) so the expression evaluator
     * can process them. For example: a User column named Person will have values stored as Person, Person.email, Person.title etc.
     * This is so the expression evaluator can process expressions like '=[$Person.title] == "Contoso Employee 1138"'
     * @param fieldCollection Optional. Could be used to compare field values in state with previous state.
     * @returns
     */
    private getFormValuesForValidation;
    /**
     * Invoked when component first mounts, loads information about the SharePoint list, fields and list item
     */
    private getListInformation;
    /**
     * Builds a collection of fields to be rendered in the form
     * @param listInfo Data returned by RenderListDataAsStream with RenderOptions = 64 (ClientFormSchema)
     * @param contentTypeName SharePoint List Content Type
     * @param item SharePoint List Item
     * @param numberFields Additional information about Number fields (min and max values)
     * @param listId SharePoint List ID
     * @param listItemId SharePoint List Item ID
     * @param disabledFields Fields that should be disabled due to configuration
     * @returns
     */
    private buildFieldCollection;
    private cultureNameLookup;
    private uploadImage;
    private getImageArrayBuffer;
    private closeValidationErrorDialog;
    private getValidationErrorTitle;
    private getValidationErrorMessage;
    private renderFileSelectionControl;
    private getFileIconFromExtension;
}
//# sourceMappingURL=DynamicForm.d.ts.map
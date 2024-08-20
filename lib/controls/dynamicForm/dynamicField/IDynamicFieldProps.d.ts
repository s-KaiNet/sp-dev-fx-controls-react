import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IFilePickerResult } from '../../filePicker';
export declare type DateFormat = 'DateTime' | 'DateOnly';
export declare type FieldChangeAdditionalData = IFilePickerResult;
export interface IDynamicFieldProps {
    context: BaseComponentContext;
    /** Internal column name */
    columnInternalName: string;
    cultureName?: string;
    /** SharePoint Field Type */
    fieldType: string;
    /** Text label for field */
    label?: string;
    /** Placeholder text for field */
    placeholder?: string;
    /** Specifies if a field should be filled in order to pass validation */
    required: boolean;
    /** Specifies if a field should be disabled */
    disabled?: boolean;
    /** List Item Id, passed to various utility/helper functions to determine things like selected User UPN, Lookup text, Term labels etc. */
    listItemId?: number;
    /** The default value of the field. */
    defaultValue: any;
    /** Holds a field value. Set on all fields in the form. */
    value?: any;
    /** Fired by DynamicField when a field value is changed */
    onChanged?: (columnInternalName: string, newValue: any, validate: boolean, additionalData?: FieldChangeAdditionalData) => void;
    /** Represents the value of the field as updated by the user. Only updated by fields when changed. */
    newValue?: any;
    /** Represents a stringified value of the field. Used in custom formatting and validation. */
    stringValue: any;
    /** Holds additional properties that can be queried in validation. For example a Person column may be reference by both [$Person] and [$Person.email] */
    subPropertyValues?: Record<string, any>;
    /** If validation raises an error message, it can be stored against the field here for display by DynamicField  */
    validationErrorMessage?: string;
    /** Field Term Set ID, used in Taxonomy / Metadata fields */
    fieldTermSetId?: string;
    /** Field Anchor ID, used in Taxonomy / Metadata fields */
    fieldAnchorId?: string;
    /** Lookup List ID, used in Lookup and User fields */
    lookupListID?: string;
    /** Lookup Field. Represents the field used for Lookup values. */
    lookupField?: string;
    /** Equivalent to HiddenListInternalName, used for Taxonomy Metadata fields */
    hiddenFieldName?: string;
    /** Order of the field in the form */
    Order: number;
    /** Used for files / image uploads */
    additionalData?: FieldChangeAdditionalData;
    options?: IDropdownOption[];
    isRichText?: boolean;
    dateFormat?: DateFormat;
    firstDayOfWeek: number;
    principalType?: string;
    description?: string;
    maximumValue?: number;
    minimumValue?: number;
    showAsPercentage?: boolean;
}
//# sourceMappingURL=IDynamicFieldProps.d.ts.map
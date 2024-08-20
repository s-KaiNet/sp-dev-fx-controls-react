import { ICustomCollectionField } from "../ICustomCollectionField";
export interface ICollectionNumberFieldProps {
    field: ICustomCollectionField;
    item: any;
    disableEdit: boolean;
    fOnValueChange: (fieldId: string, value: any) => void;
    fValidation: (field: ICustomCollectionField, value: any) => Promise<string>;
}
//# sourceMappingURL=ICollectionNumberFieldProps.d.ts.map
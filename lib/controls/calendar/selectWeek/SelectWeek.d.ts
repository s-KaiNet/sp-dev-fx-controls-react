import * as React from 'react';
export interface ISelectWeekStrings {
    selectWeekPlaceholder: string;
}
export declare const defaultSelectWeekStrings: ISelectWeekStrings;
export interface ISelectWeekProps {
    onSelected: (week: {
        startDate: Date;
        endDate: Date;
    }) => void;
    value?: Date;
    strings?: ISelectWeekStrings;
}
export declare const SelectWeek: React.FunctionComponent<ISelectWeekProps>;
//# sourceMappingURL=SelectWeek.d.ts.map
import * as React from 'react';
import { IControlsTestProps, IControlsTestState } from './IControlsTestProps';
/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
    private taxService;
    private richTextValue;
    /**
     * Static array for carousel control example.
     */
    private carouselElements;
    constructor(props: IControlsTestProps);
    /**
     * React componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * Event handler when changing the icon size in the dropdown
     * @param element
     */
    private _onIconSizeChange;
    /**
     * Open the property pane
     */
    private _onConfigure;
    /**
     * Method that retrieves the selected items in the list view
     * @param items
     */
    private _getSelection;
    /**
     *
     *Method that retrieves the selected terms from the taxonomy picker and sets state
     * @private
     * @param {IPickerTerms} terms
     * @memberof ControlsTest
     */
    private onServicePickerChange;
    /**
     * Method that retrieves the selected terms from the taxonomy picker
     * @param terms
     */
    private _onTaxPickerChange;
    /**
     * Method that retrieves the selected date/time from the DateTime picker
     * @param dateTimeValue
     */
    private _onDateTimePickerChange;
    /**
     * Selected lists change event
     * @param lists
     */
    private onListPickerChange;
    /**
     * Deletes second item from the list
     */
    private deleteItem;
    /**
     * Method that retrieves the selected items from People  Picker
     * @param items
     */
    private _getPeoplePickerItems;
    /**
     * Selected item from the list data picker
     */
    private listItemPickerDataSelected;
    private _startProgress;
    private _initProgressActions;
    /**
     * Triggers element change for the carousel example.
     */
    private triggerNextElement;
    private _onFilePickerSave;
    private _onRenderGridItem;
    /**
     * Renders the component
     */
    render(): React.ReactElement<IControlsTestProps>;
    private _getPage;
    private _onFolderSelect;
}
//# sourceMappingURL=ControlsTest_SingleComponent.d.ts.map
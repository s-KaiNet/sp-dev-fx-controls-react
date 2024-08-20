import * as React from 'react';
import { ISiteFilePickerTabProps } from './ISiteFilePickerTabProps';
import { ISiteFilePickerTabState } from './ISiteFilePickerTabState';
export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
    private _defaultLibraryNamePromise;
    constructor(props: ISiteFilePickerTabProps);
    private _parseInitialLocationState;
    private parseBreadcrumbsFromPaths;
    componentDidMount(): void;
    render(): React.ReactElement<ISiteFilePickerTabProps>;
    /**
     * Handles breadcrump item click
     */
    private onBreadcrumpItemClick;
    /**
     * Is called when user selects a different file
     */
    private _handleSelectionChange;
    /**
     * Called when user saves
     */
    private _handleSave;
    /**
     * Called when user closes tab
     */
    private _handleClose;
    /**
     * Triggered when user opens a file folder
     */
    private _handleOpenFolder;
    /**
     * Triggered when user opens a top-level document library
     */
    private _handleOpenLibrary;
}
//# sourceMappingURL=SiteFilePickerTab.d.ts.map
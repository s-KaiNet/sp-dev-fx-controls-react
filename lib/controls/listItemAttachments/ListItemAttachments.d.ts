import * as React from 'react';
import { IListItemAttachmentFile } from './IListItemAttachmentFile';
import { IListItemAttachmentsProps } from './IListItemAttachmentsProps';
import { IListItemAttachmentsState } from './IListItemAttachmentsState';
export declare class ListItemAttachments extends React.Component<IListItemAttachmentsProps, IListItemAttachmentsState> {
    private _spservice;
    private previewImages;
    private _utilities;
    constructor(props: IListItemAttachmentsProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): Promise<void>;
    private loadAttachmentPreview;
    uploadAttachments(itemId: number): Promise<void>;
    protected loadAttachmentsPreview(files: IListItemAttachmentFile[]): Promise<void>;
    /**
     * Load Item Attachments
     */
    private loadAttachments;
    /**
     * Close the dialog
     */
    private _closeDialog;
    /**
     * Attachment uploaded event handler
     */
    private _onAttachmentUpload;
    /**
     * On delete attachment event handler
     *
     * @param file
     */
    private onDeleteAttachment;
    /**
     * Delete the attachment once it was confirmed
     */
    private onConfirmedDeleteAttachment;
    /**
     * Get file extension from filename
     * @param fileName - The file name to extract extension from
     * @returns The file extension (without the dot) or empty string if no extension
     */
    private getFileExtension;
    /**
     * Renders attachments in tile/thumbnail mode using DocumentCard components
     * @returns JSX element containing attachment tiles
     */
    private renderTiles;
    /**
     * Renders attachments in list mode using DetailsList component
     * Supports both normal and compact display modes
     * @returns JSX element containing attachment list
     */
    private renderDetailsList;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IListItemAttachmentsProps>;
}
//# sourceMappingURL=ListItemAttachments.d.ts.map
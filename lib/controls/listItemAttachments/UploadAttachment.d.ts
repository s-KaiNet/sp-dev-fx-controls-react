import * as React from 'react';
import { IUploadAttachmentProps } from './IUploadAttachmentProps';
import { IUploadAttachmentState } from './IUploadAttachmentState';
export declare class UploadAttachment extends React.Component<IUploadAttachmentProps, IUploadAttachmentState> {
    private _spservice;
    private fileInput;
    private _isFileExplorerOpen;
    constructor(props: IUploadAttachmentProps);
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IUploadAttachmentProps, prevState: IUploadAttachmentState): void;
    /**
     * On attachment upload event
     */
    private onAttachmentUpload;
    /**
     * Add a new attachment
     */
    private addAttachment;
    /**
     * Close dialog
     */
    private closeDialog;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IUploadAttachmentProps>;
}
//# sourceMappingURL=UploadAttachment.d.ts.map
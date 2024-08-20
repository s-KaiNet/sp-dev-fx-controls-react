import * as React from 'react';
import { IDocumentLibraryBrowserProps } from './IDocumentLibraryBrowserProps';
import { IDocumentLibraryBrowserState } from './IDocumentLibraryBrowserState';
/**
 * Rows per page
 */
export declare const ROWS_PER_PAGE = 3;
/**
 * Maximum row height
 */
export declare const MAX_ROW_HEIGHT = 250;
/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
export declare class DocumentLibraryBrowser extends React.Component<IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState> {
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    constructor(props: IDocumentLibraryBrowserProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IDocumentLibraryBrowserProps>;
    /**
     * Calculates how many items there should be in the page
     */
    private _getItemCountForPage;
    /**
     * Gets the height of a list "page"
     */
    private _getPageHeight;
    /**
     * Renders a cell for search suggestions
     */
    private _onRenderLibraryTile;
    /**
     * Calls parent when library is opened
     */
    private _handleOpenLibrary;
}
//# sourceMappingURL=DocumentLibraryBrowser.d.ts.map
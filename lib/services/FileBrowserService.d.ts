import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFile, FilesQueryResult, ILibrary } from "./FileBrowserService.types";
export declare class FileBrowserService {
    protected itemsToDownloadCount: number;
    protected context: BaseComponentContext;
    protected siteAbsoluteUrl: string;
    protected driveAccessToken: string;
    protected mediaBaseUrl: string;
    protected callerStack: string;
    constructor(context: BaseComponentContext, itemsToDownloadCount?: number, siteAbsoluteUrl?: string);
    /**
     * Gets files from current sites library
     * @param listUrl web-relative url of the list
     * @param folderPath
     * @param acceptedFilesExtensions
     */
    getListItems: (listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string, sortBy?: string, isDesc?: boolean) => Promise<FilesQueryResult>;
    /**
     * Provides the URL for file preview.
     */
    getFileThumbnailUrl: (file: IFile, thumbnailWidth: number, thumbnailHeight: number) => string;
    /**
     * Gets document and media libraries from the site
     */
    getSiteMediaLibraries: (includePageLibraries?: boolean) => Promise<ILibrary[] | undefined>;
    /**
     * Gets document and media libraries from the site
     */
    getLibraryNameByInternalName: (internalName: string) => Promise<string>;
    /**
     * Downloads document content from SP location.
     */
    downloadSPFileContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
    /**
     * Maps IFile property name to SharePoint item field name
     * @param filePropertyName File Property
     * @returns SharePoint Field Name
     */
    getSPFieldNameForFileProperty(filePropertyName: string): string;
    /**
     * Gets the Title of the current Web
     * @returns SharePoint Site Title
     */
    getSiteTitle: () => Promise<string>;
    getSiteTitleAndId: () => Promise<{
        title: string;
        id: string;
    }>;
    /**
     * Executes query to load files with possible extension filtering
     * @param restApi
     * @param folderPath
     * @param acceptedFilesExtensions
     */
    protected _getListDataAsStream: (restApi: string, folderPath: string, acceptedFilesExtensions?: string[], sortBy?: string, isDesc?: boolean) => Promise<FilesQueryResult>;
    /**
     * Generates CamlQuery files filter.
     * @param accepts
     */
    protected getFileTypeFilter(accepts: string[]): string;
    /**
     * Generates Files CamlQuery ViewXml
     */
    protected getFilesCamlQueryViewXml: (accepts: string[], sortBy: string, isDesc: boolean) => string;
    /**
     * Converts REST call results to IFile
     */
    protected parseFileItem: (fileItem: any) => IFile;
    protected parseLibItem: (libItem: any, webUrl: string) => ILibrary;
    /**
     * Creates an absolute URL
     */
    protected buildAbsoluteUrl: (relativeUrl: string) => string;
    protected processResponse: (fileResponse: any) => void;
}
//# sourceMappingURL=FileBrowserService.d.ts.map
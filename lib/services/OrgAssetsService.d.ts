import { FileBrowserService } from "./FileBrowserService";
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ILibrary, FilesQueryResult } from "./FileBrowserService.types";
export declare class OrgAssetsService extends FileBrowserService {
    private _orgAssetsLibraryServerRelativeSiteUrl;
    constructor(context: BaseComponentContext, itemsToDownloadCount?: number);
    getListItems: (listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string) => Promise<FilesQueryResult>;
    getSiteMediaLibraries: (includePageLibraries?: boolean) => Promise<ILibrary[]>;
    private _parseOrgAssetsLibraryItem;
}
//# sourceMappingURL=OrgAssetsService.d.ts.map
export interface ISearchSuggestion {
    topic: string;
    backgroundUrl: string;
}
export declare type ImageSize = 'All' | 'Small' | 'Medium' | 'Large' | 'Wallpaper';
export declare type ImageAspect = 'All' | 'Square' | 'Wide' | 'Tall';
export declare type ImageLicense = 'All' | 'Any';
/**
 * Rows per page
 */
export declare const ROWS_PER_PAGE = 3;
/**
 * Maximum row height
 */
export declare const MAX_ROW_HEIGHT = 250;
/**
 * This is the default search suggestions as of Jan 2019.
 * I have no idea where Bing gets them.
 * But you can provide your own when calling this component
 */
export declare const DEFAULT_SUGGESTIONS: ISearchSuggestion[];
//# sourceMappingURL=WebSearchTab.types.d.ts.map
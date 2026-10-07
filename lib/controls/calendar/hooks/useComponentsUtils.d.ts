import * as React from 'react';
import { IBaseProps } from '@uifabric/utilities';
interface IUseUtils {
    getCacheKey: (key: string, uniqueId: string) => string;
    validateUrl: (url: string) => boolean;
    trimBeginDoubleSlash: (value: string) => string;
    isValidGUID: (str: string) => boolean;
    getPageNameFromUrl: (url: string) => string;
    getSPSiteAbsoluteUrl: (absolutefileUrl: string) => string;
    getFileServerRelativeUrlFromAbsoluteUrl: (absoluteFileUrl: string) => string;
    encodeRestUrl: (query: string) => string;
    getSpacing: <T>(value: string | T, containerWidth: number, type: 'vertical' | 'horizontal' | 'padding') => string;
    getCurrentDevice: (containerWidth: number) => string;
    getBaseStyles: (baseProps: IBaseProps, containerWidth: number, containerHeight: number) => React.CSSProperties;
    getLayoutBreakPoint: <T>(value: string | T, containerWidth: number) => string;
}
export declare const useComponentUtils: () => IUseUtils;
export {};
//# sourceMappingURL=useComponentsUtils.d.ts.map
import * as React from 'react';
/**
 * Measures how many flat-list children fit inside the available width.
 *
 * Uses three refs:
 *  - `toolbarRef`  → the outer toolbar; a ResizeObserver watches this
 *                     for width changes.
 *  - `rightRef`    → the far-items group; its width is subtracted from
 *                     the toolbar width to get the available space for
 *                     regular items.
 *  - `measureRef`  → a hidden mirror (`visibility:hidden; overflow:visible`)
 *                     that always renders ALL items so each child's true
 *                     unclipped width can be read.
 *
 * @returns The index in the flat item list at which items start to overflow.
 */
export declare function useOverflowIndex(toolbarRef: React.RefObject<HTMLDivElement>, rightRef: React.RefObject<HTMLDivElement>, measureRef: React.RefObject<HTMLDivElement>, itemCount: number, moreButtonWidth?: number): number;
//# sourceMappingURL=useOverflowIndex.d.ts.map
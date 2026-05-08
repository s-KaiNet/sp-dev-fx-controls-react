/* ------------------------------------------------------------------ */
/*  groupItems — groups items by their `group` property               */
/* ------------------------------------------------------------------ */
export function groupItems(items) {
    var groups = new Map();
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var groupName = item.group || 'default';
        if (!groups.has(groupName)) {
            groups.set(groupName, []);
        }
        groups.get(groupName).push(item);
    }
    return groups;
}
/* ------------------------------------------------------------------ */
/*  flattenWithDividers — builds a flat render-list from grouped items */
/* ------------------------------------------------------------------ */
export function flattenWithDividers(items, showGroupDividers) {
    var result = [];
    var grouped = groupItems(items);
    var groupEntries = Array.from(grouped.entries());
    for (var gi = 0; gi < groupEntries.length; gi++) {
        var _a = groupEntries[gi], groupItemsList = _a[1];
        var isLastGroup = gi === groupEntries.length - 1;
        for (var _i = 0, groupItemsList_1 = groupItemsList; _i < groupItemsList_1.length; _i++) {
            var item = groupItemsList_1[_i];
            if (item.dividerBefore) {
                result.push({ type: 'divider', key: "".concat(item.key, "-div-before") });
            }
            result.push({ type: 'item', item: item, key: item.key });
            if (item.dividerAfter) {
                result.push({ type: 'divider', key: "".concat(item.key, "-div-after") });
            }
        }
        if (showGroupDividers && !isLastGroup) {
            result.push({ type: 'divider', key: "group-div-".concat(gi) });
        }
    }
    return result;
}
//# sourceMappingURL=helpers.js.map
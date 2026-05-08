import React, { useEffect } from 'react';
import styles from './TermItemSuggestions.module.scss';
import * as strings from 'ControlStrings';
import { Guid } from '@microsoft/sp-core-library';
export function TermItemSuggestion(props) {
    var _a, _b;
    var _c = React.useState(""), parentLabel = _c[0], setParentLabel = _c[1];
    useEffect(function () {
        if (props.onLoadParentLabel) {
            props.onLoadParentLabel(Guid.parse(props.term.id.toString()))
                .then(function (localParentInfo) {
                setParentLabel(localParentInfo);
            })
                .catch(function () {
                // no-op;
            });
        }
    }, []);
    var filterLabels = function (isDefault, nameFilter) {
        nameFilter = nameFilter || (function () { return true; });
        if (props.languageTag && props.termStoreInfo) {
            var labels_1 = props.term.labels.filter(function (name) { return name.languageTag === props.languageTag && name.isDefault === isDefault && nameFilter(name.name); });
            if (labels_1.length === 0) {
                labels_1 = props.term.labels.filter(function (name) { return name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault === isDefault && nameFilter(name.name); });
            }
            return labels_1;
        }
        else {
            return props.term.labels.filter(function (name) { return name.isDefault === isDefault && nameFilter(name.name); });
        }
    };
    var labels = filterLabels(true);
    var synonyms = props.searchFilter ? filterLabels(false, function (name) {
        var prefix = props.searchFilter;
        if (prefix.length > name.length)
            return false;
        var compareTo = name.substring(0, prefix.length);
        return compareTo.localeCompare(prefix, undefined, { sensitivity: 'base' }) === 0;
    }) : [];
    return (React.createElement("div", { className: styles.termSuggestionContainer, title: (_a = labels[0]) === null || _a === void 0 ? void 0 : _a.name }, (_b = labels[0]) === null || _b === void 0 ? void 0 :
        _b.name,
        parentLabel !== "" && React.createElement("div", null,
            React.createElement("span", { className: styles.termSuggestionPath }, "".concat(strings.ModernTaxonomyPickerSuggestionInLabel, " ").concat(parentLabel))),
        synonyms.length > 0 && React.createElement("ul", { className: styles.termSynonymList }, synonyms.map(function (synonym) { return React.createElement("li", { key: synonym.name },
            React.createElement("span", { className: styles.synonymPrefix }, synonym.name.substring(0, props.searchFilter.length)),
            React.createElement("span", null, synonym.name.substring(props.searchFilter.length))); }))));
}
//# sourceMappingURL=TermItemSuggestion.js.map
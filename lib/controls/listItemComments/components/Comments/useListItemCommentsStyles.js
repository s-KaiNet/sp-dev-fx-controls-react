import * as React from "react";
import { mergeStyles, mergeStyleSets, } from "@fluentui/react/lib/Styling";
import { AppContext } from "../../common";
import { TILE_HEIGHT } from "../../common/constants";
export var useListItemCommentsStyles = function () {
    var _a = React.useContext(AppContext), theme = _a.theme, numberCommentsPerPage = _a.numberCommentsPerPage;
    // Calc Height List tiles Container Based on number Items per Page
    var tilesHeight = numberCommentsPerPage
        ? (numberCommentsPerPage < 5 ? 5 : numberCommentsPerPage) * TILE_HEIGHT + 35
        : 7 * TILE_HEIGHT;
    var itemContainerStyles = {
        root: { paddingTop: 0, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 },
    };
    var deleteButtonContainerStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
        },
    };
    var userListContainerStyles = {
        root: { paddingLeft: 2, paddingRight: 2, paddingBottom: 2, minWidth: 206 },
    };
    var renderUserContainerStyles = {
        root: { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 },
    };
    var documentCardStyles = {
        root: {
            marginBottom: 7,
            width: 322,
            backgroundColor: theme.neutralLighterAlt,
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardHighlightedStyles = {
        root: {
            marginBottom: 7,
            width: 322,
            backgroundColor: theme.themeLighter,
            border: "solid 3px " + theme.themePrimary,
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardDeleteStyles = {
        root: {
            marginBottom: 5,
            backgroundColor: theme.neutralLighterAlt,
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardUserStyles = {
        root: {
            marginTop: 2,
            backgroundColor: theme === null || theme === void 0 ? void 0 : theme.white,
            boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
            ":hover": {
                borderColor: theme.themePrimary,
                backgroundColor: theme.neutralLighterAlt,
                borderWidth: 1,
            },
        },
    };
    var configurationListClasses = mergeStyleSets({
        listIcon: mergeStyles({
            fontSize: 18,
            width: 18,
            height: 18,
            color: theme.themePrimary,
        }),
        nolistItemIcon: mergeStyles({
            fontSize: 28,
            width: 28,
            height: 28,
            color: theme.themePrimary,
        }),
        divContainer: {
            display: "block",
        },
        titlesContainer: {
            height: tilesHeight,
            marginBottom: 10,
            display: "flex",
            marginTop: 15,
            overflow: "auto",
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.neutralLighter,
            },
            "&::-webkit-scrollbar": {
                width: 5,
            },
        },
    });
    return {
        itemContainerStyles: itemContainerStyles,
        deleteButtonContainerStyles: deleteButtonContainerStyles,
        userListContainerStyles: userListContainerStyles,
        renderUserContainerStyles: renderUserContainerStyles,
        documentCardStyles: documentCardStyles,
        documentCardDeleteStyles: documentCardDeleteStyles,
        documentCardHighlightedStyles: documentCardHighlightedStyles,
        documentCardUserStyles: documentCardUserStyles,
        configurationListClasses: configurationListClasses,
    };
};
//# sourceMappingURL=useListItemCommentsStyles.js.map
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext } from "./../ListItemCommentsStateProvider";
import { MentionsInput, Mention } from "react-mentions";
import { useCallback } from "react";
import { useAddCommentStyles } from "./useAddCommentStyles";
import { PHOTO_URL } from "../../common/constants";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { ECommentAction } from "../../common/ECommentAction";
import { useMsGraphAPI } from "../..";
export var AddComment = function (props) {
    var _a = useState(""), commentText = _a[0], setCommentText = _a[1];
    var _b = useMsGraphAPI(), getUsers = _b.getUsers, getSuggestions = _b.getSuggestions;
    var _c = useAddCommentStyles(), reactMentionStyles = _c.reactMentionStyles, mentionsClasses = _c.mentionsClasses, componentClasses = _c.componentClasses;
    var _d = useState(true), singleLine = _d[0], setSingleLine = _d[1];
    var setlistItemCommentsState = useContext(ListItemCommentsStateContext).setlistItemCommentsState;
    var _addCommentText = useRef({ mentions: [], text: "" });
    var sugestionsContainer = useRef();
    var _reactMentionStyles = reactMentionStyles;
    var _onChange = useCallback(function (event, newValue, newPlainTextValue, mentions) {
        _reactMentionStyles = reactMentionStyles;
        if (newValue) {
            setSingleLine(false);
            _reactMentionStyles["&multiLine"].control = { height: 63 };
            _addCommentText.current.text = newPlainTextValue;
            _addCommentText.current.mentions = [];
            for (var index = 0; index < mentions.length; index++) {
                var mention = mentions[index];
                _addCommentText.current.text = _addCommentText.current.text.replace(mention.display, "@mention{".concat(index, "}"));
                _addCommentText.current.mentions.push({ email: mention.id, name: mention.display.replace("@", "") });
            }
        }
        else {
            setSingleLine(true);
            _reactMentionStyles["&multiLine"].control = { height: 35 };
            _addCommentText.current = { mentions: [], text: "" };
        }
        setCommentText(newValue);
    }, []);
    var _addComment = useCallback(function () {
        setlistItemCommentsState({ type: EListItemCommentsStateTypes.SET_COMMENT_ACTION, payload: ECommentAction.ADD });
        setlistItemCommentsState({ type: EListItemCommentsStateTypes.SET_ADD_COMMENT, payload: _addCommentText.current });
        setSingleLine(true);
        setCommentText("");
    }, []);
    var _searchData = function (search, callback) {
        // Try to get sugested users when user type '@'
        if (!search) {
            getSuggestions()
                .then(function (res) { return res.users.map(function (user) { return ({ display: user.displayName, id: user.mail }); }); })
                .then(callback)
                .catch(function () { });
        }
        else {
            getUsers(search)
                .then(function (res) { return res.users.map(function (user) { return ({ display: user.displayName, id: user.mail }); }); })
                .then(callback)
                .catch(function () { });
        }
    };
    var renderSugestion = useCallback(function (suggestion) {
        var _user = {
            id: suggestion.id,
            displayName: suggestion.display,
            mail: suggestion.id,
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(Stack, { tokens: { padding: 5 }, styles: { root: { width: 260 } } },
                React.createElement(Stack, { horizontal: true, horizontalAlign: "start", tokens: { childrenGap: 10 } },
                    React.createElement("img", { src: "".concat(PHOTO_URL).concat(_user.mail), width: 30, height: 30, style: { borderRadius: "50%" } }),
                    React.createElement(Stack, null,
                        React.createElement(Text, { styles: { root: { fontWeight: 700 } }, variant: "smallPlus", nowrap: true }, _user.displayName),
                        React.createElement(Text, { variant: "small", nowrap: true }, _user.mail))))));
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "renderSugestions", ref: function (el) {
                sugestionsContainer.current = el;
            } }),
        React.createElement("div", { className: componentClasses.container, style: { height: singleLine ? 35 : "unset" } },
            React.createElement(MentionsInput, { value: commentText, onChange: _onChange, placeholder: "@mention or comment", style: _reactMentionStyles, suggestionsPortalHost: sugestionsContainer.current },
                React.createElement(Mention, { trigger: "@", data: _searchData, renderSuggestion: renderSugestion, displayTransform: function (id, display) { return "@".concat(display); }, className: mentionsClasses.mention })),
            React.createElement(Stack, { horizontal: true, horizontalAlign: "end", tokens: { padding: 10 } },
                React.createElement(IconButton, { iconProps: { iconName: "send" }, title: "Send", onClick: function () {
                        _addComment();
                    } })))));
};
//# sourceMappingURL=AddComment.js.map
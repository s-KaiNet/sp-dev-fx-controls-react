var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { Button, FluentProvider, makeStyles, shorthands, Title3, } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { Icon } from '@iconify/react';
import { HoverReactionsBar } from '../../../controls/HoverReactionsBar';
import { RenderEmoji, } from '../../../controls/HoverReactionsBar/components/reactionPicker/RenderEmoji';
var useStyles = makeStyles({
    root: __assign(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }, shorthands.gap("10px")), { marginLeft: "50%", marginRight: "50%", height: "fit-content", width: "fit-content" }),
    image: {
        width: "20px",
        height: "20px",
    },
    title: {
        marginBottom: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
export var TestControl = function (props) {
    var themeVariant = props.themeVariant, context = props.context;
    var _a = React.useState(false), isOpenHoverReactionBar = _a[0], setIsOpenHoverReactionBar = _a[1];
    var _b = React.useState(), selectedEmoji = _b[0], setSelectedEmoji = _b[1];
    var divRefAddReaction = React.useRef(null);
    var styles = useStyles();
    var setTheme = React.useCallback(function () {
        return createV9Theme(themeVariant);
    }, [themeVariant]);
    var onSelectEmoji = React.useCallback(function (emoji, emojiInfo) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setSelectedEmoji(emojiInfo);
            setIsOpenHoverReactionBar(false);
            return [2 /*return*/];
        });
    }); }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(FluentProvider, { theme: setTheme() },
            React.createElement("div", { className: styles.title },
                React.createElement(Title3, null, "Test Control - HoverReactionsBar")),
            React.createElement("div", { ref: divRefAddReaction, className: styles.root },
                React.createElement(Button, { appearance: "transparent", icon: React.createElement(Icon, { icon: "fluent-emoji-high-contrast:thumbs-up", width: 22, height: 22, onClick: function (ev) {
                            setIsOpenHoverReactionBar(true);
                        } }) }),
                selectedEmoji && React.createElement(RenderEmoji, { emoji: selectedEmoji, className: styles.image })),
            React.createElement(HoverReactionsBar, { isOpen: isOpenHoverReactionBar, onSelect: onSelectEmoji, onDismiss: function () {
                    setIsOpenHoverReactionBar(false);
                }, target: divRefAddReaction.current }))));
};
//# sourceMappingURL=TestControl.js.map
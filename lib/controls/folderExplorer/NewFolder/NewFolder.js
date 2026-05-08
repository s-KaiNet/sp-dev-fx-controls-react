import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import styles from './NewFolder.module.scss';
import * as strings from 'ControlStrings';
import { FolderExplorerService } from '../../../services/FolderExplorerService';
var addIcon = { iconName: 'CheckMark' };
var NewFolder = /** @class */ (function (_super) {
    __extends(NewFolder, _super);
    function NewFolder(props) {
        var _this = _super.call(this, props) || this;
        _this._onFolderNameChange = function (newValue) {
            _this.setState({ folderName: newValue || '', errorMessage: '' });
        };
        _this._onShowInputChange = function (event) {
            _this.setState({ showInput: true });
        };
        /**
       * Add new subfolder to current folder
       */
        _this._addSubFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            var newFolder, siteAbsoluteUrl, folder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newFolder = null;
                        this.setState({ loading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
                        return [4 /*yield*/, this._spService.AddFolder(siteAbsoluteUrl, this.props.selectedFolder.ServerRelativeUrl, this.state.folderName)];
                    case 2:
                        folder = _a.sent();
                        // update folder variable to be used on the callback
                        newFolder = { Name: folder.Name, ServerRelativeUrl: folder.ServerRelativeUrl };
                        // update return variable
                        this.setState({ loading: false, folderName: '' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error adding folder', error_1);
                        this.setState({
                            loading: false,
                            errorMessage: strings.SomethingWentWrong
                        });
                        return [3 /*break*/, 4];
                    case 4:
                        // callback
                        this.props.addSubFolder(newFolder).then(function () { }).catch(function () { });
                        return [2 /*return*/];
                }
            });
        }); };
        _this._spService = new FolderExplorerService(_this.props.context.serviceScope);
        _this.state = {
            folderName: '',
            showInput: false,
            loading: false,
        };
        return _this;
    }
    NewFolder.prototype.render = function () {
        var _this = this;
        var _a = this.state, folderName = _a.folderName, errorMessage = _a.errorMessage;
        var hasError = folderName && /["*:<>?/\\|]/gmi.test(folderName);
        return (React.createElement("div", { className: styles.libraryItem },
            this.state.loading &&
                React.createElement("span", { className: styles.spinner },
                    React.createElement(Spinner, { size: SpinnerSize.xSmall, styles: {
                            root: {
                                height: '32px'
                            }
                        } })),
            !this.state.loading &&
                React.createElement(Icon, { iconName: "FabricNewFolder", className: styles.folderIcon }),
            !this.state.showInput &&
                React.createElement("div", { className: styles.defaultText, onClick: this._onShowInputChange }, "New folder"),
            this.state.showInput &&
                React.createElement(TextField, { styles: {
                        errorMessage: {
                            paddingTop: 0
                        },
                        root: {
                            width: '100%'
                        }
                    }, placeholder: strings.NewFolderNamePlaceholder, value: folderName, onChange: function (e, value) { return _this._onFolderNameChange(value); }, errorMessage: hasError ? strings.NewFolderIncorrectSymbolsError : errorMessage }),
            this.state.folderName.length > 0 &&
                React.createElement(IconButton, { iconProps: addIcon, title: "Add", ariaLabel: "Add", className: styles.button, disabled: this.state.loading || hasError, onClick: this._addSubFolder })));
    };
    return NewFolder;
}(React.Component));
export { NewFolder };
//# sourceMappingURL=NewFolder.js.map
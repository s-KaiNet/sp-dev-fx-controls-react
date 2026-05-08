import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneTextField, PropertyPaneToggle, } from '@microsoft/sp-property-pane';
import { ThemeProvider, } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ControlsTest from './components/ControlsTest';
import { PropertyPaneControlToggles, } from './propertyPane/PropertyPaneControlToggles';
import { PropertyPaneListPicker } from './propertyPane/PropertyPaneListPicker';
import { Version } from '@microsoft/sp-core-library';
/**
 * Web part to test the React controls
 */
var ControlsTestWebPart = /** @class */ (function (_super) {
    __extends(ControlsTestWebPart, _super);
    function ControlsTestWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._containerWidth = 0;
        // Apply btheme id in Teams
        _this._applyTheme = function (theme) {
            _this.context.domElement.setAttribute("data-theme", theme);
            document.body.setAttribute("data-theme", theme);
        };
        return _this;
    }
    ControlsTestWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var context;
            return __generator(this, function (_a) {
                this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
                // If it exists, get the theme variant
                this._themeVariant = this._themeProvider.tryGetTheme();
                // Register a handler to be notified if the theme variant changes
                this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
                if (this.context.sdks.microsoftTeams) {
                    context = this.context.sdks.microsoftTeams.context;
                    this._applyTheme(context.theme || "default");
                    this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(this._applyTheme);
                }
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    /**
     * Update the current theme variant reference and re-render.
     *
     * @param args The new theme
     */
    ControlsTestWebPart.prototype._handleThemeChangedEvent = function (args) {
        this._themeVariant = args.theme;
        this.render();
    };
    ControlsTestWebPart.prototype.render = function () {
        var _this = this;
        var _a, _b;
        /*  const element: React.ReactElement<ITestControlProps> = React.createElement(
    
          TestControl,
           {
             context: this.context,
              themeVariant: this._themeVariant,
    
           }
         );
     */
        var listItemId = Number(this.properties.dynamicFormListItemId);
        if (listItemId < 1 || isNaN(listItemId)) {
            listItemId = undefined;
        }
        var element = React.createElement(ControlsTest, {
            themeVariant: this._themeVariant,
            context: this.context,
            controlVisibility: this.properties.controlVisibility,
            description: this.properties.description,
            title: (_a = this.properties.title) !== null && _a !== void 0 ? _a : "Sample title",
            displayMode: this.displayMode,
            dynamicFormListId: this.properties.dynamicFormListId,
            dynamicFormListItemId: (_b = listItemId === null || listItemId === void 0 ? void 0 : listItemId.toString()) !== null && _b !== void 0 ? _b : undefined,
            dynamicFormErrorDialogEnabled: this.properties.dynamicFormErrorDialogEnabled,
            dynamicFormCustomFormattingEnabled: this.properties.dynamicFormCustomFormattingEnabled,
            dynamicFormClientSideValidationEnabled: this.properties.dynamicFormClientSideValidationEnabled,
            dynamicFormFieldValidationEnabled: this.properties.dynamicFormFieldValidationEnabled,
            dynamicFormFileSelectionEnabled: this.properties.dynamicFormFileSelectionEnabled,
            dynamicFormToggleTaxonomyPicker: this.properties.dynamicFormToggleTaxonomyPicker,
            onOpenPropertyPane: function () {
                _this.context.propertyPane.open();
            },
            updateProperty: function (value) {
                _this.properties.title = value;
                if (_this.context.propertyPane.isPropertyPaneOpen()) {
                    _this.context.propertyPane.refresh();
                }
            },
            paginationTotalPages: this.properties.paginationTotalPages
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(ControlsTestWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ControlsTestWebPart.prototype.onAfterResize = function (newWidth) {
        this._containerWidth = newWidth;
        this.render();
    };
    ControlsTestWebPart.prototype.getPropertyPaneConfiguration = function () {
        var _this = this;
        return {
            pages: [
                {
                    header: {
                        description: 'Change settings below'
                    },
                    groups: [
                        {
                            groupName: 'Control Settings',
                            groupFields: [
                                PropertyPaneTextField('title', {
                                    label: 'Web Part Title'
                                }),
                                PropertyPaneTextField('paginationTotalPages', {
                                    label: 'Total pages in pagination'
                                }),
                                new PropertyPaneListPicker('dynamicFormListId', {
                                    label: 'List for Dynamic Form',
                                    wpContext: this.context,
                                    selectedKey: this.properties.dynamicFormListId,
                                    disabled: false,
                                    onPropertyChange: function (propertyPath, newValue) {
                                        _this.properties.dynamicFormListId = newValue;
                                        _this.render();
                                        _this.context.propertyPane.refresh();
                                    }
                                }),
                                PropertyPaneTextField('dynamicFormListItemId', {
                                    label: 'List Item ID for Dynamic Form',
                                }),
                                PropertyPaneToggle('dynamicFormErrorDialogEnabled', {
                                    label: 'Dynamic Form Error Dialog'
                                }),
                                PropertyPaneToggle('dynamicFormCustomFormattingEnabled', {
                                    label: 'Dynamic Form Custom Formatting'
                                }),
                                PropertyPaneToggle('dynamicFormClientSideValidationEnabled', {
                                    label: 'Dynamic Form Client Side Show/Hide Validation'
                                }),
                                PropertyPaneToggle('dynamicFormFieldValidationEnabled', {
                                    label: 'Dynamic Form Field Validation'
                                }),
                                PropertyPaneToggle('dynamicFormFileSelectionEnabled', {
                                    label: 'Dynamic Form File Selection'
                                }),
                                PropertyPaneToggle('dynamicFormToggleTaxonomyPicker', {
                                    label: 'Dynamic Form Use Modern Taxonomy Picker'
                                }),
                            ]
                        },
                        {
                            groupName: 'Controls',
                            groupFields: [
                                new PropertyPaneControlToggles('controlVisibility', {
                                    controlVisibility: this.properties.controlVisibility,
                                    label: 'Toggle controls',
                                    onPropertyChange: function (newValue) {
                                        _this.properties.controlVisibility = newValue;
                                        _this.render();
                                        _this.context.propertyPane.refresh();
                                    }
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ControlsTestWebPart;
}(BaseClientSideWebPart));
export default ControlsTestWebPart;
//# sourceMappingURL=ControlsTestWebPart.js.map
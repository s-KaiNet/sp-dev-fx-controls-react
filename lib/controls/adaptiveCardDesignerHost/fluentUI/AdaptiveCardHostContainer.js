import { __extends } from "tslib";
import { Versions } from "adaptivecards";
import { HostContainer } from "adaptivecards-designer/lib/containers";
import { initializeAdaptiveCardHost } from "../../adaptiveCardHost/AdaptiveCardHost.HostConfig";
import { registerFluentUIActions } from "../../adaptiveCardHost/fluentUI/Actions";
import { registerFluentUIElements } from "../../adaptiveCardHost/fluentUI/Elements";
import { AdaptiveCardHostThemeType } from "../../adaptiveCardHost/models/AdaptiveCardHostThemeType";
import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";
export var AdaptiveCardHostContainerType;
(function (AdaptiveCardHostContainerType) {
    AdaptiveCardHostContainerType["Default"] = "default";
    AdaptiveCardHostContainerType["TeamsDefault"] = "TeamsDefault";
    AdaptiveCardHostContainerType["TeamsDark"] = "TeamsDark";
    AdaptiveCardHostContainerType["TeamsHighContrast"] = "TeamsHighContrast";
})(AdaptiveCardHostContainerType || (AdaptiveCardHostContainerType = {}));
var AdaptiveCardHostContainer = /** @class */ (function (_super) {
    __extends(AdaptiveCardHostContainer, _super);
    function AdaptiveCardHostContainer(name, type) {
        var _this = _super.call(this, name) || this;
        _this.type = type;
        registerFluentUIElements(_this.elementsRegistry);
        registerFluentUIActions(_this.actionsRegistry);
        return _this;
    }
    AdaptiveCardHostContainer.prototype.renderTo = function (hostElement) {
        var container = document.createElement("div");
        container.className = "adaptiveCardHostContainer";
        container.appendChild(this.cardHost);
        hostElement.appendChild(container);
    };
    AdaptiveCardHostContainer.prototype.getCurrentStyleSheet = function () {
        return "";
    };
    AdaptiveCardHostContainer.prototype.getHostConfig = function () {
        var hostThemeType;
        switch (this.type) {
            case AdaptiveCardHostContainerType.Default:
                hostThemeType = AdaptiveCardHostThemeType.SharePoint;
                break;
            case AdaptiveCardHostContainerType.TeamsDefault:
                hostThemeType = AdaptiveCardHostThemeType.Teams;
                break;
            case AdaptiveCardHostContainerType.TeamsDark:
                hostThemeType = AdaptiveCardHostThemeType.TeamsDark;
                break;
            case AdaptiveCardHostContainerType.TeamsHighContrast:
                hostThemeType = AdaptiveCardHostThemeType.TeamsHighContrast;
                break;
        }
        var adaptiveCardHostConfigResult = initializeAdaptiveCardHost(hostThemeType, fluentUIDefaultTheme());
        return adaptiveCardHostConfigResult.hostConfig;
    };
    Object.defineProperty(AdaptiveCardHostContainer.prototype, "targetVersion", {
        get: function () {
            return Versions.v1_5;
        },
        enumerable: false,
        configurable: true
    });
    return AdaptiveCardHostContainer;
}(HostContainer));
export { AdaptiveCardHostContainer };
//# sourceMappingURL=AdaptiveCardHostContainer.js.map
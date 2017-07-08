﻿/// <reference path="imports.ts" />

module BitChangeSetManager {

    let dependencyManager = DependencyManager.getCurrent();

    dependencyManager.registerFileDependency({
        name: "normalize",
        path: "node_modules/normalize-css/normalize",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "angular-material-styles",
        path: "node_modules/angular-material/angular-material",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "kendo-common-styles",
        path: "node_modules/@bit/kendo-ui-core/styles/kendo.common.min",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "kendo-light-blue-theme-styles",
        path: "node_modules/@bit/kendo-ui-core/styles/kendo.material.min",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "kendo-rtl-styles",
        path: "node_modules/@bit/kendo-ui-core/styles/kendo.rtl.min",
        predicate: (appInfo) => {
            return appInfo.screenSize == "DesktopAndTablet" && appInfo.culture == "FaIr";
        },
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "persian-date-picker-styles",
        path: "node_modules/@bit/persian-date-picker/dist/css/persian-date-picker",
        fileDependecyType: "Style",
        predicate: (appInfo) => appInfo.culture == "FaIr"
    });

    dependencyManager.registerFileDependency({
        name: "persian-date-picker-blue-styles",
        path: "node_modules/@bit/persian-date-picker/dist/css/theme/persian-date-picker-blue",
        fileDependecyType: "Style",
        predicate: (appInfo) => appInfo.culture == "FaIr"
    });

    dependencyManager.registerFileDependency({
        name: "controls-styles",
        path: "node_modules/@bit/bit-framework/contents/styles/controls",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "light-blue-theme-custom-styles",
        path: "node_modules/@bit/bit-framework/contents/styles/theme.light.blue",
        fileDependecyType: "Style"
    });

    dependencyManager.registerFileDependency({
        name: "en-US-styles",
        path: "node_modules/@bit/bit-framework/contents/styles/en-US",
        fileDependecyType: "Style",
        predicate: appEnvProvider => appEnvProvider.culture == "EnUs"
    });

    dependencyManager.registerFileDependency({
        name: "fa-IR-styles",
        path: "node_modules/@bit/bit-framework/contents/styles/fa-IR",
        fileDependecyType: "Style",
        predicate: appEnvProvider => appEnvProvider.culture == "FaIr"
    });

    dependencyManager.registerFileDependency({
        name: "Core-js",
        path: "node_modules/Core-js/client/Core"
    });

    dependencyManager.registerFileDependency({
        name: "fetch",
        path: "node_modules/fetch/fetch",
        predicate: (appInfo) => {
            return typeof (fetch) == "undefined";
        }
    });

    dependencyManager.registerFileDependency({
        name: "runtime",
        path: "node_modules/regenerator-runtime/runtime"
    });

    dependencyManager.registerFileDependency({
        name: "jQuery",
        path: "node_modules/jquery/dist/jquery",
        onLoad: () => {
            // For electron compatibility
            if (typeof window["require"] != 'undefined' && window["module"] != null && window["module"].exports != null) {
                window["$"] = window["jQuery"] = window["module"].exports;
            }
        }
    });

    dependencyManager.registerFileDependency({
        name: "angular",
        path: "node_modules/angular/angular"
    });

    dependencyManager.registerFileDependency({
        name: "kendo-ui-web",
        path: "node_modules/@bit/kendo-ui-core/js/kendo.web.min"
    });

    dependencyManager.registerFileDependency({
        name: "kendo-culture-fa-IR",
        path: "node_modules/@bit/kendo-ui-core/js/cultures/kendo.culture.fa-IR.min",
        predicate: (appInfo) => {
            return appInfo.screenSize == "DesktopAndTablet" && appInfo.culture == "FaIr";
        }
    });

    dependencyManager.registerFileDependency({
        name: "kendo-messages-fa-IR",
        path: "node_modules/@bit/kendo-ui-core/js/messages/kendo.messages.fa-IR.min",
        continueOnError: true,
        predicate: (appInfo) => {
            return appInfo.screenSize == "DesktopAndTablet" && appInfo.culture == "FaIr";
        }
    });

    dependencyManager.registerFileDependency({
        name: "odataJS",
        path: "node_modules/@bit/olingo-odatajs/odatajs"
    });

    dependencyManager.registerFileDependency({
        name: "jayData",
        path: "node_modules/@bit/jaydata/jaydata"
    });

    dependencyManager.registerFileDependency({
        name: "jayData-inMemory-provider",
        path: "node_modules/@bit/jaydata/jaydataproviders/InMemoryProvider"
    });

    dependencyManager.registerFileDependency({
        name: "jayData-odata-provider",
        path: "node_modules/@bit/jaydata/jaydataproviders/oDataProvider"
    });

    dependencyManager.registerFileDependency({
        name: "jayData-indexedDb-provider",
        path: "node_modules/@bit/jaydata/jaydataproviders/indexedDbProvider"
    });

    dependencyManager.registerFileDependency({
        name: "jayData-kendo-module",
        path: "node_modules/@bit/jaydata/jaydatamodules/kendo"
    });

    dependencyManager.registerFileDependency({
        name: "jayData-inmemroy-module",
        path: "node_modules/@bit/jaydata/jaydatamodules/inmemory"
    });

    dependencyManager.registerFileDependency({
        name: "ng-component-router",
        path: "node_modules/ngComponentRouter/angular_1_router"
    });

    dependencyManager.registerFileDependency({
        name: "angular-animate",
        path: "node_modules/angular-animate/angular-animate"
    });

    dependencyManager.registerFileDependency({
        name: "angular-area",
        path: "node_modules/angular-aria/angular-aria"
    });

    dependencyManager.registerFileDependency({
        name: "angular-material",
        path: "node_modules/angular-material/angular-material"
    });

    dependencyManager.registerFileDependency({
        name: "angular-messages",
        path: "node_modules/angular-messages/angular-messages"
    });

    dependencyManager.registerFileDependency({
        name: "angular-translate",
        path: "node_modules/angular-translate/dist/angular-translate"
    });

    dependencyManager.registerFileDependency({
        name: "persian-date",
        path: "node_modules/@bit/persian-date/dist/persian-date",
        predicate: (appInfo) => appInfo.culture == "FaIr"
    });

    dependencyManager.registerFileDependency({
        name: "persian-date-picker",
        path: "node_modules/@bit/persian-date-picker/dist/js/persian-date-picker",
        predicate: (appInfo) => appInfo.culture == "FaIr"
    });

    dependencyManager.registerFileDependency({
        name: "signalR",
        path: "node_modules/signalr/jquery.signalR"
    });

    dependencyManager.registerFileDependency({
        name: "pubsub-js",
        path: "node_modules/pubsub-js/src/pubsub"
    });

    dependencyManager.registerFileDependency({
        name: "decimaljs",
        path: "node_modules/decimal.js/decimal"
    });

    dependencyManager.registerFileDependency({
        name: "bit-model-context",
        path: "node_modules/@bit/bit-framework/Bit.Model.Context"
    });

    dependencyManager.registerFileDependency({
        name: "bit-change-set-manager-context",
        path: "bitChangeSetManager.Model.Context"
    });

    dependencyManager.registerFileDependency({
        name: "bit-change-set-manager-styles",
        path: "view/styles/bitChangeSetManagerStyles",
        fileDependecyType: "Style"
    });
}
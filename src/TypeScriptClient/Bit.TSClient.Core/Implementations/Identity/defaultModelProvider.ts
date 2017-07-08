﻿module Bit.Implementations.Identity {

    export class DefaultModelProvider implements Contracts.Identity.IModelProvider {

        private model: Models.Identity.ISsoModel;

        @Log()
        public getModel(): Models.Identity.ISsoModel {

            if (this.model == null) {

                const loginModelJson = document.getElementById("modelJson");

                let encodedJson = "";

                if (typeof (loginModelJson.textContent) !== "undefined") {
                    encodedJson = loginModelJson.textContent;
                } else {
                    encodedJson = loginModelJson.innerHTML;
                }

                const json = Encoder.htmlDecode(encodedJson);

                this.model = JSON.parse(json);

                if (this.model.autoRedirect && this.model.redirectUrl) {
                    if (this.model.autoRedirectDelay < 0) {
                        this.model.autoRedirectDelay = 0;
                    }
                    setTimeout(() => {
                        location.assign(this.model.redirectUrl);
                    }, this.model.autoRedirectDelay * 1000);
                }
            }

            return this.model;
        }

    }
}
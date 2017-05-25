"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var google_auth_service_1 = require("./google-auth.service");
describe('GoogleAuthService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [google_auth_service_1.GoogleAuthService]
        });
    });
    it('should ...', testing_1.inject([google_auth_service_1.GoogleAuthService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=google-auth.service.spec.js.map
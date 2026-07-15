"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const AppService_1 = require("../services/AppService");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const app_interceptor_1 = require("../interceptors/app.interceptor");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getUserById(id) {
        return this.appService.findUserById(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUserById", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('apps'),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    __metadata("design:paramtypes", [AppService_1.AppService])
], AppController);
//# sourceMappingURL=AppController.js.map
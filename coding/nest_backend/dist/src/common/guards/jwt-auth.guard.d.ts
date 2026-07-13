import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
export declare class JwtAuthGuard implements CanActivate {
    private readonly JwtService;
    constructor(JwtService: JwtService);
    canActivate(context: any): Promise<boolean>;
}

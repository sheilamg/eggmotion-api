import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "./enums/user-role.enum";

/// user: shoru@gmail.com pass:1234

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Get('admin-only')
  @Roles(UserRole.ADMIN)
  findAdminOnlyData() {
    return 'Solo los administradores pueden ver esto';
  }

  @Get('moderator-or-admin')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  findModeratorData() {
    return 'Acceso para moderadores y admins';
  }

}
// src/auth/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/user-role.enum';
import { envConfig } from '../config/env.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(user, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user?.email, sub: user?.id, role: user?.role };
    
    // Generar access token y refresh token
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(
      { sub: user?.id, type: 'refresh' },
      { expiresIn: envConfig.jwt.refreshExpiresIn }
    );

    return {
      access_token,
      refresh_token,
      expires_in: envConfig.jwt.expiresIn,
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
      },
    };
  }

  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const user = await this.usersService.create(
      dto.name,
      dto.email,
      dto.password
    );

    const { password, ...safeUser } = user;
    
    // Solo retornar información del usuario, NO generar token
    return {
      message: 'User registered successfully',
      user: safeUser,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // En una implementación más avanzada, aquí podrías invalidar el refresh token
    // Por ahora, solo retornamos un mensaje de éxito
    return { message: 'Logged out successfully' };
  }
}

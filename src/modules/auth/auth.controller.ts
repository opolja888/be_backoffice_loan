import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserRole } from 'src/common/enums/user.enum';
import { RtAuthGuard } from './guards/refresh-token-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@GetUser() user: any) {
    return this.authService.login(user.sub ?? user.id, user.email, user.role ?? UserRole.USER);
  }

  // @UseGuards(RtAuthGuard)
  // @Post('refresh')
  // async refresh(@GetUser('sub') userId: string, @GetUser('refreshToken') rt: string) {
  //   return this.authService.refreshTokens(userId, rt);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('me/admin')
  meAdmin(@GetUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@GetUser() user: any) {
    return user;
  }
}

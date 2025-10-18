import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { ErrorException } from 'src/common/exceptions/error.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly userRepo: UserRepository,
  ) { }

  async register(dto: RegisterAuthDto) {
    try {
      // const exists = await this.userRepo.findOne({ email: dto.email });
      // if (exists) throw new ConflictException('Email already exists');

      // const passwordHash = await argon2.hash(dto.password);
      // const user = await this.userRepo.save(this.userRepo.create({ ...dto, passwordHash }));

      // const tokens = await this.issueTokens(user.id, user.email, user.role);
      // await this.updateRefreshHash(user.id, tokens.refreshToken);

      // return { user: this.sanitize(user), ...tokens };
    } catch (error) {
      throw new ErrorException(error);
    }

    // const exists = await this.users.exists({ where: { email: dto.email } });
    // if (exists) throw new ConflictException('Email is already taken');

    // const passwordHash = await argon2.hash(dto.password);
    // const user = await this.users.save(this.users.create({ email: dto.email, passwordHash }));

    // const tokens = await this.issueTokens(user.id, user.email, user.role);
    // await this.updateRefreshHash(user.id, tokens.refreshToken);
    // return { user: this.sanitize(user), ...tokens };
  }

  async validateUser(email: string, password: string) {
    try {
      // const user = await this.userRepo.findOneWithCredentials({ email });
      // if (!user) return null;

      // const match = await argon2.verify(user.passwordHash, password);
      // if (!match) return null;

      // return this.sanitize(user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  private async issueTokens(sub: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync({ sub, email, role }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }),
      this.jwt.signAsync({ sub, email }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }

  private sanitize(user: User) {
    const { passwordHash, refreshTokenHash, ...safe } = user as any;
    return safe;
  }

  private async updateRefreshHash(userId: string, refreshToken: string) {
    try {
      // const refreshTokenHash = await argon2.hash(refreshToken);
      // await this.userRepo.update(userId, { refreshTokenHash });
    } catch (error) {
      throw new ErrorException(error);
    }
    // const refreshTokenHash = await argon2.hash(refreshToken);
    // await this.users.update({ id: userId }, { refreshTokenHash });
  }

  // 4) หลัง LocalStrategy ผ่าน → เรียกจาก controller เพื่อออก token
  async login(userId: string, email: string, role: string) {
    const tokens = await this.issueTokens(userId, email, role);
    await this.updateRefreshHash(userId, tokens.refreshToken);
    return tokens;
  }

  // 5) Refresh (rotation + ตรวจเทียบแฮช)
  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.users
  //     .createQueryBuilder('u')
  //     .addSelect('u.refreshTokenHash')
  //     .where('u.id = :userId', { userId })
  //     .getOne();

  //   if (!user || !user.refreshTokenHash) throw new ForbiddenException('Access denied');

  //   const valid = await argon2.verify(user.refreshTokenHash, refreshToken);
  //   if (!valid) throw new ForbiddenException('Invalid refresh token');

  //   const tokens = await this.issueTokens(user.id, user.email, user.role);
  //   await this.updateRefreshHash(user.id, tokens.refreshToken); // rotation
  //   return tokens;
  // }

  // 6) Logout → ล้างแฮชทิ้ง
  async logout(userId: string) {
    // await this.users.update({ id: userId }, { refreshTokenHash: null });
    // return { ok: true };
  }
}

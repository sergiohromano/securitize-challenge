import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './hashing';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(user: any) {
    const payload = { sub: user.userId, username: user.username, user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      throw new UnauthorizedException();
    }
    const hashedPass = hashPassword(pass);
    const newUser = await this.usersService.createOne(username, hashedPass);
    if (!newUser) {
      throw new UnauthorizedException();
    }
    const payload = { sub: newUser.userId, username: newUser.username, user: newUser };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(username: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}

import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/reagister.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      //将登陆成功后的用户信息加载到jwt，生产token，设置header头，返回到客户端
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('token', token);
      return 'login success';
    } else {
      return 'login failed';
    }
  }
  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    this.userService.register(user);
  }
}

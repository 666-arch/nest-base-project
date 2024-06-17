import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/reagister.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Post('login')
  async login(@Body() user: LoginDto) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });

    }
  }
  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    this.userService.register(user);
  }
}

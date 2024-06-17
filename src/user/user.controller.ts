import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/reagister.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: LoginDto) {
    console.log('user', user);
  }
  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    this.userService.register(user);
  }
}

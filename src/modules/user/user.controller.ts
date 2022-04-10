import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body) {
    return this.userService.login(body);
  }

  @Get('verify')
  async verify(@Req() req) {
    return await this.userService.verify(req.headers.token);
  }

  @Post('add')
  async add(@Body() body) {}
}

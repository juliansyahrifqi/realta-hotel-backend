import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { LoginGuestDto } from './dto/login-guest.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginEmployee')
  loginEmployee(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.authService.loginEmployee(loginEmployeeDto);
  }

  @Post('loginGuest')
  loginGuest(@Body() loginGuestDto: LoginGuestDto) {
    return this.authService.loginGuest(loginGuestDto);
  }
}

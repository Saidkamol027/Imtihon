import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('refresh')
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refreshToken(req, res)
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}

	@Post('register')
	async register(
		@Body() dto: RegisterAuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.register(dto, res)
	}

	@Post('login')
	async login(
		@Body() dto: LoginAuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.login(dto, res)
	}
}

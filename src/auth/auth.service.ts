import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly authRepo: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	async register(dto: RegisterAuthDto, res: Response) {
		const existsUserEmail = await this.authRepo.findOne({
			where: { email: dto.email },
		})

		if (existsUserEmail) {
			throw new ConflictException('This email already exist')
		}
		const passwordHash = await hash(dto.password, 10)

		const newUser = await this.authRepo.create({
			password: passwordHash,
			full_name: dto.full_name,
			email: dto.email,
		})

		await this.authRepo.save(newUser)

		const tokens = await this.generateToken(newUser)

		res.cookie('refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		return { access_token: tokens.access_token }
	}

	async login(dto: LoginAuthDto, res: Response) {
		const existsEmail = await this.authRepo.findOne({
			where: { email: dto.email },
		})

		if (!existsEmail) {
			throw new NotFoundException('User not found')
		}

		const isMatch = await compare(dto.password, existsEmail.password)

		if (!isMatch) {
			throw new UnauthorizedException('Invalid password')
		}

		const tokens = await this.generateToken(existsEmail)

		res.cookie('refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV == 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		return { access_token: tokens.access_token }
	}

	async refreshToken(req: Request, res: Response) {
		const refreshToken = req.cookies['refresh_token']

		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token not found')
		}

		try {
			const payload = await this.jwtService.verifyAsync(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			})

			const user = await this.authRepo.findOne({ where: { id: payload.sub } })

			if (!user) {
				throw new UnauthorizedException('User not found')
			}

			const tokens = this.generateToken(user)

			res.cookie('refresh_token', tokens.refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV == 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})

			return { message: 'Refresh token ', access_token: tokens.access_token }
		} catch (error) {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}

	async logout(res: Response) {
		res.clearCookie('refresh_token')
		return { message: 'Logged out successfuly' }
	}

	private generateToken(user: User) {
		const payload = { sub: user.id, email: user.email }

		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: process.env.JWT_ACCESS_EXPIRES,
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRES,
		})

		return { access_token: accessToken, refresh_token: refreshToken }
	}
}

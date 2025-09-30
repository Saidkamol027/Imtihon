import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	MinLength,
} from 'class-validator'
import { AdminRole } from '../entities/admin.entity'

export class CreateAdminDto {
	@IsNotEmpty()
	full_name: string

	@IsEmail()
	email: string

	@MinLength(6)
	password: string

	@IsOptional()
	@IsEnum(AdminRole)
	role?: AdminRole
}

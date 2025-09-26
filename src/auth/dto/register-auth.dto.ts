import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterAuthDto {
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	full_name: string

	@IsNotEmpty()
	@MinLength(6)
	password: string
}

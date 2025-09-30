import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	MinLength,
} from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	fullname: string

	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@MinLength(6)
	password: string

	@IsPhoneNumber('UZ')
	phone: string
}

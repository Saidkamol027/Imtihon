import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCompanyDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	country: string

	@IsString()
	@IsNotEmpty()
	contact: string
}

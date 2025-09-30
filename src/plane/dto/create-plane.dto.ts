import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreatePlaneDto {
	@IsString()
	@IsNotEmpty()
	model: string

	@IsInt()
	@IsNotEmpty()
	capacity: number

	@IsUUID()
	@IsNotEmpty()
	companyId: string
}

import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateBaggageDto {
	@IsNumber()
	@IsNotEmpty()
	weight: number

	@IsString()
	@IsNotEmpty()
	type: string

	@IsUUID()
	@IsNotEmpty()
	user_id: string

	@IsUUID()
	@IsNotEmpty()
	ticket_id: string
}

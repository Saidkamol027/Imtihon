import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsUUID,
	Max,
	Min,
} from 'class-validator'

export class CreateReviewDto {
	@IsString()
	@IsNotEmpty()
	comment: string

	@IsNumber()
	@Min(0)
	@Max(5)
	rating: number

	@IsUUID()
	userId: string

	@IsUUID()
	flightId: string
}

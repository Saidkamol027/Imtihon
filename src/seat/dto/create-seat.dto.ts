import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'
import { SeatStatus } from '../entities/seat.entity'

export class CreateSeatDto {
	@IsString()
	@IsNotEmpty()
	seat_number: string

	@IsUUID()
	@IsNotEmpty()
	flight_id: string

	@IsUUID()
	@IsNotEmpty()
	class_id: string

	@IsOptional()
	@IsEnum(SeatStatus)
	status?: SeatStatus
}

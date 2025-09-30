import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsUUID,
} from 'class-validator'
import { TicketStatus } from '../entities/ticket.entity'

export class CreateTicketDto {
	@IsUUID()
	@IsNotEmpty()
	user_id: string

	@IsUUID()
	@IsNotEmpty()
	flight_id: string

	@IsUUID()
	@IsNotEmpty()
	seat_id: string

	@IsUUID()
	@IsNotEmpty()
	class_id: string

	@IsNotEmpty()
	@IsNumber()
	price: number

	@IsOptional()
	round_trip?: boolean

	@IsEnum(TicketStatus)
	@IsOptional()
	status?: TicketStatus

	@IsOptional()
	refund?: boolean
}

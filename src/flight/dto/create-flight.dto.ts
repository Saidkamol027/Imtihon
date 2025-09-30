import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsUUID,
} from 'class-validator'

export enum FlightStatus {
	SCHEDULED = 'scheduled',
	DELAYED = 'delayed',
	CANCELLED = 'cancelled',
	COMPLETED = 'completed',
}

export class CreateFlightDto {
	@IsString()
	@IsNotEmpty()
	from_city: string

	@IsString()
	@IsNotEmpty()
	to_city: string

	@IsDateString()
	departure_time: Date

	@IsDateString()
	arrival_time: Date

	@IsEnum(FlightStatus)
	status: FlightStatus

	@IsUUID()
	plane_id: string

	@IsUUID()
	company_id: string
}

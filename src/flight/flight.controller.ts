import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { CreateFlightDto } from './dto/create-flight.dto'
import { UpdateFlightDto } from './dto/update-flight.dto'
import { FlightsService } from './flight.service'

@Controller('flight')
export class FlightController {
	constructor(private readonly flightService: FlightsService) {}

	@Post()
	create(@Body() createFlightDto: CreateFlightDto) {
		return this.flightService.create(createFlightDto)
	}

	@Get()
	findAll() {
		return this.flightService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.flightService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
		return this.flightService.update(id, updateFlightDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.flightService.remove(id)
	}
}

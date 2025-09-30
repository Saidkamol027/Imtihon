import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFlightDto } from './dto/create-flight.dto'
import { UpdateFlightDto } from './dto/update-flight.dto'
import { Flight } from './entities/flight.entity'

@Injectable()
export class FlightsService {
	constructor(
		@InjectRepository(Flight)
		private flightsRepo: Repository<Flight>
	) {}

	async create(data: CreateFlightDto) {
		const flight = this.flightsRepo.create(data)
		return this.flightsRepo.save(flight)
	}

	findAll() {
		return this.flightsRepo.find({
			relations: ['plane', 'company'],
		})
	}

	async findOne(id: string) {
		const flight = await this.flightsRepo.findOne({
			where: { id },
			relations: ['plane', 'company'],
		})
		if (!flight) throw new NotFoundException('Flight not found')
		return flight
	}

	async update(id: string, data: UpdateFlightDto) {
		const flight = await this.findOne(id)
		Object.assign(flight, data)
		return this.flightsRepo.save(flight)
	}

	async remove(id: string) {
		const flight = await this.findOne(id)
		return this.flightsRepo.remove(flight)
	}
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { Class } from '../class/entities/class.entity'
import { Flight } from '../flight/entities/flight.entity'
import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { Seat } from './entities/seat.entity'

@Injectable()
export class SeatService {
	constructor(
		@InjectRepository(Seat) private readonly seatRepo: Repository<Seat>,
		@InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
		@InjectRepository(Class)
		private readonly classRepo: Repository<Class>
	) {}

	async create(dto: CreateSeatDto) {
		const flight = await this.flightRepo.findOne({
			where: { id: dto.flight_id },
		})
		if (!flight) throw new NotFoundException('Flight not found')

		const cls = await this.classRepo.findOne({ where: { id: dto.class_id } })
		if (!cls) throw new NotFoundException('Class not found')

		const seat = this.seatRepo.create({
			seat_number: dto.seat_number,
			status: dto.status,
			flight,
			classEntity: cls,
		} as DeepPartial<Seat>)
		return this.seatRepo.save(seat)
	}

	findAll() {
		return this.seatRepo.find({
			relations: ['flight', 'class', 'tickets'],
		})
	}

	async findOne(id: string): Promise<Seat> {
		const seat = await this.seatRepo.findOne({
			where: { id },
			relations: ['flight', 'classEntity', 'tickets'],
		})
		if (!seat) throw new NotFoundException('Seat not found')
		return seat
	}

	async update(id: string, dto: UpdateSeatDto): Promise<Seat> {
		const seat = await this.findOne(id)

		if (dto.flight_id) {
			const flight = await this.flightRepo.findOne({
				where: { id: dto.flight_id },
			})
			if (!flight) throw new NotFoundException('Flight not found')
			seat.flight = flight
		}

		if (dto.class_id) {
			const cls = await this.classRepo.findOne({ where: { id: dto.class_id } })
			if (!cls) throw new NotFoundException('Class not found')
			seat.class = cls
		}

		if (typeof dto.seat_number !== 'undefined')
			seat.seat_number = dto.seat_number
		if (typeof dto.status !== 'undefined') seat.status = dto.status

		return this.seatRepo.save(seat)
	}

	async remove(id: string): Promise<void> {
		const seat = await this.findOne(id)
		await this.seatRepo.remove(seat)
	}
}

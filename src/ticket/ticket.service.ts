import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Flight } from 'src/flight/entities/flight.entity'
import { Seat } from 'src/seat/entities/seat.entity'
import { User } from 'src/users/entities/user.entity'
import { DeepPartial, Repository } from 'typeorm'
import { Class } from '../class/entities/class.entity'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { Ticket } from './entities/ticket.entity'

@Injectable()
export class TicketService {
	constructor(
		@InjectRepository(Ticket)
		private readonly ticketRepository: Repository<Ticket>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Flight)
		private readonly flightRepository: Repository<Flight>,
		@InjectRepository(Seat)
		private readonly seatRepository: Repository<Seat>,
		@InjectRepository(Class)
		private readonly classRepository: Repository<Class>
	) {}

	async create(dto: CreateTicketDto) {
		const user = dto.user_id
			? await this.userRepository.findOne({ where: { id: dto.user_id } })
			: null
		const flight = dto.flight_id
			? await this.flightRepository.findOne({ where: { id: dto.flight_id } })
			: null
		const seat = dto.seat_id
			? await this.seatRepository.findOne({ where: { id: dto.seat_id } })
			: null
		const classEntity = dto.class_id
			? await this.classRepository.findOne({ where: { id: dto.class_id } })
			: null

		const ticket = this.ticketRepository.create({
			price: dto.price,
			round_trip: dto.round_trip,
			status: dto.status,
			refund: dto.refund,
			user,
			flight,
			seat,
			class: classEntity,
		} as DeepPartial<Ticket>)

		return this.ticketRepository.save(ticket)
	}

	async findAll() {
		return this.ticketRepository.find({
			relations: ['user', 'flight', 'seat', 'class'],
		})
	}

	async findOne(id: string) {
		const ticket = await this.ticketRepository.findOne({
			where: { id },
			relations: ['user', 'flight', 'seat', 'classEntity'],
		})
		if (!ticket) throw new NotFoundException('Ticket not found')
		return ticket
	}

	async update(id: string, dto: UpdateTicketDto) {
		const ticket = await this.findOne(id)
		Object.assign(ticket, {
			...dto,
			user: dto.user_id ? { id: dto.user_id } : ticket.user,
			flight: dto.flight_id ? { id: dto.flight_id } : ticket.flight,
			seat: dto.seat_id ? { id: dto.seat_id } : ticket.seat,
			classEntity: dto.class_id ? { id: dto.class_id } : ticket.class,
		})
		return this.ticketRepository.save(ticket)
	}

	async remove(id: string): Promise<void> {
		const ticket = await this.findOne(id)
		await this.ticketRepository.remove(ticket)
	}
}

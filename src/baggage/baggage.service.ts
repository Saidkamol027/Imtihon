import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { Ticket } from '../ticket/entities/ticket.entity'
import { CreateBaggageDto } from './dto/create-baggage.dto'
import { UpdateBaggageDto } from './dto/update-baggage.dto'
import { Baggage } from './entities/baggage.entity'

@Injectable()
export class BaggageService {
	constructor(
		@InjectRepository(Baggage) private readonly bagRepo: Repository<Baggage>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>
	) {}

	async create(dto: CreateBaggageDto): Promise<Baggage> {
		const user = await this.userRepo.findOne({ where: { id: dto.user_id } })
		if (!user) throw new NotFoundException('User not found')

		const ticket = await this.ticketRepo.findOne({
			where: { id: dto.ticket_id },
		})
		if (!ticket) throw new NotFoundException('Ticket not found')

		const bag = this.bagRepo.create({
			weight: dto.weight,
			type: dto.type,
			user,
			ticket,
		})
		return this.bagRepo.save(bag)
	}

	findAll(): Promise<Baggage[]> {
		return this.bagRepo.find({ relations: ['user', 'ticket'] })
	}

	async findOne(id: string): Promise<Baggage> {
		const bag = await this.bagRepo.findOne({
			where: { id },
			relations: ['user', 'ticket'],
		})
		if (!bag) throw new NotFoundException('Baggage not found')
		return bag
	}

	async update(id: string, dto: UpdateBaggageDto): Promise<Baggage> {
		const bag = await this.findOne(id)
		if (dto.user_id) {
			const user = await this.userRepo.findOne({ where: { id: dto.user_id } })
			if (!user) throw new NotFoundException('User not found')
			bag.user = user
		}
		if (dto.ticket_id) {
			const ticket = await this.ticketRepo.findOne({
				where: { id: dto.ticket_id },
			})
			if (!ticket) throw new NotFoundException('Ticket not found')
			bag.ticket = ticket
		}
		if (typeof dto.weight !== 'undefined') bag.weight = dto.weight
		if (typeof dto.type !== 'undefined') bag.type = dto.type

		return this.bagRepo.save(bag)
	}

	async remove(id: string): Promise<void> {
		const bag = await this.findOne(id)
		await this.bagRepo.remove(bag)
	}
}

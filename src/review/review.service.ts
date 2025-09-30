import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Flight } from '../flight/entities/flight.entity'
import { User } from '../users/entities/user.entity'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewRepo: Repository<Review>,
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		@InjectRepository(Flight)
		private readonly flightRepo: Repository<Flight>
	) {}

	async create(dto: CreateReviewDto) {
		const user = await this.userRepo.findOne({ where: { id: dto.userId } })
		const flight = await this.flightRepo.findOne({
			where: { id: dto.flightId },
		})

		if (!user) throw new NotFoundException('User not found')
		if (!flight) throw new NotFoundException('Flight not found')

		const review = this.reviewRepo.create({
			comment: dto.comment,
			rating: dto.rating,
			user,
			flight,
		})
		return this.reviewRepo.save(review)
	}

	async findAll() {
		return this.reviewRepo.find()
	}

	async findOne(id: string) {
		const review = await this.reviewRepo.findOne({ where: { id } })
		if (!review) throw new NotFoundException(`Review with id ${id} not found`)
		return review
	}

	async update(id: string, dto: UpdateReviewDto) {
		const review = await this.reviewRepo.preload({
			id,
			...dto,
		})
		if (!review) throw new NotFoundException(`Review with id ${id} not found`)
		return this.reviewRepo.save(review)
	}

	async remove(id: string) {
		const review = await this.findOne(id)
		return this.reviewRepo.remove(review)
	}
}

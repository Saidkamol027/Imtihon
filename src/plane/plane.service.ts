import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlaneDto } from './dto/create-plane.dto'
import { UpdatePlaneDto } from './dto/update-plane.dto'
import { Plane } from './entities/plane.entity'

@Injectable()
export class PlaneService {
	constructor(
		@InjectRepository(Plane)
		private readonly planeRepo: Repository<Plane>
	) {}

	async create(dto: CreatePlaneDto) {
		const plane = this.planeRepo.create(dto)
		return await this.planeRepo.save(plane)
	}

	async findAll() {
		return await this.planeRepo.find({ relations: ['company'] })
	}

	async findOne(id: string) {
		const plane = await this.planeRepo.findOne({
			where: { id },
			relations: ['company'],
		})
		if (!plane) throw new NotFoundException('Plane not found')
		return plane
	}

	async update(id: string, dto: UpdatePlaneDto) {
		const plane = await this.findOne(id)
		Object.assign(plane, dto)
		return await this.planeRepo.save(plane)
	}

	async remove(id: string) {
		const plane = await this.findOne(id)
		return await this.planeRepo.remove(plane)
	}
}

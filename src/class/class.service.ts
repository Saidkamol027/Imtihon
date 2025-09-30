import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { Class } from './entities/class.entity'

@Injectable()
export class ClassService {
	constructor(
		@InjectRepository(Class)
		private readonly classRepo: Repository<Class>
	) {}

	async create(dto: CreateClassDto) {
		const exists = await this.classRepo.findOne({ where: { name: dto.name } })
		if (exists)
			throw new ConflictException('Class with this name already exists')
		const cls = this.classRepo.create(dto)
		return this.classRepo.save(cls)
	}

	findAll(): Promise<Class[]> {
		return this.classRepo.find({ relations: ['seats', 'tickets'] })
	}

	async findOne(id: string) {
		const cls = await this.classRepo.findOne({
			where: { id },
			relations: ['seats', 'tickets'],
		})
		if (!cls) throw new NotFoundException('Class not found')
		return cls
	}

	async update(id: string, dto: UpdateClassDto) {
		const cls = await this.findOne(id)
		Object.assign(cls, dto)
		return this.classRepo.save(cls)
	}

	async remove(id: string): Promise<void> {
		const cls = await this.findOne(id)
		await this.classRepo.remove(cls)
	}
}

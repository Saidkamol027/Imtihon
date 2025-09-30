import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async findAll() {
		return await this.usersRepository.find()
	}

	async findOne(id: string) {
		const user = await this.usersRepository.findOne({ where: { id } })
		if (!user) throw new NotFoundException(`User with id ${id} not found`)
		return user
	}

	async remove(id: string) {
		const user = await this.findOne(id)
		return this.usersRepository.remove(user)
	}
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Company } from './entities/company.entity'

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private readonly companyRepo: Repository<Company>
	) {}

	async create(dto: CreateCompanyDto) {
		const company = this.companyRepo.create(dto)
		return await this.companyRepo.save(company)
	}

	async findAll() {
		return await this.companyRepo.find()
	}

	async findOne(id: string) {
		const company = await this.companyRepo.findOne({ where: { id } })
		if (!company) throw new NotFoundException('Company not found')
		return company
	}

	async update(id: string, dto: UpdateCompanyDto) {
		const company = await this.findOne(id)
		Object.assign(company, dto)
		return await this.companyRepo.save(company)
	}

	async remove(id: string) {
		const company = await this.findOne(id)
		return await this.companyRepo.remove(company)
	}
}

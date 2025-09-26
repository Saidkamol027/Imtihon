import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcryptjs'
import { AdminRole } from 'src/admin/entities/admin.entity'
import { Repository } from 'typeorm'
import { Admin } from '../admin/entities/admin.entity'

@Injectable()
export class SeedService {
	constructor(
		@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
	) {}

	async onModuleInit() {
		const AdminExists = await this.adminRepo.findOne({
			where: {
				role: AdminRole.SUPER_ADMIN,
			},
		})
		const password = String(process.env.ADMIN_PASS)
		if (!AdminExists) {
			const Hashpassword = await hash(password, 10)
			const superAdmin = await this.adminRepo.create({
				full_name: 'Saidkamol Akhmadjonov',
				email: String(process.env.ADMIN_EMAIL),
				password: Hashpassword,
				role: AdminRole.SUPER_ADMIN,
			})

			await this.adminRepo.save(superAdmin)
			console.log('SuperAdmin created ✅')
		}
	}
}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { SeedModule } from './seed/seed.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: String(process.env.DB_HOST),
			port: Number(process.env.DB_PORT),
			username: String(process.env.DB_USER),
			password: String(process.env.DB_PASS),
			database: String(process.env.DB_NAME),
			synchronize: true,
			autoLoadEntities: true,
		}),
		AdminModule,
		SeedModule,
		AuthModule,
		UsersModule,
	],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { BaggageModule } from './baggage/baggage.module'
import { ClassModule } from './class/class.module'
import { CompanyModule } from './company/company.module'
import { FlightModule } from './flight/flight.module'
import { PlaneModule } from './plane/plane.module'
import { ReviewModule } from './review/review.module'
import { SeatModule } from './seat/seat.module'
import { SeedModule } from './seed/seed.module'
import { TicketModule } from './ticket/ticket.module'
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
		SeedModule,
		AuthModule,
		UsersModule,
		FlightModule,
		CompanyModule,
		PlaneModule,
		TicketModule,
		SeatModule,
		BaggageModule,
		ClassModule,
		ReviewModule,
	],
})
export class AppModule {}

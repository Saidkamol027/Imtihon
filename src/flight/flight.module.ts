import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Flight } from './entities/flight.entity'
import { FlightController } from './flight.controller'
import { FlightsService } from './flight.service'

@Module({
	imports: [TypeOrmModule.forFeature([Flight])],
	controllers: [FlightController],
	providers: [FlightsService],
})
export class FlightModule {}

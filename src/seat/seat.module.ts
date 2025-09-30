import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/class/entities/class.entity'
import { Flight } from 'src/flight/entities/flight.entity'
import { Seat } from './entities/seat.entity'
import { SeatController } from './seat.controller'
import { SeatService } from './seat.service'

@Module({
	imports: [TypeOrmModule.forFeature([Seat, Flight, Class])],
	controllers: [SeatController],
	providers: [SeatService],
})
export class SeatModule {}

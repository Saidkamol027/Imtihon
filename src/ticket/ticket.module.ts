import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/class/entities/class.entity'
import { Flight } from 'src/flight/entities/flight.entity'
import { Seat } from 'src/seat/entities/seat.entity'
import { User } from 'src/users/entities/user.entity'
import { Ticket } from './entities/ticket.entity'
import { TicketController } from './ticket.controller'
import { TicketService } from './ticket.service'

@Module({
	imports: [TypeOrmModule.forFeature([Ticket, User, Flight, Seat, Class])],
	controllers: [TicketController],
	providers: [TicketService],
})
export class TicketModule {}

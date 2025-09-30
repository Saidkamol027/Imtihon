import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ticket } from 'src/ticket/entities/ticket.entity'
import { User } from 'src/users/entities/user.entity'
import { BaggageController } from './baggage.controller'
import { BaggageService } from './baggage.service'
import { Baggage } from './entities/baggage.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Baggage, User, Ticket])],
	controllers: [BaggageController],
	providers: [BaggageService],
})
export class BaggageModule {}

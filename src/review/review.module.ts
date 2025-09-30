import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Flight } from 'src/flight/entities/flight.entity'
import { User } from 'src/users/entities/user.entity'
import { Review } from './entities/review.entity'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
	imports: [TypeOrmModule.forFeature([Review, User, Flight])],
	controllers: [ReviewController],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}

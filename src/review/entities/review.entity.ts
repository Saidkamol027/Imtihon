import { User } from 'src/users/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Flight } from '../../flight/entities/flight.entity'

@Entity('reviews')
export class Review {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
	user: User

	@ManyToOne(() => Flight, flight => flight.reviews, { onDelete: 'CASCADE' })
	flight: Flight

	@Column({ type: 'int' })
	rating: number

	@Column({ type: 'text', nullable: true })
	comment: string

	@CreateDateColumn()
	createdAt: Date
}

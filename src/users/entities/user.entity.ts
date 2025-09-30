import { Baggage } from 'src/baggage/entities/baggage.entity'
import { Review } from 'src/review/entities/review.entity'
import { Ticket } from 'src/ticket/entities/ticket.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	full_name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ nullable: true })
	phone: string

	@Column({ nullable: true })
	bonus_points: number

	@OneToMany(() => Ticket, ticket => ticket.user)
	tickets: Ticket[]

	@OneToMany(() => Baggage, baggage => baggage.user)
	baggages: Baggage[]

	@OneToMany(() => Review, review => review.user)
	reviews: Review[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

import { Baggage } from 'src/baggage/entities/baggage.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Class } from '../../class/entities/class.entity'
import { Flight } from '../../flight/entities/flight.entity'
import { Seat } from '../../seat/entities/seat.entity'
import { User } from '../../users/entities/user.entity'

export enum TicketStatus {
	BOOKED = 'booked',
	CANCELLED = 'cancelled',
	COMPLETED = 'completed',
}

@Entity('tickets')
export class Ticket {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Flight, flight => flight.tickets, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'flight_id' })
	flight: Flight

	@ManyToOne(() => Seat, seat => seat.tickets, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'seat_id' })
	seat: Seat

	@ManyToOne(() => Class, cls => cls.tickets, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'class_id' })
	class: Class

	@Column()
	price: number

	@Column({ default: false })
	round_trip: boolean

	@Column({
		type: 'enum',
		enum: TicketStatus,
		default: TicketStatus.BOOKED,
	})
	status: TicketStatus

	@Column({ default: false })
	refund: boolean

	@OneToMany(() => Baggage, baggage => baggage.ticket)
	baggages: Baggage[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

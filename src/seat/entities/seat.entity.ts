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
import { Ticket } from '../../ticket/entities/ticket.entity'

export enum SeatStatus {
	AVAILABLE = 'available',
	RESERVED = 'reserved',
	OCCUPIED = 'occupied',
}

@Entity('seats')
export class Seat {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	seat_number: string

	@Column({
		type: 'enum',
		enum: SeatStatus,
		default: SeatStatus.AVAILABLE,
	})
	status: SeatStatus

	@ManyToOne(() => Flight, flight => flight.seats, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'flight_id' })
	flight: Flight

	@ManyToOne(() => Class, cls => cls.seats, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'class_id' })
	class: Class

	@OneToMany(() => Ticket, ticket => ticket.seat)
	tickets: Ticket[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

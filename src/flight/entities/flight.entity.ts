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
import { Company } from '../../company/entities/company.entity'
import { Plane } from '../../plane/entities/plane.entity'
import { Review } from '../../review/entities/review.entity'
import { Seat } from '../../seat/entities/seat.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'

export enum FlightStatus {
	SCHEDULED = 'scheduled',
	DELAYED = 'delayed',
	CANCELLED = 'cancelled',
	COMPLETED = 'completed',
}

@Entity('flights')
export class Flight {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	from_city: string

	@Column()
	to_city: string

	@Column({ type: 'timestamp' })
	departure_time: Date

	@Column({ type: 'timestamp' })
	arrival_time: Date

	@Column({
		type: 'enum',
		enum: FlightStatus,
		default: FlightStatus.SCHEDULED,
	})
	status: FlightStatus

	@ManyToOne(() => Plane, plane => plane.flights, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'plane_id' })
	plane: Plane

	@ManyToOne(() => Company, company => company.flights, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'company_id' })
	company: Company

	@OneToMany(() => Ticket, ticket => ticket.flight)
	tickets: Ticket[]

	@OneToMany(() => Seat, seat => seat.flight)
	seats: Seat[]

	@OneToMany(() => Review, review => review.flight)
	reviews: Review[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

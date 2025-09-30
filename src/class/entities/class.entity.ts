import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Seat } from '../../seat/entities/seat.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'

@Entity('classes')
export class Class {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@OneToMany(() => Seat, seat => seat.class)
	seats: Seat[]

	@OneToMany(() => Ticket, ticket => ticket.class)
	tickets: Ticket[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

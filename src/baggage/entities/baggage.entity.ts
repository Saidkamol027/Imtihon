	import {
		Column,
		CreateDateColumn,
		Entity,
		JoinColumn,
		ManyToOne,
		PrimaryGeneratedColumn,
		UpdateDateColumn,
	} from 'typeorm'
	import { Ticket } from '../../ticket/entities/ticket.entity'
	import { User } from '../../users/entities/user.entity'

	@Entity('baggages')
	export class Baggage {
		@PrimaryGeneratedColumn('uuid')
		id: string

		@Column('decimal', { precision: 5, scale: 2 })
		weight: number

		@Column()
		type: string

		@ManyToOne(() => User, user => user.baggages, { onDelete: 'CASCADE' })
		@JoinColumn({ name: 'user_id' })
		user: User

		@ManyToOne(() => Ticket, ticket => ticket.baggages, { onDelete: 'CASCADE' })
		@JoinColumn({ name: 'ticket_id' })
		ticket: Ticket

		@CreateDateColumn()
		createdAt: Date

		@UpdateDateColumn()
		updatedAt: Date
	}

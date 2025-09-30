import { Flight } from 'src/flight/entities/flight.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Company } from '../../company/entities/company.entity'

@Entity('planes')
export class Plane {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	model: string

	@Column()
	capacity: number

	@ManyToOne(() => Company, company => company.planes, { onDelete: 'CASCADE' })
	company: Company

	@OneToMany(() => Flight, flight => flight.plane)
	flights: Flight[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

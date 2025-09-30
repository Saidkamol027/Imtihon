import { Flight } from 'src/flight/entities/flight.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Plane } from '../../plane/entities/plane.entity'

@Entity('companies')
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	name: string

	@Column()
	country: string

	@Column()
	contact: string

	@OneToMany(() => Plane, plane => plane.company)
	planes: Plane[]

	@OneToMany(() => Flight, flight => flight.company)
	flights: Flight[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

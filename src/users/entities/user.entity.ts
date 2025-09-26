import {
	Column,
	CreateDateColumn,
	Entity,
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

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

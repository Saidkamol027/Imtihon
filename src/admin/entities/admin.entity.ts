import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export enum AdminRole {
	ADMIN = 'admin',
	SUPER_ADMIN = 'super_admin',
}

@Entity('admins')
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	full_name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({
		type: 'enum',
		enum: AdminRole,
		default: AdminRole.ADMIN,
	})
	role: AdminRole

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

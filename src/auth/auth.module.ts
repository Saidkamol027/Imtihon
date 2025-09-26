import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Admin } from '../admin/entities/admin.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Admin]), JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}

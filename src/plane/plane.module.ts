import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plane } from './entities/plane.entity'
import { PlaneController } from './plane.controller'
import { PlaneService } from './plane.service'

@Module({
	imports: [TypeOrmModule.forFeature([Plane])],
	controllers: [PlaneController],
	providers: [PlaneService],
	exports: [PlaneService],
})
export class PlaneModule {}

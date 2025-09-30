import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AdminRole } from './../admin/entities/admin.entity'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		)
		if (!requiredRoles) return true

		const request = context.switchToHttp().getRequest()
		const user = request.user

		if (!user || !requiredRoles.includes(user.role)) {
			throw new ForbiddenException('Access denied: insufficient permissions')
		}
		return true
	}
}

import {Role} from '@acrommunity/common';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from '~/utils/nest/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    console.log('user', user);
    return requiredRoles.some((role) => user && user.role === role);
  }
}

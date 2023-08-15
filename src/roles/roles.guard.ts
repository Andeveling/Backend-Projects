import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/constants/key-decorators';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles || !Array.isArray(roles)) {
      return true; // Si no se especifican roles, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user.roles;

    return roles.some((role) => userRoles.includes(role));
  }
}

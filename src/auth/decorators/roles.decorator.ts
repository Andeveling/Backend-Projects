import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/key-decorators';

export const Roles = (...args: string[]) => SetMetadata(ROLES_KEY, args);

import { SetMetadata } from '@nestjs/common';
import { ADMIN_ROLE_KEY } from 'src/constants/key-decorators';

export const AdminAccess = () => SetMetadata(ADMIN_ROLE_KEY, true);

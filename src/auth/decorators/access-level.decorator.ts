import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';
import { AccessLevelEnum } from 'src/roles/role.enum';

export const AccessLevel = (accessLevel: AccessLevelEnum) =>
  SetMetadata(ACCESS_LEVEL_KEY, true);

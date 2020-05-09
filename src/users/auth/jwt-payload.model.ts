import { Role } from '../../shared/enum/role';

export interface JwtPayload {
  tab_number: string;
  role:Role;
  iat?: Date;
}

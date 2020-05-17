import { Role } from '../../shared/enum/role';

export interface JwtPayload {
  id: number,
  tab_number: string;
  role:Role;
  iat?: Date;
}

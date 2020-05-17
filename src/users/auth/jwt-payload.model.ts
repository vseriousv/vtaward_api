import { Role } from '../../shared/enum/role';

export interface JwtPayload {
  id: number,
  state_id: number;
  tab_number: string;
  role:Role;
  iat?: Date;
}

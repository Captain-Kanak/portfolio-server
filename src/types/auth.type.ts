import { AdminRole, AdminStatus } from "@prisma/client";

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  isDeleted: boolean;
}

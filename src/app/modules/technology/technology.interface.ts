import { TechnologyType } from "@prisma/client";

export interface CreateTechnologyPayload {
  name: string;
  icon?: string;
  description?: string;
  type: TechnologyType;
}

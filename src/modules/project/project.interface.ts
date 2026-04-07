export interface CreateProjectPayload {
  title: string;
  description: string;
  images: string[];
  features: string[];
  projectUrl: string;
  backendUrl: string;
  frontendUrl: string;
  technologies: string[];
}

export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  images?: string[];
  features?: string[];
  projectUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
  technologies?: string[];
}

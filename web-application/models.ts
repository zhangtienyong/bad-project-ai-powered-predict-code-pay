export interface Users {
  id: number;
  username: string;
  email: string;
  password: string;
  github_id: string | null;
  github_token: string | null;
  github_username: string | null;
  role: string;
}

export interface github_Users {
  username: string;
  github_username: string;
  id: string;
  github_id: string;
  github_token: string;
  role: string;
}

export interface Company {
  company_id: number;
  user_id: number;
  company_name: string;
  logo: string;
  industry: string;
  company_size: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  about: string;
}

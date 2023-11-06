export interface Users {
    user_id: number;
    username: string;
    email: string;
    password: string;
    github_id: number | null;
    github_token: string | null;
    github_username: string | null;
}

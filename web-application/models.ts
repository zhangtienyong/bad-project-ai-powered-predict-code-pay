export interface Users {
    user_id: number;
    username: string;
    email: string;
    password: string;
    github_id: number | null;
    github_token: string | null;
    github_username: string | null;
    role: string
}

export interface github_Users {
        username: string,
        github_username: string;
        github_id: string;
        github_token: string;
}

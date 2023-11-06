export interface Users {
    user_id: number;
    username: string;
    email: string;
    password: string;
    github_id: number | null;
    github_token: string | null;
    github_username: string | null;
}

export interface github_Users {
        github_name: string;
        github_id: string;
        token: string;
}

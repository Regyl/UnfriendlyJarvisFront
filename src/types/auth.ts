
// Basic authentication interfaces
export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar_url?: string;
    };
}
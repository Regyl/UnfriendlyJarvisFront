
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

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar_url?: string;
    };
}
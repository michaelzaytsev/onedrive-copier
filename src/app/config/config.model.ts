export interface AppConfig {
    auth: {
        clientId: string;
        tenantId: string;
        redirectUri: string;
        postLogoutRedirectUri: string;
        protectedResourceMap: [string, string[]][];
        scopes: string[];
    };
}

export interface IAuthResponse<Type = any> {
    status: number;
    message: string;
    data: {
        user: any;
        token: string;
    }
}

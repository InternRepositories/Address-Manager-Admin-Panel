export interface IApiResponse<T = any> {
    status: number;
    message: string;
    data: { [key: string]: T }
}



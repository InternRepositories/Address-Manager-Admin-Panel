
import { Users } from "../models/userModel";
import { User } from "./user.interface";
export interface IAuthResponse<Type = Users> {
    status: number;
    message: string;
    data: {
        user: Type;
        token: string;

    }
}

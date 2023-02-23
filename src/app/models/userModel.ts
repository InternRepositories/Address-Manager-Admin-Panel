export class Users {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    profile_image: string;
    role: string;
    mobile_number: string;
    home_number: string;
    status: number;

    constructor(_id?: string, first_name?: string, last_name?: string, email?: string, password?: string, profile_image?: string, role?: string, mobile_number?: string, home_number?: string, status?: number,) {
        this._id = _id!;
        this.first_name = first_name!;
        this.last_name = last_name!;
        this.email = email!;
        this.password = password!;
        this.profile_image = profile_image!;
        this.role = role!;
        this.mobile_number = mobile_number!;
        this.home_number = home_number!;
        this.status = status!;
    }

}


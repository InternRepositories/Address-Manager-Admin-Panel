export class Address {
    _id?: string;
    Address_1: string;
    Address_2: string;
    user_id: string;
    city: string;
    parish: string;
    status: string;


    constructor(_id?: string, Address_1?: string, Address_2?: string, user_id?: string, city?: string, parish?: string, status?: string) {
        this._id = _id!;
        this.Address_1 = Address_1!;
        this.Address_2 = Address_2!;
        this.user_id = user_id!;
        this.city = city!;
        this.parish = parish!;
        this.status = status!;
    }

}


export class Address {
    _id?: string;
    address_1: string;
    address_2: string;
    user_id: string;
    city: string;
    parish: string | any;
    status: string;


    constructor(_id?: string, address_1?: string, address_2?: string, user_id?: string, city?: string, parish?: string, status?: string,) {
        this._id = _id!;
        this.address_1 = address_1!;
        this.address_2 = address_2!;
        this.user_id = user_id!;
        this.city = city!;
        this.parish = parish!;
        this.status = status!;
    }

}


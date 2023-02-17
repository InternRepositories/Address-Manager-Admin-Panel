// const addressSchema = new Schema({
//     Address_1: {type: String, required: [true, "Line 1 of address is required"]},


import { AddressStatus } from '../../../enums/address-status.enum'
import { Address } from '../../../models/addressModel';

export const Addresses: Address[] = [
    {
        Address_1: '123 lindows Road',
        Address_2: 'Kingston 11',
        user_id: '1283839393390202',
        city: 'Weed city',
        parish: 'St Andress',
        status: AddressStatus.PENDING
    },
    {
        Address_1: 'Grants Pend',
        Address_2: 'Kingston 14',
        user_id: '128383939339020dd2',
        city: 'Sunshine Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        Address_1: 'Maeverly Place',
        Address_2: 'Kingston 18',
        user_id: '128383939339020dd2',
        city: 'Rainford Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        Address_1: 'Maeverly Place',
        Address_2: 'Kingston 18',
        user_id: '128383939339020dd2',
        city: 'Rainford Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        Address_1: 'Maeverly Place',
        Address_2: 'Kingston 18',
        user_id: '128383939339020dd2',
        city: 'Rainford Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
];


export const Parishes = [
    'St. Andrew', 'Portland', 'St. Thomas', 'Kingston',
    'St. Catherine', 'St. Mary', 'St. Ann', 'Manchester', 'Clarendon',
    'Hanover', 'Westmoreland', 'St. James', 'Trelawny', 'St. Elizabeth'
]

export const Cities = ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore', 'May-Pen', 'Mandeville', 'Half Way Tree', 'Old Harbor', 'Savanna-la-Mar', 'Linstead', 'Port Antonio', 'Constant Spring', 'St. Anse Bay', 'Morant Bay', 'God-Wolf', 'Evarton', 'Hayes', 'Stony Hill', 'Ocho Rios', 'Santa Cruz', 'Port Maria', 'Falmouth', 'Christian', 'Yallas', 'Browns Town', 'Grange Hill', 'Luse', 'Runaway Bay', 'Annotto Bay', 'Highgate', 'Old Harbour Bay', 'Porus', 'Lionel Town', 'Black River', 'Port Royal']











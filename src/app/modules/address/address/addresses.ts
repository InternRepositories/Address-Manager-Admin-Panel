// const addressSchema = new Schema({
//     Address_1: {type: String, required: [true, "Line 1 of address is required"]},


import { AddressStatus } from '../../../enums/address-status.enum'
import { Address } from '../../../models/addressModel';

export const Addresses: Address[] = [
    {
        address_1: '123 lindows Road',
        address_2: 'Kingston 11',
        user_id: '1283839393390202',
        city: 'Weed city',
        parish: 'St Andress',
        status: AddressStatus.PENDING
    },
    {
        address_1: 'Grants Pend',
        address_2: 'Kingston 14',
        user_id: '128383939339020dd2',
        city: 'Sunshine Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        address_1: 'Maeverly Place',
        address_2: 'Kingston 18',
        user_id: '128383939339020dd2',
        city: 'Rainford Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        address_1: 'Maeverly Place',
        address_2: 'Kingston 18',
        user_id: '128383939339020dd2',
        city: 'Rainford Avenue',
        parish: 'Kingston',
        status: AddressStatus.PENDING
    },
    {
        address_1: 'Maeverly Place',
        address_2: 'Kingston 18',
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

export const Cities = [{
    _id: '1',
    cityName: 'Kingston',
},
{
    _id: '2',
    cityName: 'Motego Bay',

},
{
    _id: '3',
    cityName: 'Motego Bay',

},
{
    _id: '4',
    cityName: 'Spanish Town',
},
{
    _id: '5',
    cityName: 'Portmore'
},
{
    _id: '6',
    cityName: 'Mandeville'
},

{
    _id: '7',
    cityName: 'Halfway Tree'

},

{
    _id: '8',
    cityName: 'old Harbour'

},
{
    _id: '9',
    cityName: 'Savanna-La-Mar'

},
{
    _id: '10',
    cityName: 'Linstead'

},
{
    _id: '11',
    cityName: 'Port Antonio'

},
{
    _id: '12',
    cityName: 'Constant Spring'

}

];











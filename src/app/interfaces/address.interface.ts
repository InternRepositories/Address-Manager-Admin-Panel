import { AddressStatus } from '../enums/address-status.enum';

export interface IAddress {
  _id?: string;
  address_1: string;
  address_2: string;
  city: string;
  parish: string;
  user_id: string;
  status: AddressStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

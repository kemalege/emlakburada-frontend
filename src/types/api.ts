import { AdStatus } from "./enums";
  
  export interface ApiResponse<T> {
    status: string;
    httpStatus: string;
    data: T;
    error?: {message: string};
    totalRecords?: number;
  }
  
export interface Ad {
    id: string;
    userId: number;
    createDate: string;
    adStatus: AdStatus;
    adCode: string;
    title: string;
    category: string;
    price: number;
    details: string;
    location: string;
    imageUrl?: string;
}

export interface AdPacket {
   id: number; 
   adCount: number;
   price: number;
   validityDays: number; 
}

export type PaymentDetails = {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: number;
};

export interface UserPacket {
  id: number;
  userId: number;
  packageId: number;
  remainingCount: number;
  expiryDate: string;
}

export type User = {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string | null;
  email: string;
};

export type AdDetails = {
  id: number;
  user: User;
  createDate: string;
  adStatus: string;
  adCode: string;
  title: string;
  category: string;
  price: number;
  details: string;
  location: string;
};

export type AdListResponse = Ad[]
export type AdPacketList = AdPacket[]
  
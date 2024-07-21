import { AdStatus } from "./enums";

export interface User {
    id: string;
    name: string;
    email: string;
  }
  
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

export type AdListResponse = Ad[]
export type AdPacketList = AdPacket[]
  
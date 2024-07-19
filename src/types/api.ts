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
  }
  
export interface Ad {
    id: string;
    userId: number;
    createDate: string;
    adStatus: 'ACTIVE' | 'PASSIVE';
    adCode: string;
    title: string;
    category: string;
    price: number;
    details: string;
    location: string;
    imageUrl?: string;
}

export type AdListResponse = Ad[]
  
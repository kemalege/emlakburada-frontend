import { ApiResponse } from "@/types/api";

const BASE_URL = 'http://localhost:8080/api/v1';

interface FetchOptions extends RequestInit {
  body?: any;
}

const apiFetch = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data: ApiResponse<T>;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = {} as ApiResponse<T>; 
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};



export default apiFetch;

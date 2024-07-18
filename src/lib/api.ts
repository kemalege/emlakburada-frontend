const BASE_URL = 'http://localhost:8080/api/v1';

interface FetchOptions extends RequestInit {
  body?: any;
}

const apiFetch = async (endpoint: string, options: FetchOptions = {}): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;

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

  return response.json();
};

export default apiFetch;

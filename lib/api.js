const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rbs-backend-one.vercel.app/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }
  return response.json();
};

const api = {
  async get(endpoint, locale = 'en') {
    const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${BASE_URL}${clean}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale
      }
    });
    return handleResponse(response);
  },

  async post(endpoint, data = {}, locale = 'en') {
    const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${BASE_URL}${clean}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

export default api;
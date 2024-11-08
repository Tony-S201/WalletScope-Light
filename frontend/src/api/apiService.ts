interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
}

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const apiService = {
  // GET
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP Error - Status: ${response.status}`);
      }
      const jsonResponse = await response.json() as ApiSuccessResponse<T> | ApiErrorResponse;
      
      if (!jsonResponse.success) {
        return { 
          data: null, 
          error: (jsonResponse as ApiErrorResponse).error 
        };
      }

      return { 
        data: (jsonResponse as ApiSuccessResponse<T>).data, 
        error: null 
      };
    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      return { data: null, error: errorMessage }
    }
  },

  // POST
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const jsonResponse = await response.json() as ApiSuccessResponse<T> | ApiErrorResponse;

      if (!jsonResponse.success) {
        return { 
          data: null, 
          error: (jsonResponse as ApiErrorResponse).error 
        };
      }

      return { 
        data: (jsonResponse as ApiSuccessResponse<T>).data, 
        error: null 
      };
    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      return { data: null, error: errorMessage };
    }
  },

  // PUT
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json() as ApiSuccessResponse<T> | ApiErrorResponse;

      if (!jsonResponse.success) {
        return { 
          data: null, 
          error: (jsonResponse as ApiErrorResponse).error 
        };
      }

      return { 
        data: (jsonResponse as ApiSuccessResponse<T>).data, 
        error: null 
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      return { data: null, error: errorMessage };
    }
  },

  // DELETE
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'DELETE',
      });

      const jsonResponse = await response.json() as ApiSuccessResponse<T> | ApiErrorResponse;

      if (!jsonResponse.success) {
        return { 
          data: null, 
          error: (jsonResponse as ApiErrorResponse).error 
        };
      }

      return { 
        data: (jsonResponse as ApiSuccessResponse<T>).data, 
        error: null 
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      return { data: null, error: errorMessage };
    }
  },

  // PATCH
  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json() as ApiSuccessResponse<T> | ApiErrorResponse;

      if (!jsonResponse.success) {
        return { 
          data: null, 
          error: (jsonResponse as ApiErrorResponse).error 
        };
      }

      return { 
        data: (jsonResponse as ApiSuccessResponse<T>).data, 
        error: null 
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      return { data: null, error: errorMessage };
    }
  }
}
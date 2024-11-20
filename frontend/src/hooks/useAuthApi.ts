// hooks/useAuthApi.ts
import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../api/apiService';
import { AuthManager } from '../utils/auth';
import { useRouter } from 'next/router';
import { ApiResponse } from '../types/auth';

export function useAuthApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getAuthHeaders = () => {
    const token = AuthManager.getToken();
    if (!token) {
      router.push('/login');
      throw new Error('No authentication token');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleApiError = useCallback((error: any) => {
    if (error.status === 401) {
      AuthManager.clearAuth();
      router.push('/login');
    }
    return error.message || 'Une erreur est survenue';
  }, [router]);

  const authApiService = {
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
      try {
        const response = await apiService.get<T>(`/api/${endpoint}`, {
          headers: getAuthHeaders()
        });
        return {
          data: response.data,
          error: response.error
        };
      } catch (error: any) {
        return {
          data: null,
          error: handleApiError(error)
        };
      }
    },

    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
      try {
        const response = await apiService.post<T>(`/api/${endpoint}`, data, {
          headers: getAuthHeaders()
        });
        return {
          data: response.data,
          error: response.error
        };
      } catch (error: any) {
        return {
          data: null,
          error: handleApiError(error)
        };
      }
    },

    async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
      try {
        const response = await apiService.put<T>(`/api/${endpoint}`, data, {
          headers: getAuthHeaders()
        });
        return {
          data: response.data,
          error: response.error
        };
      } catch (error: any) {
        return {
          data: null,
          error: handleApiError(error)
        };
      }
    },

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
      try {
        const response = await apiService.delete<T>(`/api/${endpoint}`, {
          headers: getAuthHeaders()
        });
        return {
          data: response.data,
          error: response.error
        };
      } catch (error: any) {
        return {
          data: null,
          error: handleApiError(error)
        };
      }
    },

    async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
      try {
        const response = await apiService.patch<T>(`/api/${endpoint}`, data, {
          headers: getAuthHeaders()
        });
        return {
          data: response.data,
          error: response.error
        };
      } catch (error: any) {
        return {
          data: null,
          error: handleApiError(error)
        };
      }
    }
  };

  const fetchData = useCallback(async (endpoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApiService.get<T>(endpoint);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = useCallback(async (endpoint: string, payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApiService.post<T>(endpoint, payload);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const putData = useCallback(async (endpoint: string, payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApiService.put<T>(endpoint, payload);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteData = useCallback(async (endpoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApiService.delete<T>(endpoint);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const patchData = useCallback(async (endpoint: string, payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApiService.patch<T>(endpoint, payload);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    patchData,
    reset
  };
}

/*
// USAGE 2 :

interface UserType {
  id: string;
  name: string;
  email: string;
}

function UserProfile() {
  const { 
    data: userData, 
    loading, 
    error, 
    fetchData,
    postData,
    reset 
  } = useAuthApi<UserType>();

  useEffect(() => {
    fetchData('users/profile');
    return () => reset();
  }, [fetchData, reset]);

  const handleUpdateProfile = async (newData: Partial<UserType>) => {
    try {
      await postData('users/profile', newData);
      await fetchData('users/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!userData) return <div>Aucune donnée</div>;

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      <button onClick={() => handleUpdateProfile({ name: 'Nouveau nom' })}>
        Mettre à jour
      </button>
    </div>
  );
}
*/

/*

USAGE:

const { data: userData, loading, error, fetchData } = useAuthApi<UserType>();

useEffect(() => {
  fetchData('protected/user-data');
}, [fetchData]);

if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur: {error}</div>;
if (!userData) return <div>Aucune donnée</div>;

*/
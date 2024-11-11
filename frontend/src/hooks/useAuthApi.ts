// hooks/useAuthApi.ts
import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { apiService } from '../api/apiService';

export function useAuthApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const authApiService = {
    async get<T>(endpoint: string) {
      const response = await fetch(`/api/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return apiService.get<T>(endpoint);
    },

    async post<T>(endpoint: string, data: any) {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return apiService.post<T>(endpoint, data);
    },

    async put<T>(endpoint: string, data: any) {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return apiService.put<T>(endpoint, data);
    },

    async delete<T>(endpoint: string) {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return apiService.delete<T>(endpoint);
    },

    async patch<T>(endpoint: string, data: any) {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return apiService.patch<T>(endpoint, data);
    }
  };

  const fetchData = useCallback(async (endpoint: string) => {
    if (!token) {
      setError('Non authentifié');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authApiService.get<T>(endpoint);
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, [token]);

  const postData = useCallback(async (endpoint: string, payload: any) => {
    if (!token) {
      setError('Non authentifié');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authApiService.post<T>(endpoint, payload);
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, [token]);

  const putData = useCallback(async (endpoint: string, payload: any) => {
    if (!token) {
      setError('Non authentifié');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authApiService.put<T>(endpoint, payload);
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, [token]);

  const deleteData = useCallback(async (endpoint: string) => {
    if (!token) {
      setError('Non authentifié');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authApiService.delete<T>(endpoint);
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, [token]);

  const patchData = useCallback(async (endpoint: string, payload: any) => {
    if (!token) {
      setError('Non authentifié');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await authApiService.patch<T>(endpoint, payload);
    
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, [token]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    patchData
  };
}

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
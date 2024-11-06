import { useState, useCallback } from 'react';
import { apiService } from '../api/apiService';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (endpoint: string) => {
    setLoading(true);
    setError(null);

    const response = await apiService.get<T>(endpoint);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, []);

  const postData = useCallback(async (endpoint: string, payload: any) => {
    setLoading(true);
    setError(null);

    const response = await apiService.post<T>(endpoint, payload);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }, []);

  return { data, loading, error, fetchData, postData };
}

// TODO: add PUT, PATCH and DELETE functions.

/*

USAGE

e.g. GET 'users' endpoint:

---
import { useApi } from '../hooks/useApi';

const { data: users, loading, error, fetchData } = useApi<User[]>();

useEffect(() => {
  fetchData('users');
}, [fetchData]);

if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur: {error}</div>;
if (!users) return <div>Aucun utilisateur</div>;
---

*/
import { useState, useEffect, useCallback } from 'react';
import { getPopups } from '../services/api';

/**
 * Hook personalizado para obtener todos los popups
 * @returns {Object} Objeto con popups, loading, error y refetch
 */
export const usePopups = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopups();
      setPopups(data || []);
    } catch (err) {
      setError(err.message);
      setPopups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopups();
  }, [fetchPopups]);

  const refetch = useCallback(() => {
    fetchPopups();
  }, [fetchPopups]);

  return {
    popups,
    loading,
    error,
    refetch,
  };
};

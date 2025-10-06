import { useState, useEffect, useCallback } from 'react';
import { getBarrioById } from '../services/api';

/**
 * Hook personalizado para obtener el nombre de un barrio por ID
 * @param {string|number} id - ID del barrio a obtener
 * @returns {Object} Objeto con barrio, loading, error y refetch
 */
export const useBarrio = (id) => {
  const [barrio, setBarrio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBarrio = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getBarrioById(id);
      setBarrio(data);
    } catch (err) {
      setError(err.message);
      setBarrio(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBarrio();
  }, [fetchBarrio]);

  const refetch = useCallback(() => {
    fetchBarrio();
  }, [fetchBarrio]);

  return {
    barrio,
    loading,
    error,
    refetch,
  };
};

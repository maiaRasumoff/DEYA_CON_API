import { useState, useEffect, useCallback } from 'react';
import { getPopupById } from '../services/api';

/**
 * Hook personalizado para obtener un popup específico por ID
 * @param {string|number} id - ID del popup a obtener
 * @returns {Object} Objeto con popup, loading, error y refetch
 */
export const usePopup = (id) => {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopup = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPopupById(id);
      setPopup(data);
    } catch (err) {
      setError(err.message);
      setPopup(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPopup();
  }, [fetchPopup]);

  const refetch = useCallback(() => {
    fetchPopup();
  }, [fetchPopup]);

  return {
    popup,
    loading,
    error,
    refetch,
  };
};

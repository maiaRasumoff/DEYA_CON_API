import { useState, useEffect, useCallback } from 'react';
import { getPopupFullDetail } from '../services/api';

/**
 * Hook personalizado para obtener el detalle extendido de un popup
 * @param {string|number} id - ID del popup a obtener
 * @returns {Object} Objeto con popupDetail, loading, error y refetch
 */
export const usePopupFullDetail = (id) => {
  const [popupDetail, setPopupDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopupDetail = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPopupFullDetail(id);
      setPopupDetail(data);
    } catch (err) {
      setError(err.message);
      setPopupDetail(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPopupDetail();
  }, [fetchPopupDetail]);

  const refetch = useCallback(() => {
    fetchPopupDetail();
  }, [fetchPopupDetail]);

  return {
    popupDetail,
    loading,
    error,
    refetch,
  };
};

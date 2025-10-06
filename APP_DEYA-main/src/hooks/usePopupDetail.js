import { useState, useEffect, useCallback } from 'react';
import { getPopupFullDetail, getBarrioById } from '../services/api';

/**
 * Hook personalizado para obtener el detalle completo de un popup
 * @param {string|number} id - ID del popup a obtener
 * @returns {Object} Objeto con popupDetail, loading, error y refetch
 */
export const usePopupDetail = (id) => {
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
      
      // Obtener el detalle completo del popup
      const popupData = await getPopupFullDetail(id);
      
      // Si el popup tiene un barrio, obtener su nombre
      let popupWithBarrio = popupData;
      if (popupData && popupData.idbarrio) {
        try {
          const barrioData = await getBarrioById(popupData.idbarrio);
          popupWithBarrio = {
            ...popupData,
            nombreBarrio: barrioData || 'No disponible'
          };
        } catch (barrioError) {
          console.warn('No se pudo obtener el nombre del barrio:', barrioError);
          popupWithBarrio = {
            ...popupData,
            nombreBarrio: 'No disponible'
          };
        }
      }
      
      setPopupDetail(popupWithBarrio);
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

import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import type { Location, LocationFilters } from '../types/location';

interface MetaData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [success, setSuccessMessage] = useState<string | null>(null);
  

  async function fetchLocations(filters: LocationFilters = {}) {
    try {
      setLoading(true);
      setError(null);
    
      const params = {
        page: filters.page || 1,
        per_page: 5,
        ...(filters.filters?.name && { name: filters.filters.name }),
        ...(filters.filters?.code && { code: filters.filters.code })
      };
      const { data } = await axiosClient.get('/locations', { params  });
      setLocations(data.data);
      setMeta(data.meta);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function createLocation(payload: Partial<Location>) {
    try {
      setError(null);
      setSuccessMessage(null);
      const { data } = await axiosClient.post('/locations', payload);
      
      setLocations((prev) => [data.data, ...prev]);
      setSuccessMessage(data.message);
      
      return data; 
    } catch (err) {
      setError(String(err));
      throw err;
    }
  }

  return { locations, loading, error,success,setSuccessMessage, meta, fetchLocations, createLocation };
}
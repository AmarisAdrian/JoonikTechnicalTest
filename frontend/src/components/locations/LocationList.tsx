import { useState, useEffect,useCallback } from 'react';
import { useLocations } from '../../hooks/useLocations';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import LocationCard from './LocationCard';
import { Clear } from '@mui/icons-material';

interface LocationListProps {
  refresh: boolean;
}

export default function LocationList({ refresh }: LocationListProps) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', code: '' });
  const [lastValidFilters, setLastValidFilters] = useState({ name: '', code: '' });
  const { locations = [], loading, error, fetchLocations, meta } = useLocations();

  const debouncedFetch = useCallback(() => {
    fetchLocations({ page, filters });
    setLastValidFilters(filters);
  }, [page, filters, fetchLocations])

  useEffect(() => {
    fetchLocations({ page, filters });
  }, [page, filters, refresh]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(1);
  };
 
  const handleFilterClear = (field: 'name' | 'code') => {
    const newFilters = { ...filters, [field]: '' };
    setFilters(newFilters);
    setPage(1);
    fetchLocations({ page: 1, filters: newFilters });
  };

  return (
    <Box sx={{ p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Sedes
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Nombre"
          variant="outlined"
          size="small"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          onBlur={() => {
            if (filters.name === '' && lastValidFilters.name !== '') {
              debouncedFetch();
            }
          }}
           InputProps={{
            endAdornment: filters.name && (
              <IconButton size="small" onClick={() => handleFilterClear('name')}>
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Código"
          variant="outlined"
          size="small"
          name="code"
          value={filters.code}
          onChange={handleFilterChange}
          onBlur={() => {
            if (filters.code === '' && lastValidFilters.code !== '') {
              debouncedFetch();
            }
          }}
          InputProps={{
            endAdornment: filters.code && (
              <IconButton size="small" onClick={() => handleFilterClear('code')}>
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Box>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && locations.length === 0 && <Typography>No hay sedes disponibles.</Typography>}

      {!loading && !error && locations.length > 0 && (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
          {locations.map((loc) => (
            <LocationCard 
              key={loc.id}
              location={loc}
            />
          ))}
        </Box>
      )}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
          Anterior
        </Button>
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          Página {page} de {meta?.last_page ?? '?'}
        </Typography>
        <Button
          variant="outlined"
          disabled={page >= (meta?.last_page ?? 1)}
          onClick={() => handlePageChange(page + 1)}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}

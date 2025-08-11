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
  Paper,
  Container,
  Grid,
  Alert 
} from '@mui/material';
import LocationCard from './LocationCard';
import { Clear,Search } from '@mui/icons-material';

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
    <Container maxWidth="xl" sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      py: 4,
      gap: 3
    }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center'
        }}>
          Gestión de Sedes
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            size="medium"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              endAdornment: filters.name && (
                <IconButton onClick={() => setFilters(p => ({ ...p, name: '' }))}>
                  <Clear fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{ flex: 1, maxWidth: 400 }}
          />

          <TextField
            label="Buscar por código"
            variant="outlined"
            size="medium"
            name="code"
            value={filters.code}
            onChange={handleFilterChange}
            InputProps={{
              endAdornment: filters.code && (
                <IconButton onClick={() => setFilters(p => ({ ...p, code: '' }))}>
                  <Clear fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{ flex: 1, maxWidth: 300 }}
          />

          <Button 
            variant="outlined" 
            onClick={handleFilterClear}
            disabled={!filters.name && !filters.code}
          >
            Limpiar
          </Button>
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        p: 2,
        overflow: 'hidden'
      }}>
        {loading ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader size={80} />
          </Box>
        ) : error ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ErrorMessage message={error} />
          </Box>
        ) : locations.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Alert severity="info" sx={{ width: '100%', maxWidth: 400 }}>
              No se encontraron sedes con los filtros actuales
            </Alert>
          </Box>
        ) : (
          <>
            <Box sx={{ 
              flex: 1,
              overflowY: 'auto',
              p: 1,
              '&::-webkit-scrollbar': { width: 8 },
              '&::-webkit-scrollbar-thumb': { 
                backgroundColor: 'primary.main',
                borderRadius: 4
              }
            }}>
              <Grid container spacing={3}>
                {locations.map(location => (
                  <Grid item key={location.id} xs={12} sm={6} md={4} lg={3}>
                    <LocationCard location={location} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {meta && meta.total > 0 && (
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Button
                  variant="contained"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  sx={{ mx: 1 }}
                >
                  Anterior
                </Button>
                <Typography variant="body1" sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mx: 2
                }}>
                  Página <strong style={{ margin: '0 5px' }}>{page}</strong> de {meta.last_page}
                </Typography>
                <Button
                  variant="contained"
                  disabled={page >= meta.last_page}
                  onClick={() => setPage(p => p + 1)}
                  sx={{ mx: 1 }}
                >
                  Siguiente
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}

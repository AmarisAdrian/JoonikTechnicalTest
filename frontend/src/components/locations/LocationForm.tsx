import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocations } from '../../hooks/useLocations';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  Stack,
  Container
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';

interface LocationFormProps {
  onSuccess: () => void;
}

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  code: z.string().max(10, 'Máximo 10 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function LocationForm({ onSuccess }: LocationFormProps) {
  const { createLocation } = useLocations();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await createLocation(data);
      setSuccess('Sede creada correctamente');
      reset();
      onSuccess();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Error al crear la sede');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ 
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Nueva Sede
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Nombre de la sede"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              size="medium"
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              label="Código único"
              {...register('code')}
              error={!!errors.code}
              helperText={errors.code?.message}
              fullWidth
              size="medium"
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              size="large"
              startIcon={<AddCircle />}
              sx={{ 
                height: '100%',
                py: 1.5,
                borderRadius: 1
              }}
            >
              Crear
            </Button>
          </Grid>
        </Grid>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Stack>
      </Box>
    </Paper>
  </Container>
  );
  
}
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocations } from '../../hooks/useLocations';
import { Button, TextField, Box,Typography } from '@mui/material';
import { useEffect } from 'react';

interface LocationFormProps {
  onSuccess: () => void;
}

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  code: z.string().max(10, 'Máximo 10 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function LocationForm({ onSuccess }: LocationFormProps) {
  const { createLocation, success, error,setSuccessMessage} = useLocations();
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createLocation(data);
      reset();
      onSuccess();
    } catch {

    }
  };

   useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 10000); 

      return () => clearTimeout(timer);
    }
  }, [success, setSuccessMessage]);

  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Nombre"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Código"
        {...register('code')}
        error={!!errors.code}
        helperText={errors.code?.message}
      />
      <Button type="submit" variant="contained">Crear</Button>
    </Box>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );
}

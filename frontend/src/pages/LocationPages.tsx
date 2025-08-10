import { useState } from 'react';
import LocationList from '../components/locations/LocationList';
import LocationForm from '../components/locations/LocationForm';
import { Container, Typography, Box, Divider } from '@mui/material';

export default function LocationPages() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Sedes
      </Typography>

      <Box mb={4}>
        <LocationForm onSuccess={handleRefresh} />
      </Box>

      <Divider sx={{ mb: 4 }} />

      <LocationList refresh={refresh} />
    </Container>
  );
}

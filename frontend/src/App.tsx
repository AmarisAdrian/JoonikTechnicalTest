import { Container, Typography } from '@mui/material';
import LocationList from './components/locations/LocationList';
import LocationForm from './components/locations/LocationForm';
import { useState } from 'react';

export default function App() {
  const [refreshLocations, setRefreshLocations] = useState(false);

  const handleSuccess = () => {
    setRefreshLocations(prev => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, borderRadius: 2, p: 2 }}>

      <LocationForm onSuccess={handleSuccess} />

      <LocationList refresh={refreshLocations} />
    </Container>
  );
}
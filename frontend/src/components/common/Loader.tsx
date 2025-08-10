import { CircularProgress, Box } from '@mui/material';

export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <CircularProgress />
    </Box>
  );
}

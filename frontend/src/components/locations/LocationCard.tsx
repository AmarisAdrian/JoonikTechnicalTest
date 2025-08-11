import { Card, CardContent, CardMedia, Chip, Box, IconButton, Tooltip } from '@mui/material';
import { LocationOn, Code, Edit, Delete } from '@mui/icons-material';

interface LocationCardProps {
  location: {
    id: number;
    name: string;
    code: string;
    image?: string;
    address?: string;
    created_at?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function LocationCard({ location, onEdit, onDelete }: LocationCardProps) {
  return (
    <Card sx={{ 
      maxWidth: 345,
      m: 1,
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3
      }
    }}>
      <CardMedia
        component="img"
        height="140"
        image={location.image || `https://picsum.photos/345/140?random=${location.id}`}
        alt={location.name}
      />
      
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">

          <Box component="div" sx={{ 
            fontSize: '1.25rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {location.name}
          </Box>
          
          <Box>
            {onEdit && (
              <Tooltip title="Editar">
                <IconButton onClick={onEdit} size="small">
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Eliminar">
                <IconButton onClick={onDelete} size="small" color="error">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        

        <Box mt={1} display="flex" alignItems="center" gap={1} component="div">
          <Code color="primary" fontSize="small" />
          <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            Código: 
          </Box>
          <Chip label={location.code} size="small" />
        </Box>
        
        {location.address && (
          <Box mt={1} display="flex" alignItems="center" gap={1} component="div">
            <LocationOn color="primary" fontSize="small" />
            <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {location.address}
            </Box>
          </Box>
        )}
        
        {location.created_at && (
          <Box component="div" sx={{ 
            fontSize: '0.75rem', 
            color: 'text.disabled',
            display: 'block',
            mt: 2
          }}>
            Creado el: {new Date(location.created_at).toLocaleDateString()}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
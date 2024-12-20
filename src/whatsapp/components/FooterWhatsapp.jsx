import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const FooterWhatsapp = () => {

const navigate = useNavigate();
    
  const handleChangePage = () => {
    navigate(`/whatsapp/createtemplate`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: 2,
        bgcolor: 'primary',
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'flex-end',  // Alinea el contenido a la derecha
        alignItems: 'center',
      }}
    >

        
      {/* Botón "Siguiente" */}
      <Button variant="contained" color="primary" size="large" onClick={handleChangePage}>
        Siguiente
      </Button>
    </Box>
  );
};

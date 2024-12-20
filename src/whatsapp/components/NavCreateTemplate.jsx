import React, { useState } from "react";
import { Button, Grid, TextField, InputLabel } from '@mui/material';
import { FormControlLabel, Checkbox, FormGroup, Typography, Box } from "@mui/material";

export const NavCreateTemplate = () => {
    const [selected, setSelected] = useState(""); // Estado único para el checkbox seleccionado

    // Manejar la selección de checkboxes
    const handleChange = (event) => {
      setSelected(event.target.name); // Actualiza el estado con el nombre del checkbox seleccionado
    };

    return (
        <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
            
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Opciones de Plantilla
            </Typography>
          </Grid>
    
          <Grid item xs={4}>
            <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 1,
                    padding: 2,
                }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected === "configureTemplate"}
                    onChange={handleChange}
                    name="configureTemplate"
                  />
                }
                label="Configurar plantilla"
              />
            </Box>
          </Grid>
    
          <Grid item xs={4}>
            <Box  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 1,
                    padding: 2,
                }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected === "editTemplate"}
                    onChange={handleChange}
                    name="editTemplate"
                  />
                }
                label="Editar plantilla"
              />
            </Box>
          </Grid>
    
          <Grid item xs={4}>
            <Box  sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        border: 1,
                        borderColor: "grey.300",
                        borderRadius: 1,
                        padding: 2,
                    }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected === "submitForReview"}
                    onChange={handleChange}
                    name="submitForReview"
                  />
                }
                label="Enviar a revisión"
              />
            </Box>
          </Grid>
        </Grid>
    );
};

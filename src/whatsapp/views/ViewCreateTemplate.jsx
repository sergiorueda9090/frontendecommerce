import React, { useState } from "react";
import { Grid, Typography, TextField, IconButton, Box, Tooltip, Button, Menu, MenuItem,  Card, CardContent, Paper  } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code"; // Para agregar variables ({{1}})
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import Select from 'react-select';

import { WhatsappShow }     from "../components/WhatsappShow";
import { BtnWhatsappGoWeb } from "../components/BtnWhatsappGoWeb";

export const ViewCreateTemplate = () => {

    const [textValue, setTextValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: "account1", label: "Empresa A" },
        { value: "account2", label: "Empresa B" },
        { value: "account3", label: "Empresa C" },
    ];

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null);
      // Abre el menú
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      // Cierra el menú
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <>
            <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
                
                <Grid item xs={9}>
                    <Typography variant="h5">Opciones de Plantilla </Typography>

                    <Grid container spacing={2}>
                        {/* START Template Name and Lenguage */}
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                fullWidth
                                id="my-input"
                                label="Asigna un nombre a la plantilla"
                                aria-describedby="my-helper-text"
                                value={inputValue}
                                onChange={handleChange}
                                inputProps={{ maxLength: 512 }} // Limita a 512 caracteres
                                helperText={`${inputValue.length}/512 caracteres`} // Muestra el contador de caracteres
                            />
                        </Grid>

            
                        <Grid item xs={4}>
                            <Select
                                options={options}
                                placeholder="Selecciona el idioma" // Muestra el texto inicial
                                onChange={setSelectedOption} // Maneja la selección
                                value={selectedOption} // Valor actual seleccionado
                                isSearchable // Permite buscar dentro del select
                            />
                        </Grid>
                        {/* END Template Name and Lenguage */}

                        <Grid item xs={12}>
                            <Typography variant="h5">Contenido</Typography>
                            <Typography variant="caption">Rellena las secciones de encabezado, cuerpo y pie de página de tu plantilla.</Typography>
                        </Grid>


                        {/* START Variable and Encabezado (Opcional) */}
                        <Grid item xs={6}>
                            <Typography variant="Variable" sx={{ mb: 1 }}>
                                Variable
                            </Typography>
                            <Select
                                options={options}
                                placeholder="Nombre" // Muestra el texto inicial
                                onChange={setSelectedOption} // Maneja la selección
                                value={selectedOption} // Valor actual seleccionado
                                isSearchable // Permite buscar dentro del select
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="Encabezado" sx={{ mb: 1 }}>
                            Encabezado (Opcional)
                            </Typography>
                            <Select
                                options={options}
                                placeholder="Nombre" // Muestra el texto inicial
                                onChange={setSelectedOption} // Maneja la selección
                                value={selectedOption} // Valor actual seleccionado
                                isSearchable // Permite buscar dentro del select
                            />
                        </Grid>
                        {/* END Variable and Encabezado (Opcional) */}

                        {/* START Texto and ICONS */}
                        <Grid item xs={12}>
                            <Typography variant="Texto" sx={{ mb: 1 }}>Texto</Typography>
                                <TextField
                                    fullWidth
                                    label="Escribe aquí"
                                    multiline
                                    rows={4} // Define el número de filas (altura del textarea)
                                    value={textValue}
                                    onChange={(e) => setTextValue(e.target.value)}
                                    placeholder="Escribe tu mensaje aquí..." // Placeholder del textarea
                                    variant="outlined" // Estilo del campo
                                />
                                        {/* Contenedor de Iconos */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    mt: 1, // Espacio superior
                                    gap: 1, // Espacio entre íconos
                                }}
                                >
                                {/* Botón Emoticon */}
                                <Tooltip title="Agregar Emoji">
                                    <IconButton color="primary">
                                    <InsertEmoticonIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* Botón Cursiva */}
                                <Tooltip title="Letra Cursiva">
                                    <IconButton color="primary">
                                    <FormatItalicIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* Botón Negrita */}
                                <Tooltip title="Letra Negrita">
                                    <IconButton color="primary">
                                    <FormatBoldIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* Botón Subrayado */}
                                <Tooltip title="Subrayado">
                                    <IconButton color="primary">
                                    <FormatUnderlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* Botón Variables */}
                                <Tooltip title="Agregar Variable">
                                    <IconButton color="primary">
                                    <CodeIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                        {/* END Texto and ICONS */}

                        {/* START Pie de página (Opcional) */}
                        <Grid item xs={12}>
                            <Typography variant="piedepagina" sx={{ mb: 1 }}>
                                Pie de página (Opcional)
                            </Typography>
                            <TextField
                                fullWidth
                                id="piedepagina"
                                label="Introduce Texto"
                                aria-describedby="my-helper-text"
                                value={inputValue}
                                onChange={handleChange}
                                inputProps={{ maxLength: 60 }} // Limita a 512 caracteres
                                helperText={`${inputValue.length}/60 caracteres`} // Muestra el contador de caracteres
                            />
                
                        </Grid>
                         {/* END Pie de página (Opcional) */}
                        
                        {/* START Botones .Opcional */}
                        <Grid item xs={12}>

                            <Grid item>
                                <Typography variant="h5">Botones .Opcional</Typography>
                                <Typography variant="caption">Crea botones para que los clientes puedan responder tu mensaje o realizar una acción. Puedes añadir un máximo de 10 botones. Si añades más de 3 botones, aparecerán en forma de lista.    </Typography>
                            </Grid>

                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={handleClick}><AddIcon sx={{ fontSize:30, mr:1 }}/> Añadir Boton</Button>
                                    {/* Menú desplegable */}
                                    <Menu
                                        anchorEl={anchorEl} // Posiciona el menú cerca del botón
                                        open={Boolean(anchorEl)} // Controla la visibilidad del menú
                                        onClose={handleClose} // Cierra el menú
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Grid item>
                                                <Typography variant="h6">Botones de llamada a la acción</Typography>
                                            </Grid>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Grid item>
                                                <Typography variant="h6">Ir al sitio web</Typography>
                                                <Typography variant="caption">2 Botones como paximo</Typography>
                                            </Grid>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Grid item>
                                                <Typography variant="h6">Llamar al numero de telefono</Typography>
                                                <Typography variant="caption">1 boton como maximo</Typography>
                                            </Grid>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Grid item>
                                                <Typography variant="h6">Copiar codigo de oferta</Typography>
                                                <Typography variant="caption">1 boton como maximo</Typography>
                                            </Grid>
                                        </MenuItem>
                                    </Menu>
                            </Grid>

                            <BtnWhatsappGoWeb />
                        </Grid>
                         {/* END Botones .Opcional */}


                    </Grid>

                </Grid>

            
                {/* Sección Derecha - Vista Previa */}
                <Grid item xs={3}>
                    <WhatsappShow/>
                </Grid>
            </Grid>
        </>

    )

}
import React, { useState } from "react";
import { Button, Grid, TextField, InputLabel } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Select from 'react-select'
import { useNavigate }               from 'react-router-dom';

export const NavFilter = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

        // Opciones disponibles
    const options = [
        { value: "account1", label: "Empresa A" },
        { value: "account2", label: "Empresa B" },
        { value: "account3", label: "Empresa C" },
    ];

     const handleCreate = async(id) => {

        navigate(`/whatsapp/configtemplate`);
      };

    return (

        <>
             <Grid container spacing={2}>

                <Grid item xs={2}>
                    <Select
                        options={options}
                        placeholder="Buscar..." // Muestra el texto inicial
                        onChange={setSelectedOption} // Maneja la selección
                        value={selectedOption} // Valor actual seleccionado
                        isSearchable // Permite buscar dentro del select
                    />
                </Grid>

                <Grid item xs={2}>
                    <Select
                        options={options}
                        placeholder="Categoria" // Muestra el texto inicial
                        onChange={setSelectedOption} // Maneja la selección
                        value={selectedOption} // Valor actual seleccionado
                        isSearchable // Permite buscar dentro del select
                    />
                </Grid>

                <Grid item xs={2}>
                    <Select
                        options={options}
                        placeholder="Idioma" // Muestra el texto inicial
                        onChange={setSelectedOption} // Maneja la selección
                        value={selectedOption} // Valor actual seleccionado
                        isSearchable // Permite buscar dentro del select
                    />
                </Grid>

                <Grid item xs={2}>
                    <Select
                        options={options}
                        placeholder="Opciones" // Muestra el texto inicial
                        onChange={setSelectedOption} // Maneja la selección
                        value={selectedOption} // Valor actual seleccionado
                        isSearchable // Permite buscar dentro del select
                    />
                </Grid>

                
                <Grid item xs={2}>
                    <Select
                        options={options}
                        placeholder="Fechas" // Muestra el texto inicial
                        onChange={setSelectedOption} // Maneja la selección
                        value={selectedOption} // Valor actual seleccionado
                        isSearchable // Permite buscar dentro del select
                    />
                </Grid>

                <Grid item xs={2}>
                    <Button fullWidth color="primary" variant="outlined" onClick={handleCreate}>
                        <WhatsAppIcon sx={{ fontSize:30, mr:1 }}/>
                        Crear Plantilla
                    </Button>
                </Grid>

             </Grid>
        </>

    )

}
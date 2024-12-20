import React, { useState } from "react";
import { Grid, Input, Typography, TextField, IconButton, Box, Tooltip, Button, Menu, MenuItem,  Card, CardContent, Paper  } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { paisesJson } from "../../components/paises/paises";
export const BtnWhatsappGoWeb = () => {

    const optionsWeb = [
      { value: "goToWeb", label: "Ir al sitio web" },
      { value: "callToNumber", label: "Llamar al numero telefonico" },
      { value: "copyCodeOffer", label: "Copiar codigo de oferta" },
    ];
    
    const optionsUrl = [
        { value: "static", label: "Estatico" },
        { value: "dinamic", label: "Dinamico" },
    ];

    const optionsPaises = paisesJson();

    const [showInputBtns, setShowInputBtns] = useState([]);
  
    const handleChange = (event, id, field) => {

      const { value } = event.target;

      const updatedFields = showInputBtns.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      setShowInputBtns(updatedFields);
    };
  
    const handleSelectChange = (selectedOption, id, field) => {
      const updatedFields = showInputBtns.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: selectedOption,
          };
        }
        return item;
      });
      setShowInputBtns(updatedFields);
    };
  
    const handleAddField = () => {
      const newField = {
        id: new Date().getTime(),
        inputValue: '',
        inputValueUrl: '',
        selectedOptionWeb: optionsWeb[0],
        selectedTypeUrl: optionsUrl[0],
        selectedTypePais: optionsPaises[0],
      };
      setShowInputBtns([...showInputBtns, newField]);
    };
  
    const handleDeleteField = (id) => {
      setShowInputBtns(showInputBtns.filter((field) => field.id !== id));
    };
  
    return (
      <>
        <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
          {showInputBtns.map((field) => (
            <React.Fragment key={field.id}>
              <Grid item xs={3}>
                <Select
                  options={optionsWeb}
                  placeholder="Tipo de accion"
                  value={field.selectedOptionWeb}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, field.id, 'selectedOptionWeb')}
                  isSearchable
                />
              </Grid>
            
            {
                field.selectedOptionWeb.value == "goToWeb" ?
                    <Grid item xs={3}>
                        <TextField
                        size="small"
                        fullWidth
                        id="btnName"
                        label="Texto del boton"
                        value={field.inputValue}
                        onChange={(e) => handleChange(e, field.id, 'inputValue')}
                        inputProps={{ maxLength: 25 }}
                        helperText={`${field.inputValue.length}/25 caracteres`}
                        />
                    </Grid>
                :
                field.selectedOptionWeb.value == "callToNumber" ?
                    <Grid item xs={3}>
                        <TextField
                            size="small"
                            fullWidth
                            id="btnName"
                            label="Texto del boton call"
                            value={field.inputValue}
                            onChange={(e) => handleChange(e, field.id, 'inputValue')}
                            inputProps={{ maxLength: 25 }}
                            helperText={`${field.inputValue.length}/25 caracteres`}
                        />
                    </Grid>
                :
                  <Grid item xs={3}>
                    <TextField
                        size="small"
                        fullWidth
                        id="btnName"
                        label="Copy offer code"
                        value={field.inputValue}
                        onChange={(e) => handleChange(e, field.id, 'inputValue')}
                        inputProps={{ maxLength: 25 }}
                        helperText={`${field.inputValue.length}/25 caracteres`}
                    />
                  </Grid>
            }
             
            {

              field.selectedOptionWeb.value != "copyCodeOffer" ?

                field.selectedOptionWeb.value == "goToWeb" ? 
                    <Grid item xs={2}>
                        <Select
                            options={optionsUrl}
                            placeholder="Tipo de URL"
                            value={field.selectedTypeUrl}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, field.id, 'selectedTypeUrl')}
                            isSearchable
                        />
                    </Grid>
                    :
                    <Grid item xs={2}>
                        <Select
                            options={optionsPaises}
                            placeholder="Pais"
                            value={field.selectedTypePais}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, field.id, 'selectedTypePais')}
                            isSearchable
                        />
                     </Grid>
              :""

            }

            {
                field.selectedOptionWeb.value == "goToWeb" ?
                    <Grid item xs={3}>
                        <TextField
                        size="small"
                        fullWidth
                        id="btnUrl"
                        label="URL del sitio web"
                        placeholder="https://www.ejemplo.com"
                        value={field.inputValueUrl}
                        onChange={(e) => handleChange(e, field.id, 'inputValueUrl')}
                        inputProps={{ maxLength: 2000 }}
                        helperText={`${field.inputValueUrl.length}/2000 caracteres`}
                        />
                    </Grid> 
                    :
                      field.selectedOptionWeb.value == "callToNumber" ?
                        <Grid item xs={3}>
                            <TextField
                                size="small"
                                fullWidth
                                id="btnNumTel"
                                label="Numero de telefono"
                                value={field.inputValueUrl}
                                onChange={(e) => handleChange(e, field.id, 'inputValueUrl')}
                                inputProps={{ maxLength: 20 }}
                                helperText={`${field.inputValueUrl.length}/20 caracteres`}
                            />
                        </Grid>
                    :
                      <Grid item xs={5}>
                        <TextField
                            size="small"
                            fullWidth
                            id="btnNumTel"
                            label="Codigo de oferta"
                            value={field.inputValueUrl}
                            onChange={(e) => handleChange(e, field.id, 'inputValueUrl')}
                            inputProps={{ maxLength: 15 }}
                            helperText={`${field.inputValueUrl.length}/15 caracteres`}
                        />
                      </Grid>
            }

  
              <Grid item xs={1}>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteField(field.id)}>
                    <ClearIcon sx={{ fontSize: 30, mr: 1, color: "red" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={3}>
            <Button fullWidth color="primary" variant="contained" onClick={handleAddField}>
              <AddIcon sx={{ fontSize: 30, mr: 1 }} />
              Agregar otro boton
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
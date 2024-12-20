import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import KeyIcon from '@mui/icons-material/Key';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Checkbox, Grid, FormControlLabel } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = useState(false); // Estado para el checkbox
  
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab 
            label="Marketing" 
            icon={<CampaignIcon />} 
            {...a11yProps(0)} 
          />
          <Tab 
            label="Servicio" 
            icon={<NotificationsIcon />} 
            {...a11yProps(1)} 
          />
          <Tab 
            label="Autenticación" 
            icon={<KeyIcon />} 
            {...a11yProps(2)} 
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>

        <Grid container spacing={2}>

          <Grid item xs={1}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label=""
            />
          </Grid>

          <Grid item xs={11}>
            <Typography variant="h6">Marketing</Typography>
            <Typography variant="body2">
              Esta es la descripción para la sección de Marketing. Aquí puedes agregar más detalles sobre lo que implica la opción de Marketing.
            </Typography>
          </Grid>

          
          <Grid item xs={1}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label=""
            />
          </Grid>

          <Grid item xs={11}>
            <Typography variant="h6">Catálogo</Typography>
            <Typography variant="body2">
                Envía mensajes de todo tu catálogo o de varios productos del catálogo.
            </Typography>
          </Grid>

        </Grid>

      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid container spacing={2}>

            <Grid item xs={1}>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                    label=""
                />
            </Grid>

            <Grid item xs={11}>
                <Typography variant="h6">Personalizado</Typography>
                <Typography variant="body2">Envía mensajes sobre un pedido o una cuenta existente.</Typography>
            </Grid>


        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid container spacing={2}>

                <Grid item xs={1}>
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                        label=""
                    />
                </Grid>

                <Grid item xs={11}>
                    <Typography variant="h6">Código de acceso único</Typography>
                    <Typography variant="body2">Envía códigos para verificar una transacción o un inicio de sesión.</Typography>
                </Grid>


            </Grid>
      </TabPanel>
    </Box>
  );
}
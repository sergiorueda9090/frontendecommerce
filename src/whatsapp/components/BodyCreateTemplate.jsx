import { Button, Grid, TextField, InputLabel,Typography } from '@mui/material';
import { FullWidthTabs } from './TabPanel';
import { WhatsappShow } from './WhatsappShow';
export const BodyCreateTemplate = () => {

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>
        
            <Grid item>
                <Typography fontSize={39} fontWeight="light"> </Typography>
            </Grid>

            <Grid container sx={{ mt: 2, width: "99.99%" }} direction="column">

                <Grid item>
                    <Typography variant="h6">Configura tu plantilla</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="caption">Elige la categoría que mejor describa tu plantilla de mensaje. Después, selecciona el tipo de mensaje que quieres enviar.</Typography>
                </Grid>
                
            </Grid>

            <Grid item xs={12}>
                <FullWidthTabs />
            </Grid>

            {/* Otros componentes que ocupan las otras 4 filas 
            <Grid item xs={3}>
                <WhatsappShow/>
            </Grid>*/}

    </Grid>
    )

}
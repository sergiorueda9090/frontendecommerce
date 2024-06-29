import { SaveAltOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { NoteDataTableView } from "./NoteDataTableView";

export const NoteView = () => {
    
  return (
    <Grid container direction="row" justifyContent="space-between" sx={{ mb:1 }} alignItems='center'>

        <Grid item>
            <Typography fontSize={39} fontWeight="light">28 of Agust, 2023 </Typography>
        </Grid>

        <Grid item>
            <Button color="primary" sx={{ padding:2 }}>
                <SaveAltOutlined sx={{ fontSize:30, mr:1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un Titulo"
                label="Titulo"
                sx={{ border:'none', mb:1 }}
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio en el dia de hoy?"
                minRows="5"
            />
        </Grid>

        <Grid container sx={{ mt:2, width:"99.99%" }}>
            < NoteDataTableView/>
        </Grid>

    </Grid>
  )
}

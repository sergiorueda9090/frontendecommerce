import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Typography, Button, Link } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <form>
        <Grid container>
          
          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField 
              label="Nombre completo" 
              type="text"
              placeholder="tu nombre"
              fullWidth
              ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt:1 }}>
            <TextField 
              label="Email" 
              type="email"
              placeholder="youremail@gmail.com"
              fullWidth
              ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt:1  }}>
            <TextField 
              label="Password" 
              type="Password"
              placeholder="Password"
              fullWidth
              ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb:2 }}>
            

            <Grid item xs={12} sx={{ mt:2 }}>
              <Button variant="contained" fullWidth>
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
          
          </Grid>

          <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr:1 }}> Ya tienes una cuenta? </Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                <Typography>Login</Typography>
              </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
)
}

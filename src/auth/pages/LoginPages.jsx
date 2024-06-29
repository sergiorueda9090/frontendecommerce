import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Typography, Button, Link } from "@mui/material"
import { useDispatch } from "react-redux";
import { AuthLayout } from '../layout/AuthLayout';
import { getAuth } from "../../store/authStore/authThunks";

export const LoginPages = () => {
  
  const dispatch = useDispatch();

  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [errors,    setErrors]    = useState({ email: '', password: '' });

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      tempErrors.email = 'El correo es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'El correo no es válido';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if (validate()) {
  
      await dispatch( getAuth(email, password) );
  
    }
  
  };

  return (
      <AuthLayout title="Login">
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" fullWidth>
                  <Typography>Login</Typography>
                </Button>
              </Grid>

              <Grid item xs={6} sx={{ mt: 2 }}>
                <Button variant="contained" fullWidth>
                  <Typography>Register</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                <Typography>Crear una cuenta</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}

//rafc

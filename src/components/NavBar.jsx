import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { LogoDevOutlined } from '@mui/icons-material';

export const NavBar = ({ drawerWhidth = 240, nameModule = "" }) => {
  return (
      <AppBar position="fixed" 
              sx={{ 
                    width:  { sm: `calc(100% - ${ drawerWhidth }px)` },
                    ml:     { sm: `${drawerWhidth}px` }            
            }}
        >
            <Toolbar>
                <IconButton color="inherit"
                            edge="start"
                            sx={{ mr:2, display:{ sm:'none'} }}>
                    <MenuIcon/>
                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='h6' noWrap component='div'>{nameModule} </Typography>

                    <IconButton color="error">
                        <LogoDevOutlined/>
                    </IconButton>
                </Grid>


            </Toolbar>

      </AppBar>
  )
}

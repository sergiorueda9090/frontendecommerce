import {useState} from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";

const nameModule = "Ordenes";

export const Layout = ({ children }) => {

  const theme = useTheme();
  
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} nameModule={nameModule}/>
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

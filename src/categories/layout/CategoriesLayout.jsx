
import { Box, Toolbar } from "@mui/material"
import { NavBar }       from "../../components/NavBar";
import { SideBar }      from "../../components/SideBar";

const drawerWhidth = 240;
const nameModule   = "Categories"

export const CategoriesLayout = ( { children } ) => {

  return (
        <Box sx={{ display: 'flex' }}>

            {/**NAVBAR */}
            <NavBar drawerWhidth={drawerWhidth} nameModule={nameModule}/>
            
            {/**SideBar */}     
            <SideBar drawerWhidth={drawerWhidth}/>  

            <Box
                component='main'
                sx={{ flexGrow:1, p:2 }}
            >
            
            <Toolbar/>
            
            { children }

            </Box>
        </Box>
    )
}

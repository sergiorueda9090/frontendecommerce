import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";

export function SideBar({ drawerWidth = 240 }) {

  return (
    <Box component='nav' 
         sx={{ width: { sm: drawerWidth }, flexShrink:{ sm:0 } }}>
      
      <Drawer variant='permanent'
              open
              sx={{ display:{ xs:'block'},
              '& .MuiDrawer-paper':{ boxSizing:'border-box', width:drawerWidth } }}>

      <Toolbar>
        <Typography variant='h6' noWrap component='div'>Sergio Rueda</Typography>
      </Toolbar>
      <Divider />

      <List>
        {['Users', 'Categories', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link to={text}><ListItemText primary={text} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      </Drawer>
    </Box>
  );
}

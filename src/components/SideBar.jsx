import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ListItem from '@mui/material/ListItem';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import StoreIcon from '@mui/icons-material/Store';
import { Typography, Box } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  position: 'relative',
}));

const CloseButtonWrapper = styled('div')({
  position: 'absolute',
  right: 0,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Style the Link component
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const descriptions = {
    Users: 'Manage users of the system',
    Payments:'',
    Categories: 'View and edit categories',
    Subcategories: 'Manage subcategories of products',
    Products: 'View and manage products',
    Sliders: 'Manage sliders for the homepage',
    Banner: 'Edit homepage banners',
    Ordenes: 'View and manage orders',
    Transactions: 'Track transactions',
    Messaging:'Express courier service: we collect and deliver your shipments quickly.'
};

const iconColors = {
    Users: 'blue',
    Payments: 'yellow',
    Categories: 'green',
    Subcategories: 'orange',
    Products: 'purple',
    Sliders: 'red',
    Banner: 'pink',
    Ordenes: 'teal',
    Transactions: 'brown',
    LocalShippingIcon: 'green'
};

export function SideBar({ open, handleDrawerClose, username ="Sergio Rueda" }) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography variant="h6" noWrap>
          {username}
        </Typography>
        <CloseButtonWrapper>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </CloseButtonWrapper>
      </DrawerHeader>
      <Divider />
   
      <List>
    {['Users','Payments', 'Categories', 'Subcategories', 'Products', 'Sliders', 'Banner', 'Ordenes', 'Transactions', 'Messaging'].map((text) => (
      <ListItem key={text} disablePadding>
        <ListItemButton component={StyledLink} to={`/${text.toLowerCase()}`}>
          <ListItemIcon>
            <Tooltip title={descriptions[text]} arrow>
              {text === 'Users' && <GroupIcon sx={{ color: iconColors.Users }} />}
              {text === 'Payments' && <PointOfSaleIcon sx={{ color: iconColors.Categories }} />}
              {text === 'Categories' && <CategoryIcon sx={{ color: iconColors.Categories }} />}
              {text === 'Subcategories' && <SubdirectoryArrowRightIcon sx={{ color: iconColors.Subcategories }} />}
              {text === 'Products' && <ShoppingCartIcon sx={{ color: iconColors.Products }} />}
              {text === 'Sliders' && <BurstModeIcon sx={{ color: iconColors.Sliders }} />}
              {text === 'Banner' && <ViewCarouselIcon sx={{ color: iconColors.Banner }} />}
              {text === 'Ordenes' && <StoreIcon sx={{ color: iconColors.Ordenes }} />}
              {text === 'Transactions' && <ReceiptIcon sx={{ color: iconColors.Transactions }} />}
              {text === 'Messaging' && <LocalShippingIcon sx={{ color: iconColors.LocalShippingIcon }} />}
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

    </Drawer>
  );
}

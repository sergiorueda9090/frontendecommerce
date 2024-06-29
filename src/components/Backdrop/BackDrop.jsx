import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export  const SimpleBackdrop = () => {
  
  const { openBackDropStore } = useSelector(state => state.shared);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDropStore}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
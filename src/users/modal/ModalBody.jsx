import { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { ModalHeader } from './ModalHeader';
import { closeModalShared } from '../../store/sharedStore/shared';
import { setClearUser } from '../../store/usersStore/Users';
import { DialogContent, DialogContentText, Grid, TextField } from '@mui/material';
import { editUser,createUser } from '../../store/usersStore/usersThunks';
import useToastEdit  from '../alerts/useToastEdit';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalBody = () => {

  const requestConfirmation = useToastEdit();

  const dispatch = useDispatch();
  
  const { openModalStore }  = useSelector( state => state.shared );
  const {  dataUser }       = useSelector( state => state.users );
  
  const [user, setUser] = useState({"created_at": "","deleted_at": null,"email": "",
                                    "id":"", "name": "","password": "","updated_at": ""});
  
  console.log("user ",user.id);

  useEffect(() => {
    setUser(dataUser.data)
  },[dataUser.data]);

  const handleChangeForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleEditUser = async (e) => {

    e.preventDefault();
    
    const isConfirmed = await requestConfirmation();

    if (isConfirmed) {
      await dispatch(closeModalShared());
      await dispatch(editUser(user));
    }

  }

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await dispatch(closeModalShared());
    await dispatch(createUser(user));
  }

  const handleClose = async () => {
    dispatch(closeModalShared());
    dispatch(setClearUser());
  };


  return (
    <>
      
      <Dialog
        open={openModalStore}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        
        <ModalHeader title={user.id != "" ? "Editar Usuario": "Crear Usuario"}/>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>


          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                  id="name"
                  label="Nombre"
                  name="name"
                  type="name"
                  variant="standard"
                  required
                  fullWidth
                  value={user.name}
                  onChange={(e) => handleChangeForm(e)}
                />
            </Grid>

            <Grid item xs={6}>
              
              <TextField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  variant="standard"
                  required
                  fullWidth
                  value={user.email}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            <Grid item xs={4}>
              
              <TextField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  variant="standard"
                  required
                  fullWidth
                  value={user.password}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

            
            <Grid item xs={4}>
              
              <TextField
                  id="created_at"
                  label="Created At"
                  defaultValue="Default Value"
                  variant="standard"
                  name="created_at"
                  type="text"
                  required
                  fullWidth
                  value={user.created_at}
                  onChange={(e) => handleChangeForm(e)}
                />

            </Grid>

              <Grid item xs={4}>
                
                <TextField
                    id="updated_at"
                    label="Updated At"
                    defaultValue="Default Value"
                    variant="standard"
                    name="updated_at"
                    type="text"
                    fullWidth
                    required
                    value={user.updated_at}
                    onChange={(e) => handleChangeForm(e)}
                  />

              </Grid>

            <Grid item xs={4}>
                
                <TextField
                    id="deleted_at"
                    label="Deleted At"
                    variant="standard"
                    name="deleted_at"
                    type="text"
                    value={user.deleted_at}
                    fullWidth
                    required
                    onChange={(e) => handleChangeForm(e)}
                  />


            </Grid>

          </Grid>
          
          
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          { user.id != "" ? (<Button onClick={(e) => handleEditUser(e)}>Editar</Button>) : <Button onClick={(e) => handleCreateUser(e)}>Crear</Button>  }
          
        </DialogActions>
      </Dialog>
    </>
  );
}
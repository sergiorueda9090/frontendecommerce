import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Grid,Box,Paper, InputLabel,TextField,Button,Typography,Stepper,Step,StepLabel,StepContent, CircularProgress} from '@mui/material';
import Select from 'react-select'
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SendIcon from '@mui/icons-material/Send';
import { createOrderState } from '../../store/ordersStateStore/OrdersStateThunks'; 

const steps = [
    {
        label: 'Notification',
        value: 'notification',
        description: 'Send a notification to the customer regarding the order status.',
        icon: <NotificationsIcon />,
        color: 'blue'
      },
    {
      label: 'Prepare Order',
      value: 'prepare_order',
      description: 'Pack the order items securely and get them ready for shipping.',
      icon: <ScheduleIcon />,
      color: 'blue'
    },
    {
      label: 'Generate Shipping Label',
      value: 'generate_shipping_label',
      description: 'Create and print the shipping label for the order.',
      icon: <AccessTimeIcon />,
      color: 'orange'
    },
    {
      label: 'Ship the Order',
      value: 'ship_the_order',
      description: 'Hand over the package to the shipping carrier.',
      icon: <LocalShippingIcon />,
      color: 'purple'
    },
    {
      label: 'Update Order Status',
      value: 'update_order_status',
      description: 'Update the order status to "Shipped" in the system.',
      icon: <CheckCircleIcon />,
      color: 'green'
    },
    {
      label: 'Confirm Delivery',
      value: 'confirm_delivery',
      description: 'Confirm the delivery of the order with the customer.',
      icon: <CheckCircleIcon />,
      color: 'teal'
    }
  ];

  const options = [{ value: 'notification',            label: 'Notification' },
                  { value: 'prepare_order',           label: 'Prepare Order' },
                  { value: 'generate_shipping_label', label: 'Generate Shipping Label' },
                  { value: 'ship_the_order',          label: 'Ship the Order' },
                  { value: 'update_order_status',     label: 'Update Order Status' },
                  { value: 'confirm_delivery',        label: 'Confirm Delivery' }]

export const InfoOrderStatus = () => {

    const { id } = useParams(); // Extraer el id de la URL
  
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);//true show icone loading and false show the icone send

    const { dataOrderState, formOrderStateRedux } = useSelector( state => state.ordersState);
   
    const [ formOrderState, setFormOrderState] = useState({'order_status'   : dataOrderState.orderStatusTraceability.data[0].order_state, 
                                                            'create_note'   : "", 
                                                            'id_orders'     : "", 
                                                            'id_user'       : "",
                                                            'id_transaction': id});
  
    const handleChangeForm = (e) => {
      setFormOrderState({ ...formOrderState, [e.target.name]: e.target.value });
    }
  
    const handleChangeSelect = (e) => {
      setFormOrderState({...formOrderState, ["order_status"]: e.value});
    }


    useEffect(() => {

      setFormOrderState({...formOrderState, ["id_orders"]: formOrderStateRedux.id_orders});
    
    },[formOrderStateRedux])

    useEffect(() => {

      setFormOrderState({...formOrderState, ["order_status"]: dataOrderState.orderStatusTraceability.data[0].order_state});
    
    },[dataOrderState.orderStatusTraceability.data[0].order_state])

      const handlecreate = async (e) => {
    
          e.preventDefault();
          
          setLoading(true);
    
          if(formOrderState.order_status == "" || formOrderState.order_status == "notification"){
    
            toast.error("You need the Status of the order");
    
            setLoading(false);
    
            return false;
    
          }else{
    
            await dispatch(createOrderState(formOrderState));
    
            setFormOrderState({'order_status':'', 'create_note':'', 'id_order':id, 'id_user':''});
    
          }
    
          setLoading(false);
    
      }

    return (
        <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paper elevation={3} sx={{ padding: '20px', flex: 1, marginRight: '20px' }}>

                                  
              <InputLabel id="demo-simple-select-label">Order Status</InputLabel>

              <Select labelId="demo-simple-select-label" options={options} 
                      defaultValue={options[0]} 
                      onChange={ (e) => handleChangeSelect(e)} 
                      value={options.find(option => option.value === formOrderState.order_status)}/>
              
             
              <TextField sx={{mt:3}} value={formOrderState.create_note} 
                         fullWidth  required 
                         type="text" name="create_note" 
                         label="Create Note" variant="standard" 
                         onChange={(e) => handleChangeForm(e)} />

              <Button onClick={(e) => handlecreate(e)} 
                      loading={loading}
                      sx={{mt:3}} variant="contained"  
                      endIcon={loading ? <CircularProgress size={20}  color="inherit" /> : <SendIcon />}>Update Order Status</Button>


              <Typography variant="h6" gutterBottom sx={{mt:3}}>
                Shipping Steps
              </Typography>

                <Stepper orientation="horizontal">
                  {steps.map((step, index) => (
                    <Step
                      key={index}
                      active={step.value == dataOrderState.orderStatusTraceability.data[0].order_state}  // Solo el primer paso es activo
                      completed={false}      // Desactivar la propiedad de completado para todos
                      disabled={step.value !== dataOrderState.orderStatusTraceability.data[0].order_state} // Deshabilitar los demás pasos
                    >
                      <StepLabel>
                        <Box sx={{ color: step.value == dataOrderState.orderStatusTraceability.data[0].order_state ? step.color : 'gray' }}>  {/* Cambiar el color según si está activo o no */}
                          {step.icon}
                        </Box>
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          {step.description}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              
            </Paper>
        </Box>         
      </Grid>
    )

}
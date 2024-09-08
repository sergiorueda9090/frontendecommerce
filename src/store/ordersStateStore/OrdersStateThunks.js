import axios from "axios";
import toast from 'react-hot-toast';
import { setClearDataState, setDataOrdersState } from "./OrdersState.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";
import { loginFail } from "../authStore/Auth.js";


export const getShow = (id = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showOrdenState/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataOrdersState({ dataOrderState:  response.data }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const createOrderState =  (data) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        data.id_user    = JSON.parse(localStorage.getItem("infoUser")).user.id;
        
        data.id_orders  = data.id_orders.join(',')

        await dispatch(showBackDropStore());

        const options = {
            method: 'POST',
            url: `${ URL}/api/createOrdenState`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:data
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            console.log("response ",response);

            if(response.data.status){
                await dispatch( hideBackDropStore() );
                
                //await dispatch( setClearDataState() );
                await dispatch( getShow(data.id_transaction) );

                toast.success('Successfully created!');
            }else{
                await dispatch( hideBackDropStore() );
                await dispatch( getShow(data.id_transaction) );
                toast.error(`${response.data.message}`);
            }
            

        } catch (error) {
            
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

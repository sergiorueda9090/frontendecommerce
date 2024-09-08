import axios from "axios";
import { setClearDataState, setDataTransactions } from "./transactionsStore.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";
import { loginFail } from "../authStore/Auth.js";


// Función asincrónica para obtener los Users
export const getAll = () => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllTransactions`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataTransactions({ transactionsState: response.data.data , pager: response.data.pager }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            await dispatch( loginFail() );
            await dispatch( hideBackDropStore() );

        }
    };
};


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
            await dispatch(setClearDataState({ transactionsState:  response.data }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}



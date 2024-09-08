import axios from "axios";
import toast from 'react-hot-toast';
import { setDataDataOrders, setDataOrder, setClearData } from "./Orders.js";
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
            url: `${ URL}/api/listAllOrdenes`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataDataOrders({ dataOrders: response.data.data, pager: response.data.pager }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );

        }
    };
};

export const getOrder = (id = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showSlider/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataOrder({ dataSlider:  response.data.data[0] }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editSlider = (data = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateSlider/${data.id}`,
            headers: {
              Authorization: `Token ${token}`,
              'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            },
            data:data
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( setClearData() );
                await dispatch( getAll() );
                toast.success('Successfully Update!');
            }else{
                toast.error('This is an error!');;
            }
            

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const createSlider =  (categoryData) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        const options = {
            method: 'POST',
            url: `${ URL}/api/createSlider`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:categoryData
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( setClearData() );
                await dispatch( getAll() );
                toast.success('Successfully created!');
            }else{
                await dispatch( hideBackDropStore() );
                await dispatch( getAll() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {
            
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const createMany =  (data) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/createManySubCategory`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:{ data }
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( setClearData() );
                await dispatch( getAll() );
                toast.success('Successfully created!');
            }else{
                await dispatch( hideBackDropStore() );
                await dispatch( getAll() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const getDelete = (id = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token
        
        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteslider/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            await dispatch( hideBackDropStore() );
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            if(response.data.status){
                await dispatch( getAll() );
                toast.success('Successfully Delete!');
            }else{
                toast.error('This is an error!');;
            }
            

        } catch (error) {

            await dispatch( loginFail() );
            
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}

export const clearDataSlider = () => {
    return async (dispatch, getState) => {
        await dispatch( setClearData() );
    }
}


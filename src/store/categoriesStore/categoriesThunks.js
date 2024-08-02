import axios from "axios";
import toast from 'react-hot-toast';
import { loginFail } from "../authStore/Auth.js"; 
import { setDataCategories, setDataCategory, setClearCategory, setDataOptions } from "./Categories.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";


// Función asincrónica para obtener los Users
export const getCategories = () => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllCategories`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataCategories({ dataCategories: response.data.data }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );

        }
    };
};

export const getCategory = (idUser = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showCategory/${idUser}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
            console.log("response ",response.data.data[0]);
            // Despachar la acción setAuthenticated con la respuesta de la solicitud

            await dispatch(setDataCategory({ dataCategory:  response.data.data[0] }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {
            await dispatch( loginFail() );
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editCategory = (categoryData = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateCategory/${categoryData.id}`,
            headers: {
              Authorization: `Token ${token}`,
              'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            },
            data:categoryData
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( setClearCategory() );
                await dispatch( getCategories() );
                toast.success('Successfully created!');
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

export const createCategory =  (categoryData) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'POST',
            url: `${ URL}/api/createCategory`,
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
                await dispatch( setClearCategory() );
                await dispatch( getCategories() );
                toast.success('Successfully created!');
            }else{
                await dispatch( hideBackDropStore() );
                await dispatch( getCategories() );
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


export const getDelete = (idCategory = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteCategory/${idCategory}`,
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
                await dispatch( getCategories() );
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

export const getDataOption = () => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllOptionsCategories`,
            headers: {
                Authorization: `Token ${token}`
            }
            };
            

        try {
            // Hacer la solicitud
            const response = await axios.request(options);

            await dispatch(setDataOptions(response.data.data));

            await dispatch( hideBackDropStore() );

        } catch (error) {
            
            // Manejar errores
            console.error(error);
            await dispatch( loginFail() );
            await dispatch( hideBackDropStore() );

        }
    };
};

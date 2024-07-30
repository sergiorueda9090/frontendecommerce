import axios from "axios";
import toast from 'react-hot-toast';
import { setDataSubCategories, setDataSubCategory, setClearData, setDataOptions } from "./SubCategories.js";
import { showBackDropStore, hideBackDropStore, showLinearProgress, hideLinearProgress } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";
import constants    from "../../constants/constants.js";

const token = constants.token;

// Función asincrónica para obtener los Users
export const getAll = () => {

    return async (dispatch, getState) => {
        
        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllSubCategories`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataSubCategories({ dataSubCategories: response.data.data, pager: response.data.pager }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            
            await dispatch( hideBackDropStore() );

        }
    };
};

export const getSubCategory = (id = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showSubCategories/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataSubCategory({ dataCategory:  response.data.data[0] }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editSubCategory = (data = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateSubCategory/${data.id}`,
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

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const createSubCategory =  (categoryData) => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
        const options = {
            method: 'POST',
            url: `${ URL}/api/createSubCategory`,
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

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}


export const createMany =  (data) => {

    return async (dispatch, getState) => {

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

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const getDelete = (id = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteSubCategory/${id}`,
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
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}


export const getDataOption = (id = "") => {
    
    return async (dispatch, getState) => {
        
        await dispatch(showLinearProgress());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllOptionsSubCategories/${id}`,
            headers: {
                Authorization: `Token ${token}`
            }
            };
            

        try {
            // Hacer la solicitud
            const response = await axios.request(options);

            await dispatch(setDataOptions(response.data.data));

            await dispatch( hideLinearProgress() );

        } catch (error) {
            
            // Manejar errores
            console.error(error);
            
            await dispatch( hideLinearProgress() );

        }
    };
};
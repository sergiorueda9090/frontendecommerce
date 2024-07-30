import axios from "axios";
import toast from 'react-hot-toast';
import { setDataProducts, setDataProduct, setClearData } from "./Products.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
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
            url: `${ URL}/api/listAllProduct`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataProducts({ data: response.data.data, pager: response.data.pager }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            
            await dispatch( hideBackDropStore() );

        }
    };
};

export const getProduct = (id = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showProduct/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataProduct({ data: response.data.data }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editProduct =  (id = "", data ="") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
 
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateProduct/${id}`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:data
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
               
                await dispatch( setClearData() );
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);

            }else{
                
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);

            }
            

        } catch (error) {

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}


export const createProduct =  (data) => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
 
        const options = {
            method: 'POST',
            url: `${ URL}/api/createProduct`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:data
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                
                await dispatch( setClearData() );
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);

            }else{
                
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
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
                
                await dispatch( setClearData() );
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success('Successfully created!');

            }else{
                
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            
            }
            

        } catch (error) {

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const deleteImage = (id) => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteimageproduct/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
             
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            if(response.data.status){

                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success('Successfully Delete!');

            }else{

                await dispatch( hideBackDropStore() );
                toast.error('This is an error!');;
            
            }
            

        } catch (error) {
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}


export const getDeleteSize = (id, idColor, idQuantity) => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deletesizeproduct/${id}/${idColor}/${idQuantity}`,
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

export const getDelete = (id = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteproduct/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            if(response.data.status){

                await dispatch( getAll() );
                
                await dispatch( hideBackDropStore() );

                toast.success('Successfully Delete!');

            }else{

                await dispatch( hideBackDropStore() );

                toast.error('This is an error!');;

            }
            

        } catch (error) {
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}
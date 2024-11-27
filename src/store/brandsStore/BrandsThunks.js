import axios from "axios";
import toast from 'react-hot-toast';
import { loginFail } from "../authStore/Auth.js"; 
import { setClearData, setDataBrands, setDataBrand } from "./Brands.js";
import { showBackDropStore, hideBackDropStore, hideLinearProgress,showLinearProgress } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";


// Función asincrónica para obtener los Users
export const getAll = () => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllBrands`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataBrands({ dataBrands: response.data.data, pager: response.data.pager }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );

        }
    };
};

export const getBrand = (id = "") => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showBrands/${id}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            console.log("response.data.data[0] ",response.data.data[0]);
            
            await dispatch(setDataBrand({ dataBrand:  response.data.data[0] }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {
            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editBrand = (data = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateBrands/${data.id}`,
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

export const createBrand =  (data) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
        const options = {
            method: 'POST',
            url: `${ URL}/api/createBrands`,
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
        
        console.log("data ",data);

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/createManyBrands`,
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
            url: `${ URL}/api/deleteBrands/${id}`,
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

export const clearDataBanner = () => {
    return async (dispatch, getState) => {
        await dispatch( setClearData() );
    }
}

export const getBrandsByCategory = (idCategory = "", idSubCategory = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token
        
        await dispatch(showLinearProgress());

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/getBrandsByCategory/${idCategory}/${idSubCategory}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);

            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataBrands({ dataBrands: response.data.data, pager: response.data.pager }));
            
            await dispatch( hideBackDropStore() );

            await dispatch( hideLinearProgress() );

        } catch (error) {

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );

            await dispatch( hideLinearProgress() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

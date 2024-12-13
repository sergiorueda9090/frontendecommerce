import axios from "axios";
import toast from 'react-hot-toast';
import { loginFail } from "../authStore/Auth.js"; 
import { setDataProducts, setDataProduct, setClearData, setAddAttributeArray } from "./Products.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
import { URL }      from "../../api/authApi.js";
import { getDataOption } from "../subcategoriesStore/SubCategoriesThunks.js";
import { getBrandsByCategory } from "../brandsStore/BrandsThunks.js";                   

// Función asincrónica para obtener los Users
export const getAll = () => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

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
            //await dispatch( loginFail() );
            await dispatch( hideBackDropStore() );

        }
    };
};

export const getProduct = (id = "") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

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
            console.log("response.data.data ",response.data.data);

            await dispatch(getDataOption(response.data.data.products[0].id_categories));
            await dispatch(getBrandsByCategory(response.data.data.products[0].id_categories, response.data.data.products[0].id_subcategories))

            let product         = response.data.data.products[0];
            //let arrayAttributes = response.data.data.productattributes;
            let arrayAttributes = response.data.data.valueattributes;
            let imagesArray     = response.data.data.productimages;
            let specifications  = JSON.parse(response.data.data.products[0].specifications);
            

            await dispatch(setDataProduct({ product         : product,
                                            arrayAttributes : arrayAttributes,
                                            imagesArray     : imagesArray,
                                            specifications  : specifications,
                                            id_productattributes: arrayAttributes[0].id
                                          }
                                        ));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            //await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editProduct =  (id = "", data ="") => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

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

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const createProduct =  (data) => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

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
                console.log("ingresa ok");
                await dispatch( setClearData() );
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);
            }else{
                console.log("ingresa error");
                await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            //await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const updateOnlyProduct = (data) => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
 
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateOnlyProduct/${data.id}`,
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
                //await dispatch( setClearData() );
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);
            }else{
                console.log("ingresa error");
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            //await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }
}

export const updateAddValueattributes = (data) => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token
                
        console.log("data ",data);

        await dispatch(showBackDropStore());
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateAddValueattributes/${data.idProduct}/${data.idProductattributes}`,
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
                //await dispatch( setClearData() );
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);
            }else{
                console.log("ingresa error");
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            //await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }
}

export const updateDescriptionProduct = (data) => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
 
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateDescriptionProduct/${data.id}`,
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
                //await dispatch( setClearData() );
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);
            }else{
                console.log("ingresa error");
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            //await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }
}

export const updateDetailsProduct = (data) => {

    return async (dispatch, getState) => {
        
        const {auth} = getState();

        const token = auth.token

        await dispatch(showBackDropStore());
 
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateDetailsProduct/${data.id}`,
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
                //await dispatch( setClearData() );
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.success(response.data.message);
            }else{
                console.log("ingresa error");
                //await dispatch( getAll() );
                await dispatch( hideBackDropStore() );
                toast.error(`${response.data.message} ${response.data.data}`);
            }
            

        } catch (error) {

            //await dispatch( loginFail() );

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

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const deleteImage = (id) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token

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

            await dispatch( loginFail() );

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}


export const getDeleteSize = (id, idColor, idQuantity) => {

    return async (dispatch, getState) => {

        const {auth} = getState();

        const token = auth.token
        
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

            await dispatch( loginFail() );
            
            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
        }

    }

}

export const product = (data) => {
    console.log("data ",data);
}

export const clearContentProduct = () => {

    return async (dispatch, getState) => {
        await dispatch( setClearData() );
    }

}

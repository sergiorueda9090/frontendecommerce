import axios from "axios";
import toast from 'react-hot-toast';
import { setDataUsers,setDataUser } from "./Users.js";
import { showBackDropStore, hideBackDropStore } from '../sharedStore/shared.js';
import { URL } from "../../api/authApi.js";
import constants from "../../constants/constants.js";

const token = constants.token;

// Función asincrónica para obtener los Users
export const getUsers = () => {

    return async (dispatch, getState) => {
        
        await dispatch(showBackDropStore());

        // Iniciar la carga
        const options = {
            method: 'GET',
            url: `${ URL}/api/listAllUsers`,
            headers: {
              Authorization: `Token ${token}`
            }
          };
          

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataUsers({ dataUsers: response.data }));

            await dispatch( hideBackDropStore() );

        } catch (error) {
         
            // Manejar errores
            console.error(error);
            
            await dispatch( hideBackDropStore() );

        }
    };
};

export const getUser = (idUser = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'GET',
            url: `${ URL}/api/showUser/${idUser}`,
            headers: {
              Authorization: `Token ${token}`
            }
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
           
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setDataUser({ dataUser: response.data.data }));
            
            await dispatch( hideBackDropStore() );

        } catch (error) {

            await dispatch( hideBackDropStore() );
            // Manejar errores
            console.error(error);
       
        }

    }

}

export const editUser = (userData = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());
        
        const options = {
            method: 'POST',
            url: `${ URL}/api/updateUser/${userData.id}`,
            headers: {
              Authorization: `Token ${token}`,
              'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            },
            data:userData
          };

          try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( getUsers() );
                toast.success('Successfully created!');
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

export const createUser =  (userData) => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'POST',
            url: `${ URL}//api/createUser`,
            headers: {
                Authorization: `Token ${token}`,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
              },
            data:userData
        }

        try {
            // Hacer la solicitud
            const response = await axios.request(options);
 
            if(response.data.status){
                await dispatch( hideBackDropStore() );
                await dispatch( getUsers() );
                toast.success('Successfully created!');
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


export const getDelete = (idUser = "") => {

    return async (dispatch, getState) => {

        await dispatch(showBackDropStore());

        const options = {
            method: 'DELETE',
            url: `${ URL}/api/deleteUser/${idUser}`,
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
                await dispatch( getUsers() );
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
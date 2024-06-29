import axios from "axios";
import { startLoaging, setAuthenticated } from "./Auth.js";
import { URL } from "../../api/authApi.js";

// Función asincrónica para obtener los Pokemons
export const getAuth = (email='',password='') => {

    return async (dispatch, getState) => {

        // Iniciar la carga
        await dispatch(startLoaging());

        const options = {
            method: 'POST',
            url:    `${URL}/auth`,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            },
            data: {
                email:      email,
                password:   password
            }
        };

        try {

            // Hacer la solicitud
            const response = await axios.request(options);
            
            // Despachar la acción setAuthenticated con la respuesta de la solicitud
            await dispatch(setAuthenticated({ infoUser: response.data }));
      
        } catch (error) {
         
            // Manejar errores
            console.error(error);
       
        }
    };
};
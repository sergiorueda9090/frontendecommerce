import axios from "axios";
import { startLoaging, setAuthenticated, loginSuccess, loginFail } from "./Auth.js";
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

            await dispatch(loginSuccess());
      
        } catch (error) {
         
            // Manejar errores
            console.error(error);

            await dispatch(loginFail());
       
        }
    };
};


export const getLoginSuccess = () => {
    
    let data;

    if(localStorage.getItem("infoUser")){
        data = JSON.parse(localStorage.getItem("infoUser"));
    }

    console.log("getLoginSuccess ",data)
    return async (dispatch, getState) => {

        await dispatch(loginSuccess(    {token         : data?.access_token ?? '',
                                         name_user     : data?.user.name ?? '',
                                         email         : data?.user.email ?? '',
                                         validateToken : data?.validateToken ?? false}
                                    )
                    )

    }
}

export const closeSession = () => {
    

    
        return async (dispatch, getState) => {
    
            await dispatch(loginSuccess(    {token         : '',
                                             name_user     : '',
                                             email         : '',
                                             validateToken : false}
                                        )
                        )
    
        }
    

}
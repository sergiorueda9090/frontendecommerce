import { Route, Routes } from 'react-router-dom';
import { AuthRoutes }    from  '../auth/routes/AuthRoutes';
import { JournalRoute }  from '../journal/routes/JournalRoute';
import { useSelector }   from 'react-redux';

export const AppRouter = () => {

    const { infoUser } = useSelector( state => state.auth)
    
    const pathRoutes = () => {

        if(infoUser.access_token != ""){
            return <Route path="/*"      element={ <JournalRoute/> }/>
        }else{
            return <Route path="/auth/*" element={ <AuthRoutes/> } />
        }
    }


    return (
        <Routes>
            {pathRoutes()}
        </Routes>
    )

}
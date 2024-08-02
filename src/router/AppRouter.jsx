import React, { useEffect } from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';
import { AuthRoutes }    from  '../auth/routes/AuthRoutes';
import { JournalRoute }  from '../journal/routes/JournalRoute';
import { useSelector, useDispatch }   from 'react-redux';
import { getLoginSuccess } from '../store/authStore/authThunks.js';

export const AppRouter = () => {

    const { isLogin } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    

    useEffect(() => {

        const callMyFunction = async () => {
            await dispatch(getLoginSuccess());
        }
        
        callMyFunction();

      }, [isLogin]);
    
    return (
      <Routes>
        {isLogin ? (
          <Route path="/*" element={<JournalRoute />} />
        ) : (
          <>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    );
  };
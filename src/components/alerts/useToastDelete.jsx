import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useToastDelete = () => {
  
  const [confirmPromise, setConfirmPromise] = useState(null);

  useEffect(() => {
    if (confirmPromise) {
      const ConfirmNotification = () => (
        <div>
          <p>¿Are you sure you want to delete this element?</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button onClick={() => handleConfirm(true)} style={{ marginRight: '10px', color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px' }}>Si</button>
          <button onClick={() => handleConfirm(false)} style={{ color: 'white', backgroundColor: 'grey', border: 'none', padding: '5px 10px' }}>No</button>
        </div>
        </div>
      );

      const handleConfirm = (isConfirmed) => {
        confirmPromise.resolve(isConfirmed);
        toast.dismiss();
      };

      toast(<ConfirmNotification />);
    }
  }, [confirmPromise]);

  const requestConfirmation = () => {
    return new Promise((resolve, reject) => {
      setConfirmPromise({ resolve, reject });
    });
  };

  return requestConfirmation;
};

export default useToastDelete;

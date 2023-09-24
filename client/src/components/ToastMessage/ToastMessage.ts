import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastMessageProps = {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error'; 
};

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type = 'info' }) => {
    useEffect(() => {
        const toastOptions = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };

        switch (type) {
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'warning':
            toast.warn(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        default:
            toast.info(message, toastOptions);
        }
    }, [ message, type ]);

    return null;
};

export default ToastMessage;

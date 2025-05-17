import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const activeToasts = new Set();

export const showCustomToast = (message, type = 'default') => {
  const toastId = `${type}-${message}`;

  if (toast.isActive(toastId)) {
    return;
  }

  toast(message, {
    toastId, 
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    onClose: () => {
      activeToasts.delete(toastId); 
    },
  });

  activeToasts.add(toastId);
};

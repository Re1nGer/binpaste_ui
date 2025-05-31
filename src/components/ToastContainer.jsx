import { useToast } from "../hooks/useToast";
import Toast from "./Toast";


const ToastContainer = ({ position = 'top-right', isDarkMode = true }) => {

  const { toasts, removeToast } = useToast();

  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return positions[position] || positions['top-right'];
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-2 pointer-events-none`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
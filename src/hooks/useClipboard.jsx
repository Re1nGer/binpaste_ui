
import { useToast } from "./useToast";


export const useClipboard = () => {
  const { addToast } = useToast();

  const copyToClipboard = async (text, options = {}) => {
    const {
      successTitle = "Copied to clipboard!",
      successMessage = "",
      errorTitle = "Failed to copy",
      errorMessage = "Please try again or copy manually",
      showToast = true
    } = options;

    try {

    await navigator.clipboard.writeText(text);

      if (showToast) {
        addToast({
          type: 'clipboard',
          title: successTitle,
          message: successMessage,
          duration: 2000
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      
      if (showToast) {
        addToast({
          type: 'error',
          title: errorTitle,
          message: errorMessage,
          duration: 4000
        });
      }

      return false;
    }
  };

  return { copyToClipboard };
};
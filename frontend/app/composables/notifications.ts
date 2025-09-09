export const useToaster = () => {
    const toaster = useToast();

    const showSuccess = (message?: string) => {
        toaster.add({
            title: 'Success!',
            description: message + '🍞' || 'Your operation succeeded 🍞',
            color: 'success',
        });
    };

    const showError = (message?: string) => {
        toaster.add({
            title: 'Error!',
            description: message + '🍞' || 'An error occurred, please try again 🍞',
            color: 'error',
        });
    };

    const showInfo = (message?: string) => {
        toaster.add({
            title: 'Info!',
            description: message + '🍞' || 'Information 🍞',
            color: 'info',
        });
    };

    return {
        showSuccess,
        showError,
        showInfo,
    };
}
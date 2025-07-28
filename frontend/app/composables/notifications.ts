export const useToaster = () => {
    const toaster = useToast();

    const showSuccess = (message?: string) => {
        toaster.add({
            title: 'Success!',
            description: message + '🍞' || 'Your operation succeeded 🍞',
            color: 'success',
            icon: 'i-heroicons-check-20-solid',
        });
    };

    const showError = (message?: string) => {
        toaster.add({
            title: 'Error!',
            description: message + '🍞' || 'An error occurred, please try again 🍞',
            color: 'error',
            icon: 'i-heroicons-x-circle-20-solid',
        });
    };

    const showInfo = (message?: string) => {
        toaster.add({
            title: 'Info!',
            description: message + '🍞' || 'This is an information message 🍞',
            color: 'info',
            icon: 'i-heroicons-information-circle-20-solid',
        });
    };

    return {
        showSuccess,
        showError,
        showInfo,
    };
}
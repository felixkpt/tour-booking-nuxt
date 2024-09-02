// Define types for error objects
type FastAPIError = { loc: string[]; msg: string };
type LaravelError = {
    message: string;
    errors: Record<string, string[]>;
};

// Define type for the formatErrors function
type FormatErrorsFunction = {
    fastAPI: (errors: any | FastAPIError[]) => Record<string, string>;
    laravel: (errors: LaravelError) => Record<string, string>;
};

// Helper function to format errors in a uniform structure
export const formatErrors: FormatErrorsFunction = {
    fastAPI: (errors) => {
        errors = errors?.detail ? errors?.detail : errors;

        const formattedErrors: Record<string, string> = {};

        if (Array.isArray(errors)) {
            errors.forEach((error: FastAPIError) => {
                const { loc, msg } = error;
                const field = loc[1];
                formattedErrors[field] = msg;
            });
        }

        return formattedErrors;
    },
    laravel: (errors) => {
        const formattedErrors: Record<string, string> = {};

        if (errors && typeof errors === 'object') {
            // Extract general message if needed
            if (errors.message) {
                console.warn('General error message:', errors.message);
            }

            // Process field-specific errors
            if (errors.errors) {
                for (const [field, messages] of Object.entries(errors.errors)) {
                    if (Array.isArray(messages)) {
                        formattedErrors[field] = messages.join(', ');
                    }
                }
            }
        }

        return formattedErrors;
    },
};

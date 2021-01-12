import React, {useState, useCallback, ReactNode, useContext, ReactChildren, FunctionComponent} from 'react';

export const ErrorContext = React.createContext({
    error: "",
    addError: (error: string) => {},
    removeError: () => {}
});

export const ErrorProvider: FunctionComponent = ({children}) => {
    const [error, setError] = useState("");
    const removeError = () => setError("");
    const addError = (error: string) => setError(error);

    const contextValue = {
        error: error,
        addError: useCallback((error: string) => addError(error), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useError() {
    const { error, addError, removeError } = useContext(ErrorContext);
    return { error, addError, removeError };
}

import React, {useState, useCallback, ReactNode, useContext, ReactChildren, FunctionComponent} from 'react';

export const ErrorContext = React.createContext({
    error: "",
    addError: (message:string) => {},
    removeError: () => {}
});

export type Props = {
    children: ReactNode
};

export const ErrorProvider: FunctionComponent = ({children}) => {
    const [error, setError] = useState("");
    const removeError = () => setError("");
    const addError = (message: string) => setError(message);

    const contextValue = {
        error: error,
        addError: useCallback((message: string) => addError(message), []),
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

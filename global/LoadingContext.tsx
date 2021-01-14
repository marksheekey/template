import React, {useState, useContext,  FunctionComponent} from 'react';

export const LoadingContext = React.createContext({
    isLoading: false,
    setIsLoading: (loading: boolean) => {},
});

export const LoadingProvider: FunctionComponent = ({children}) => {
    const [loading, setLoading] = useState(false);
    const setIsLoading = (load: boolean) => setLoading(load);

    const contextValue = {
        isLoading: loading,
        setIsLoading: (load: boolean) => setIsLoading(load)
    };

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    return {isLoading, setIsLoading}
}

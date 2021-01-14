import React, {useState, useCallback, useContext,  FunctionComponent} from 'react';

export const LoadingContext = React.createContext({
    loading: false,
    isLoading: (loading: boolean) => {},
});

export const LoadingProvider: FunctionComponent = ({children}) => {
    const [loading, setLoading] = useState(false);
    const isLoading = (loading: boolean) => setLoading(loading);

    const contextValue = {
        loading: loading,
        isLoading: useCallback((loading: boolean) => isLoading(loading), []),
    };

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const { loading, isLoading } = useContext(LoadingContext);
    return { loading, isLoading};
}

import * as React from "react";

export type AppContextType = {
    setError: (error: any) => void
}

export const AppContext = React.createContext<AppContextType|undefined>(undefined)

export function useAppContext() {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}

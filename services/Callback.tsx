export interface Callback{
    onResult: (data: any) => void
    onError: (error: Error) => void
    onLoading: (loading: boolean) => void
}

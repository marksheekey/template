export interface Callback{
    onResult: (data: any) => void
    onError: (message:string) => void
    onLoading: (loading: boolean) => void
}

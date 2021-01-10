import {Callback} from "./Callback";

export function setCallBack(error: Function, loading: Function, result:Function): Callback {
    return {
        onError(errorCallback: Error): void {error(errorCallback.message)},
        onLoading(loadingCallback: boolean): void { loading(loadingCallback)},
        onResult(data: any): void { result(data)}
    }
}

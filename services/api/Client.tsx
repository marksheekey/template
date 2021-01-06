import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {apiConfig} from './config'
import {LocalStorage} from '../local-storage/LocalStorage'
import {Base64, toBase64} from "js-base64";
import {singleton} from "tsyringe";

@singleton()
class Client {
    public readonly instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            baseURL: apiConfig.baseUrl,
            timeout: apiConfig.timeout,
            responseType: "json"
        })

        this._initializeResponseInterceptor();
        this._authInterceptor();
        //this._logger()
        this._customHeader()
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _authInterceptor = () => {
        this.instance.interceptors.request.use(
            config => {
                const token = LocalStorage.getInstance().getAPiKey()
                if(token.length > 0) {
                    config.headers.Authorization = 'Bearer ' + token
                }else{
                    config.headers.Authorization = 'Basic ' + toBase64("marksheekey@hotmail.com" + ":" + "sonycat01")
                }
                return config
            },
            error => {
                Promise.reject(error)
            }
        )
    }

    private _customHeader = () => {
        this.instance.interceptors.request.use(
            config => {
                config.headers.account = LocalStorage.getInstance().getAccount()
                return config
            },
            error => {
                Promise.reject(error)
            }
        )
    }

    private _logger = () => {
    this.instance.interceptors.request.use(request => {
        return request
    })
}

    private _handleResponse = ({data}: AxiosResponse) => data;

    protected _handleError = (error: any) => {
        return Promise.reject(error);
    };
}

export default Client

export interface Callback{
    onResult: (data: any) => void
    onError: (message:string) => void
    onLoading: (loading: boolean) => void
}




import AsyncStorage from '@react-native-async-storage/async-storage';
export class LocalStorage{
    private static instance: LocalStorage
    private api_key: string = "";
    private user: string = ""
    private password: string = ""
    private account: number = 0
    private constructor(){}
    public static getInstance(): LocalStorage{
        if(!LocalStorage.instance){
            LocalStorage.instance = new LocalStorage()
        }
        return LocalStorage.instance
    }

    public saveApiKey(key: string) {
        this.api_key = key
    }

    public getAPiKey() : string {
        return this.api_key
    }

    public saveCredentials(user: string, password: string){
        this.user = user
        this.password = password
    }

    public saveAccount(account:number){
        this.account = account
    }

    public getUser() {
        return this.user
    }

    public getPassword() {
        return this.password
    }

    public getAccount() {
        return this.account
    }

    private saveValue(key: string, value:string){
        async (key: string) => {
            try {
                await AsyncStorage.setItem(key, value)
            } catch (e) {
                // saving error
            }
        }
    }

    private  getValue = async (key: string) =>  {
        async (key: string) => {
            try {
                const value = await AsyncStorage.getItem(key)
                return value
            } catch (e) {
                // saving error
                return ""
            }
        }
    }
}

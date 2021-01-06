
export class LeaveUI{
    millis: number
    key: string
    type?: string
    title? : string
    subtitle? : string
    constructor(millis: number,key:string, type:string, title:string, subtitle:string) {
        this.millis = millis
        this.key = key
        this.type = type
        this.title = title
        this.subtitle = subtitle
    }
}

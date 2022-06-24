interface wsConfig {
    store:any
    url:string
    onmessage?: { (): void; } []
    onopen?: { (): void; } []
}

export class Socket {
    ws: any;
    store: any;
    constructor(config:wsConfig){
        this.store = config.store;
        this.onmessage = config.onmessage;
        this.onopen = config.onopen;
        this.ws = new WebSocket(config.url);
        this.ws.onopen = (e)=>this.onOpen(e);
        this.ws.onmessage = (e)=>this.onMessage(e);
        this.ws.onerror = (e)=>this.onError(e);
        this.ws.onclose = (e)=>this.onClose(e);
    }
    onOpen(event:any):any{
        if(this.onopen)
            for(let func of this.onopen)
                func();
        return;
    }
    onMessage(event:any, store?:any):any{
        const storer = store ? store : this.store;
        const data = JSON.parse(event.data);
        storer.update((messenger:any) => [...messenger, data]);
        if(this.onmessage)
            for(let func of this.onmessage)
                func();
        return
    }
    onError(event:any):any{
        return;
    }
    onClose(event:any):any{

    }
    sendData(data:string){
        this.ws.send(data)    
    }
}

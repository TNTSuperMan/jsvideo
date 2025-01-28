export type JSVGenerator<T extends LayerState> = Generator<boolean | void | JSVGeneratorFunc<T>, void, void>;
export type JSVGeneratorFunc<T extends LayerState> = (state: T) => JSVGenerator<T>;
    
export const rgba = (r:number,g:number,b:number,a:number):
    `rgba(${number},${number},${number},${number})`=> `rgba(${r},${g},${b},${1-a})`

export class LayerState{
    x: number = 0;
    y: number = 0;
    size: number = 0;
    transparent: number = 0;
    rotate: number = 0;
    cx: number = 0;
    cy: number = 0;
}
export class Layer<T extends LayerState>{
    private state: T;
    private originalState: T;
    private drawer: (state: T, ctx: CanvasRenderingContext2D) => void;
    private callstack: JSVGenerator<T>[];
    private originalGenerator: JSVGeneratorFunc<T>;
    constructor(state: T, generator: JSVGeneratorFunc<T>, drawer: (state: T, ctx: CanvasRenderingContext2D) => void){
        this.originalState = state;
        this.state = structuredClone(state);
        this.drawer = drawer;
        this.originalGenerator = generator;
        this.callstack = [generator(this.state)];
    }
    draw(ctx: CanvasRenderingContext2D): boolean{
        if(this.callstack.length === 0) throw new Error("Callstack is empty");
        const { done, value } = (this.callstack.findLast(()=>true) as JSVGenerator<T>).next();

        if(done){
            this.callstack.pop();
            if(this.callstack.length === 0) return true;
            else return this.draw(ctx);
        }else if(typeof value === "function"){
            this.callstack.push(value(this.state));
            return this.draw(ctx);
        }else{
            const asrad = this.state.rotate * Math.PI / 180;
            ctx.translate(this.state.x, this.state.y);
            ctx.rotate(asrad);
    
            this.drawer(this.state, ctx);
    
            ctx.rotate(-asrad);
            ctx.translate(-this.state.x, -this.state.y);
            return !!value;
        }
    }
    init(){
        this.state = structuredClone(this.originalState);
        this.callstack = [this.originalGenerator(this.state)];
    }
}

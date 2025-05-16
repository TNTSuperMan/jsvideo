export type JSVGenerator = Generator<boolean | void, void, void>;
export type JSVGeneratorFunc<T extends LayerState> = (state: T) => JSVGenerator;
    
export const rgba = (r:number,g:number,b:number,a:number):
    `rgba(${number},${number},${number},${number})`=> `rgba(${r},${g},${b},${1-a})`

export class LayerState{
    x: number = 0;
    y: number = 0;
    size: number = 0;
    rotate: number = 0;
    cx: number = 0;
    cy: number = 0;
}
export interface Layer{
    draw(ctx: CanvasRenderingContext2D): boolean;
    init(): void;
}
export class SingleLayer<T extends LayerState> implements Layer{
    private state: T;
    private originalState: T;
    private drawer: (state: T, ctx: CanvasRenderingContext2D) => void;
    private generator: JSVGenerator;
    private originalGenerator: JSVGeneratorFunc<T>;
    constructor(state: T, generator: JSVGeneratorFunc<T>, drawer: (state: T, ctx: CanvasRenderingContext2D) => void){
        this.originalState = structuredClone(state);
        this.state = structuredClone(state);
        this.drawer = drawer;
        this.originalGenerator = generator;
        this.generator = generator(this.state);
    }
    draw(ctx: CanvasRenderingContext2D): boolean{
        const { done, value } = this.generator.next();

        if(done){
            return true;
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
        this.generator = this.originalGenerator(this.state);
    }
}

import { JSVGenerator, Layer } from "./base";

export class MultipleLayer<T extends Layer> implements Layer{
    private state: T[];
    private generator: JSVGenerator;
    private originalGenerator: (e: T[]) => JSVGenerator;
    constructor(generator: (e: T[]) => JSVGenerator){
        this.state = [];
        this.originalGenerator = generator;
        this.generator = generator(this.state);
    }
    draw(ctx: CanvasRenderingContext2D): boolean{
        const { done, value } = this.generator.next();
        if(done){
            return true;
        }else{
            return this.state.every(e=>e.draw(ctx));
        }
    }
    init(){
        this.state = [];
        this.generator = this.originalGenerator(this.state);
    }
}

export const createMultiLayer = <T extends Layer>(generator: (e: T[]) => JSVGenerator) =>
    new MultipleLayer(generator);

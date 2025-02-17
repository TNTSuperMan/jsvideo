import { JSVGeneratorFunc, SingleLayer, LayerState, rgba } from "./base";

export class RectangleLayerState extends LayerState{
    size = 1;
    r = 0;
    g = 0;
    b = 0;
    width = 0;
    height = 0;
}
export const createRectLayer = (generator: JSVGeneratorFunc<RectangleLayerState>) =>
        new SingleLayer(new RectangleLayerState, generator, (state, ctx)=>{
    ctx.fillStyle = rgba(state.r, state.g, state.b, state.transparent);
    ctx.fillRect(state.cx, state.cy, state.width * state.size, state.height * state.size);
})

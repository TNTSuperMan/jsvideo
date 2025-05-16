import { JSVGeneratorFunc, SingleLayer, LayerState, rgba } from "./base";

export class RectangleLayerState extends LayerState{
    size = 1;
    color = "#000000";
    width = 0;
    height = 0;
}
export const createRectLayer = (generator: JSVGeneratorFunc<RectangleLayerState>) =>
        new SingleLayer(new RectangleLayerState, generator, (state, ctx)=>{
    ctx.fillStyle = state.color;
    ctx.fillRect(state.cx, state.cy, state.width * state.size, state.height * state.size);
})

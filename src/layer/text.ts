import { JSVGeneratorFunc, Layer, LayerState, rgba } from "./base";

export class TextLayerState extends LayerState{
    size = 12;
    r = 0;
    g = 0;
    b = 0;
    text = "";
    font = "sans-serif";
}
export const createTextLayer = (generator: JSVGeneratorFunc<TextLayerState>) =>
        new Layer(new TextLayerState, generator, (state, ctx)=>{
    ctx.strokeStyle = rgba(state.r, state.g, state.b, state.transparent);
    ctx.font = `${state.size}px ${state.font}`;
    ctx.strokeText(state.text, state.cx, state.cy + state.size);
})

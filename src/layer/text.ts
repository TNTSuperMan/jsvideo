import { JSVGeneratorFunc, SingleLayer, LayerState, rgba } from "./base";

export class TextLayerState extends LayerState{
    size = 12;
    text = "";
    font = "sans-serif";
    color = "#000000";
}
export const createTextLayer = (generator: JSVGeneratorFunc<TextLayerState>) =>
        new SingleLayer(new TextLayerState, generator, (state, ctx)=>{
    ctx.fillStyle = state.color;
    ctx.font = `${state.size}px ${state.font}`;
    ctx.strokeText(state.text, state.cx, state.cy + state.size);
})

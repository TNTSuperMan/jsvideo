import { JSVGeneratorFunc, Layer, LayerState, rgba } from "./base";

class ImageLayerState extends LayerState{
    size = 1;
    image = new Image();
}
export const createImageLayer = (generator: JSVGeneratorFunc<ImageLayerState>) =>
        new Layer(new ImageLayerState, generator, (state, ctx)=>{
    ctx.drawImage(state.image, state.cx, state.cy,
        state.image.width * state.size,
        state.image.height* state.size);
})

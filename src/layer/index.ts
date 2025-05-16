import { JSVGeneratorFunc, SingleLayer, Layer, JSVGenerator } from "./base";
import { createImageLayer } from "./image";
import { createMultiLayer, MultipleLayer } from "./multi";
import { createRectLayer } from "./rect";
import { createStrokeTextLayer, createTextLayer } from "./text";

export const L = {
    text: createTextLayer,
    textStroke: createStrokeTextLayer,
    rect: createRectLayer,
    image:createImageLayer,
    multi:createMultiLayer
}

export type LayerStateOf<T extends (generator: JSVGeneratorFunc<any>) => SingleLayer<any>> =
    T extends (generator: JSVGeneratorFunc<infer P>) => SingleLayer<any> ? P : never;
export type LayerOf<T extends Function> =
    T extends (generator: JSVGeneratorFunc<any>) => SingleLayer<infer P> ? SingleLayer<P> :
    T extends (generator: (e: Layer[]) => JSVGenerator) => MultipleLayer<infer L> ? MultipleLayer<L> : never;

export { ImageLayerState } from "./image";
export { RectangleLayerState } from "./rect";
export { TextLayerState } from "./text";

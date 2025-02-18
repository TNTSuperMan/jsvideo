import { JSVGeneratorFunc, SingleLayer, LayerState } from "./base";
import { createImageLayer } from "./image";
import { createRectLayer } from "./rect";
import { createTextLayer } from "./text";

export const L = {
    text: createTextLayer,
    rect: createRectLayer,
    image:createImageLayer
}

export type LayerStateOf<T extends (generator: JSVGeneratorFunc<any>) => SingleLayer<any>> =
    T extends (generator: JSVGeneratorFunc<infer P>) => SingleLayer<any> ? P : never;

export { ImageLayerState } from "./image";
export { RectangleLayerState } from "./rect";
export { TextLayerState } from "./text";

import { JSVGeneratorFunc, Layer, LayerState } from "./base";
import { createImageLayer } from "./image";
import { createRectLayer } from "./rect";
import { createTextLayer } from "./text";

export const L = {
    text: createTextLayer,
    rect: createRectLayer,
    image:createImageLayer
}

export type LayerStateOf<T extends (generator: JSVGeneratorFunc<any>) => Layer<any>> =
    T extends (generator: JSVGeneratorFunc<infer P>) => Layer<any> ? P : never;

export { ImageLayerState } from "./image";
export { RectangleLayerState } from "./rect";
export { TextLayerState } from "./text";

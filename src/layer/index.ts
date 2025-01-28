import { createImageLayer } from "./image";
import { createRectLayer } from "./rect";
import { createTextLayer } from "./text";

export const L = {
    text: createTextLayer,
    rect: createRectLayer,
    image:createImageLayer
}

export { ImageLayerState } from "./image";
export { RectangleLayerState } from "./rect";
export { TextLayerState } from "./text";

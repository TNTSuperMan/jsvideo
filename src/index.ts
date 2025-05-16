import { Layer } from "./layer/base";

export * from "./layer";

export const createVideoRenderer = <T extends Layer[]>(width: number, height: number, layers: T): {
    canvas: HTMLCanvasElement;
    render: () => boolean;
    init: () => void;
} => {
    let currentLayers = layers.map(e=>e);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if(!ctx){
        throw new Error("Failed to get 2d context");
    }else{
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            const images = currentLayers.map(e=>e.draw(ctx));
            return images.every(e=>e);
        }
        const init = () => currentLayers =
            layers.map(e=>(e.init(),e))
        return {canvas, render, init}
    }
}
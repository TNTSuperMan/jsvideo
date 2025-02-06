//参考：ビートまりお・ZUN Help me, ERINNNNNN!!
import { L, LayerStateOf, createVideoRenderer } from "../src/index";

function* swing(state: LayerStateOf<typeof L.text>){
    for(let i = 0;i < 20;i++){
        state.y += (100-state.y)/10
        yield;
    }
    for(let i = 0;i < 20;i++){
        state.y += (0-state.y)/10
        yield;
    }
}

const v = createVideoRenderer(640, 480, [
    L.rect(function*(state){
        state.r = 0;
        state.g = 0;
        state.b = 0;
        state.x = 0;
        state.y = 0;
        state.width = 640;
        state.height = 480;
        while(true) yield true;
    }),
    L.text(function*(state){
        state.text = "えーりんえーりん！";
        state.r = 255;
        state.g = 255;
        state.b = 255;
        state.x = 0;
        state.y = 0;
        yield;
        for(let j = 0;j < 14;j++){
            yield* swing(state);
        }
        for(let i = 0;i < 20;i++){
            state.rotate += (100-state.rotate)/10
            yield;
        }
    })
]);
document.body.append(
    v.canvas,)
v.capture().then(e=>{
    console.log(URL.createObjectURL(e))
})
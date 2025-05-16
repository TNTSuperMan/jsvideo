# jsvideo
ScratchのアニメーションをJavaScriptで実現したくて作りました。  
webmエクスポート可能です。
## セットアップ
1. [Bun](https://bun.sh)をインストール(すでにしてる人はスキップ)
1. `bun i`
## usage
```js
import { L, createVideoRenderer } from "jsvideo";

const video = createVideoRenderer(640, 480, [
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
        for(let j = 0;j < 2;j++){
            for(let i = 0;i < 20;i++){
                state.y += (100-state.y)/10
                yield;
            }
            for(let i = 0;i < 20;i++){
                state.y += (0-state.y)/10
                yield;
            }
        }
    })
]);
document.body.appendChild(video.canvas);
requestAnimationFrame(function callback(){
    if(video.render()) return;
    else requestAnimationFrame(callback);
})
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

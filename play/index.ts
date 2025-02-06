//参考：ビートまりお・ZUN Help me, ERINNNNNN!!
import { L, LayerStateOf, createVideoRenderer } from "../src/index";

// LayerStateOfで型ごと状態を上手く渡す
function* swing(state: LayerStateOf<typeof L.text>){
    for(let i = 0;i < 20;i++){
        // イージング(対象地点と現在地の差の10分の1ずつ進める)
        // Scratchでよくある
        state.y += (100-state.y)/10
        yield;
    }
    for(let i = 0;i < 20;i++){
        // ”
        state.y += (0-state.y)/10
        yield;
    }
}

// ビデオ描画オブジェクトの作成
const v = createVideoRenderer(640, 480, [
    L.rect(function*(state){
        // 背景
        state.r = 0;
        state.g = 0;
        state.b = 0;
        state.x = 0;
        state.y = 0;
        state.width = 640;
        state.height = 480;
        // 動画が終わるまで描画(動画が終わると終了する)
        while(true) yield true;
    }),
    L.text(function*(state){
        // 初期化
        state.text = "えーりんえーりん！";
        state.r = 255;
        state.g = 255;
        state.b = 255;
        state.x = 0;
        state.y = 0;
        // 一旦描画
        yield;
        for(let j = 0;j < 14;j++){
            // swing関数を呼び出す
            yield* swing(state);
        }
        for(let i = 0;i < 20;i++){
            // イージング有で傾ける(?)
            state.rotate += (100-state.rotate)/10
            yield;
        }
    })
]);
// 動画の投影用Canvasをボディに追加(録画のみする場合でも必要)
// あとユーザー操作による処理じゃないと音がならない(録音されない)
document.body.append(v.canvas)

// 撮影
v.capture().then(e=>{
    // 撮影結果をblobURLでコンソールに表示
    console.log(URL.createObjectURL(e))
})
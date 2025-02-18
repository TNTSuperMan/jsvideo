export const Capture = (canvas: HTMLCanvasElement, init: ()=>void, render: ()=>boolean) => () => new Promise<Blob>((res,rej)=>{
    init();
    const stream = new MediaStream([
        ...canvas.captureStream(60).getVideoTracks()
    ])
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" })
    recorder.ondataavailable = e => res(e.data);
    recorder.onerror = e => rej(e);
    recorder.start();
    requestAnimationFrame(function callback(){
        if(render()) recorder.stop();
        else requestAnimationFrame(callback);
    })
})
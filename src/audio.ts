const audioCtx = new AudioContext;
export const audioDest = audioCtx.createMediaStreamDestination();
export const subscribeAudio = (audio: HTMLAudioElement) => 
    audioCtx.createMediaElementSource(audio).connect(audioDest);
